import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { GhostButton } from './FormControls';
import { supabase, type ContractMaterial } from '../lib/supabase';

export type MaterialCategory = 'medical' | 'insurance';

function formatSize(size: number | null) {
  if (!size) return '';
  if (size < 1024) return `${size}B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)}KB`;
  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
}

function safeFileName(name: string) {
  return name.replace(/[\\/:*?"<>|#\u0000-\u001F]/g, '_').trim() || '자료';
}

function isImage(material: ContractMaterial) {
  return material.content_type?.startsWith('image/') || /\.(jpe?g|png|gif|webp|heic)$/i.test(material.file_name);
}

export function MaterialsPanel({ contractId, canEdit, category, title }: { contractId: string; canEdit: boolean; category: MaterialCategory; title: string }) {
  const [materials, setMaterials] = useState<ContractMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ material: ContractMaterial; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMaterials = async () => {
      setLoading(true);
      try {
        const result = await supabase
          .from('contract_materials')
          .select('*')
          .eq('contract_id', contractId)
          .eq('category', category)
          .order('created_at', { ascending: false });
        if (result.error) setError(result.error.message);
        else setMaterials((result.data || []) as ContractMaterial[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : '자료를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    void loadMaterials();
  }, [category, contractId]);

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !canEdit) return;
    setUploading(true);
    setError(null);

    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error('로그인 세션을 확인할 수 없습니다.');

      const storagePath = `${userId}/${contractId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
      const uploadResult = await supabase.storage.from('contract-materials').upload(storagePath, file, { upsert: false });
      if (uploadResult.error) throw new Error(uploadResult.error.message);

      const insertResult = await supabase
        .from('contract_materials')
        .insert({
          contract_id: contractId,
          created_by: userId,
          file_name: file.name,
          storage_path: storagePath,
          content_type: file.type || null,
          size_bytes: file.size,
          category
        })
        .select('*')
        .single();

      if (insertResult.error) {
        await supabase.storage.from('contract-materials').remove([storagePath]);
        throw new Error(insertResult.error.message);
      }
      setMaterials((current) => [insertResult.data as ContractMaterial, ...current]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '자료 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const previewMaterial = async (material: ContractMaterial) => {
    setWorkingId(material.id);
    setError(null);
    try {
      const result = await supabase.storage.from('contract-materials').createSignedUrl(material.storage_path, 600);
      if (result.error) throw new Error(result.error.message);
      setPreview({ material, url: result.data.signedUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : '자료 미리보기를 열지 못했습니다.');
    } finally {
      setWorkingId(null);
    }
  };

  const downloadMaterial = async (material: ContractMaterial) => {
    setWorkingId(material.id);
    try {
      const result = await supabase.storage.from('contract-materials').createSignedUrl(material.storage_path, 600, { download: material.file_name });
      if (result.error) throw new Error(result.error.message);
      const anchor = document.createElement('a');
      anchor.href = result.data.signedUrl;
      anchor.download = material.file_name;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.click();
    } catch (err) {
      setError(err instanceof Error ? err.message : '자료 다운로드에 실패했습니다.');
    } finally {
      setWorkingId(null);
    }
  };

  const removeMaterial = async (material: ContractMaterial) => {
    if (!window.confirm(`'${material.file_name}' 자료를 삭제할까요?`)) return;
    setWorkingId(material.id);
    try {
      const storageResult = await supabase.storage.from('contract-materials').remove([material.storage_path]);
      const deleteResult = await supabase.from('contract_materials').delete().eq('id', material.id);
      if (storageResult.error || deleteResult.error) throw new Error(storageResult.error?.message || deleteResult.error?.message || '자료 삭제에 실패했습니다.');
      setMaterials((current) => current.filter((item) => item.id !== material.id));
      if (preview?.material.id === material.id) setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '자료 삭제에 실패했습니다.');
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs text-slate-500">사진·PDF 파일을 올리면 아래에서 바로 미리볼 수 있습니다.</p>
        </div>
        {canEdit && <label className="inline-flex cursor-pointer items-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"><input type="file" accept="image/*,.pdf,application/pdf" className="sr-only" onChange={(event) => void upload(event)} disabled={uploading} />{uploading ? '업로드 중...' : `${title} 올리기`}</label>}
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {loading ? <p className="mt-3 text-sm text-slate-500">자료를 불러오는 중입니다.</p> : materials.length === 0 ? <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">등록된 {title} 자료가 없습니다.</p> : (
        <div className="mt-3 space-y-2">
          {materials.map((material) => <div key={material.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"><div className="min-w-0"><p className="break-all text-sm font-medium text-slate-800">{material.file_name}</p><p className="mt-1 text-xs text-slate-500">{formatSize(material.size_bytes)} · {new Date(material.created_at).toLocaleString()}</p></div><div className="flex flex-wrap gap-2"><GhostButton type="button" onClick={() => void previewMaterial(material)} disabled={workingId === material.id}>{workingId === material.id ? '여는 중...' : '미리보기'}</GhostButton><GhostButton type="button" onClick={() => void downloadMaterial(material)} disabled={workingId === material.id}>다운로드</GhostButton>{canEdit && <GhostButton type="button" onClick={() => void removeMaterial(material)} disabled={workingId === material.id} className="border-red-200 text-red-700 hover:bg-red-50">삭제</GhostButton>}</div></div>)}
        </div>
      )}
      {preview && <div className="mt-4 overflow-hidden rounded-xl border border-brand-100 bg-slate-50"><div className="flex items-center justify-between gap-2 border-b border-brand-100 bg-white px-3 py-2"><p className="break-all text-sm font-medium text-slate-800">미리보기: {preview.material.file_name}</p><GhostButton type="button" onClick={() => setPreview(null)}>닫기</GhostButton></div>{isImage(preview.material) ? <img src={preview.url} alt={`${preview.material.file_name} 미리보기`} className="max-h-[560px] w-full object-contain p-3" /> : preview.material.content_type === 'application/pdf' || /\.pdf$/i.test(preview.material.file_name) ? <iframe title={`${preview.material.file_name} 미리보기`} src={preview.url} className="h-[560px] w-full bg-white" /> : <p className="p-4 text-sm text-slate-600">이 파일 형식은 미리보기를 지원하지 않습니다. 다운로드해서 확인해 주세요.</p>}</div>}
    </section>
  );
}
