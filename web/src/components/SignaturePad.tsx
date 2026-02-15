import { useEffect, useRef } from 'react';

interface SignaturePadProps {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export function SignaturePad({ value, onChange, disabled = false }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);

  const getPos = (event: MouseEvent | TouchEvent, rect: DOMRect) => {
    if ('touches' in event) {
      const touch = event.touches[0] || event.changedTouches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const startDraw = (event: MouseEvent | TouchEvent) => {
    if (disabled || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const pos = getPos(event, rect);
    drawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    if (!drawingRef.current || disabled || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const pos = getPos(event, rect);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const endDraw = () => {
    if (!canvasRef.current) return;
    drawingRef.current = false;
    onChange(canvasRef.current.toDataURL('image/png'));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!value) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = value;
  }, [value]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseDown = (e: MouseEvent) => startDraw(e);
    const onMouseMove = (e: MouseEvent) => draw(e);
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      startDraw(e);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      draw(e);
    };
    const onMouseUp = () => endDraw();
    const onTouchEnd = () => endDraw();

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    };
  });

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        width={800}
        height={220}
        className="w-full rounded-xl border border-slate-300 bg-white"
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={clear}
          disabled={disabled}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          서명 지우기
        </button>
      </div>
    </div>
  );
}
