with rows as (
  select * from (values
    ('메가주식회사', '메가에프', '사업단', '서울', '영등포구', '서울특별시 영등포구 당산로41길 11', '02-323-7417', 'B', 'https://www.megafn.com/company/location.php'),
    ('메가주식회사', '메가솔로몬', '사업단', '서울', '성동구', '서울특별시 성동구 성수일로 77', '02-457-3465', 'B', 'https://www.megafn.com/company/location.php'),
    ('메가주식회사', '밸류서울', '사업단', '서울', '강남구', '서울특별시 강남구 역삼로 146', '02-6204-7158', 'B', 'https://www.megafn.com/company/location.php'),
    ('메가주식회사', '메가라이프', '사업단', '서울', '금천구', '서울특별시 금천구 벚꽃로 298', '02-525-2484', 'B', 'https://www.megafn.com/company/location.php'),
    ('메가주식회사', '메가다이렉트', '사업단', '서울', '구로구', '서울특별시 구로구 디지털로34길 55', '02-3667-7157', 'B', 'https://www.megafn.com/company/location.php'),
    ('메가주식회사', '메가다온', '지점', '인천', '부평구', '인천광역시 부평구 부평대로 130', '032-330-2153', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=3&sido=&tbl='),
    ('메가주식회사', '인슈에셋고양', '지점', '경기', '고양시 덕양구', '경기도 고양시 덕양구 화중로104번길 26', '031-967-1310', 'B', 'https://www.megafn.com/company/location.php'),
    ('메가주식회사', '메가동구', '지점', '경기', '고양시 일산동구', '경기도 고양시 일산동구 일산로 443', '031-903-5067', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=5&sido=&tbl='),
    ('메가주식회사', '더존강남', '지점', '서울', '노원구', '서울특별시 노원구 동일로 1100', '02-540-4076', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '더존의정부', '지점', '경기', '의정부시', '경기도 의정부시 장곡로596번길 9', '031-852-3540', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '더존인스', '지점', '경기', '안양시 만안구', '경기도 안양시 만안구 안양로257번길 18', '031-465-9683', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '더존인스수원', '지점', '경기', '수원시 장안구', '경기도 수원시 장안구 정조로 948', '031-253-1826', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '더존인스참사랑', '지점', '서울', '종로구', '서울특별시 종로구 청계천로 61', '02-725-2307', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '라이언리치', '사업단', '서울', '강서구', '서울특별시 강서구 마곡중앙2로 35', '02-6956-0105', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '라펫', '지점', '경기', '하남시', '경기도 하남시 신우실로 100', '02-474-5172', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '라펫다사랑', '지점', '경기', '평택시', '경기도 평택시 용죽2로 32-82', '031-656-4800', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '라펫서울', '지점', '서울', '금천구', '서울특별시 금천구 가산디지털1로 168', '02-2610-9844', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '라펫중앙세무', '지점', '경기', '부천시', '경기도 부천시 소향로 35', '032-715-5579', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '라펫프리맥스', '지점', '경기', '화성시', '경기도 화성시 동탄첨단산업1로 27', '02-3452-1599', 'B', 'https://megafn.com/company/location.php'),
    ('메가주식회사', '메가한국경제지원센터', '센터', '경기', '수원시 장안구', '경기도 수원시 장안구 서부로 2139', '02-6263-2700', 'B', 'https://megafn.com/company/location.php?gugun=&name=&page=13&sido=&tbl='),
    ('메가주식회사', '메가평촌', '지점', '경기', '안양시 동안구', '경기도 안양시 동안구 시민대로 161', '031-388-8756', 'B', 'https://megafn.com/company/location.php?gugun=&name=&page=13&sido=&tbl='),
    ('메가주식회사', '메가솔로몬경인', '지점', '인천', '부평구', '인천광역시 부평구 부평대로 114', '032-719-4988', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=7&sido=&tbl='),
    ('메가주식회사', '메가솔로몬라온', '지점', '경기', '부천시', '경기도 부천시 부천로3번길 48', '032-611-9444', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=7&sido=&tbl='),
    ('메가주식회사', '메가솔로몬선릉지점', '지점', '서울', '강남구', '서울특별시 강남구 선릉로86길 37', '02-6209-2707', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=7&sido=&tbl='),
    ('메가주식회사', '메가수도', '사업단', '서울', '중구', '서울특별시 중구 수표로 45', '02-922-4510', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=7&sido=&tbl='),
    ('메가주식회사', '메가검단신도시', '지점', '인천', '서구', '인천광역시 서구 완정로117번길 62', '032-567-3541', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=2&sido=&tbl='),
    ('메가주식회사', '메가골든타이거', '지점', '경기', '남양주시', '경기도 남양주시 다산중앙로 132', '070-4896-2817', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=2&sido=&tbl='),
    ('메가주식회사', '메가굿포유', '지점', '경기', '부천시', '경기도 부천시 부일로 226', '032-329-0080', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=2&sido=&tbl='),
    ('메가주식회사', '메가그레이스', '지점', '서울', '영등포구', '서울특별시 영등포구 선유로 114', '02-6958-7114', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=2&sido=&tbl='),
    ('메가주식회사', '메가김포신도시', '지점', '경기', '김포시', '경기도 김포시 양촌읍 누산로38번길 14-2', '031-997-3541', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=2&sido=&tbl='),
    ('메가주식회사', '메가노블리치', '지점', '경기', '하남시', '경기도 하남시 대청로 26', '031-792-1789', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=2&sido=&tbl='),
    ('메가주식회사', '메가다름파트너스', '지점', '서울', '서초구', '서울특별시 서초구 방배로37길 11', '02-535-8565', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=2&sido=&tbl='),
    ('메가주식회사', '메가다이렉트이음파트너스', '지점', '서울', '강남구', '서울특별시 강남구 개포로22길 46', '02-571-8703', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=4&sido=&tbl='),
    ('메가주식회사', '메가다이렉트인천휠', '지점', '인천', '미추홀구', '인천광역시 미추홀구 매소홀로 262', '032-875-0448', 'B', 'https://www.megafn.com/company/location.php?gugun=&name=&page=4&sido=&tbl='),
    ('메가주식회사', '메가한강금융', '사업단', '서울', '동대문구', '서울특별시 동대문구 천호대로83길 3', '02-2138-7930', 'B', 'https://megafn.com/company/location02.php?corporation=&name=&page=11&tbl='),
    ('프라임에셋(주)', '마스터사업부 인천지점', '지점', '인천', '부평구', '인천광역시 부평구 길주로 641 근영빌딩 11층', '032-501-5577', 'B', 'https://www.primeasset.co.kr/'),
    ('인카금융서비스(주)', '파인솔루션사업단', '사업단', '서울', '종로구', '서울특별시 종로구 새문안로 92 광화문오피시아빌딩 300-1호, 506호, 1827호', null, 'C', 'https://www.finesolution1.co.kr/')
  ) as t(ga_company_name, organization_name, organization_type, region, district, address, representative_phone, reliability_grade, source_url)
)
insert into public.ga_organizations (
  ga_company_name, organization_name, organization_type, region, district, address, representative_phone, homepage, ga_homepage,
  organization_size, operating_status, collection_method, search_keywords, phone_verification_status,
  address_verification_status, organization_verification_status, reliability_grade, verification_notes,
  last_verified_at, record_status
)
select ga_company_name, organization_name, organization_type, region, district, address, representative_phone, source_url, source_url,
  '미확인', '영업중 추정', '공식 홈페이지 수동조사',
  ga_company_name || ' ' || region || ' ' || organization_name,
  case when representative_phone is null then '미확인' else '공식출처 확인' end,
  '공식출처 확인', '공식출처 확인', reliability_grade,
  '공식 홈페이지에 공개된 조직명과 주소를 기록함. 영업중 여부는 추정이며 전화번호는 동일 출처 공개값만 기록했으므로 복수출처 교차검증 전입니다.',
  current_date, 'approved'
from rows
where not exists (
  select 1 from public.ga_organizations existing
  where existing.ga_company_name = rows.ga_company_name
    and existing.organization_name = rows.organization_name
    and coalesce(existing.address, '') = coalesce(rows.address, '')
);

insert into public.ga_sources (organization_id, source_name, source_url, source_type, searched_keyword, note)
select o.id, case when o.ga_company_name = '메가주식회사' then '메가주식회사 사업단 & 지점안내' when o.ga_company_name = '프라임에셋(주)' then '프라임에셋 공식 홈페이지' else '파인솔루션 공식 홈페이지' end,
  o.homepage,
  'GA 공식 홈페이지', o.ga_company_name || ' ' || o.region || ' ' || o.organization_name,
  '초기 조사 출처. 독립 출처 추가 확인 전까지 신뢰도 A 이상으로 승격하지 않음.'
from public.ga_organizations o
where o.collection_method = '공식 홈페이지 수동조사'
  and not exists (select 1 from public.ga_sources s where s.organization_id = o.id);

with districts(region, district) as (
  select '서울', value from unnest(array['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']) as t(value)
  union all
  select '경기', value from unnest(array['수원시', '성남시', '용인시', '고양시', '화성시', '부천시', '남양주시', '안산시', '평택시', '안양시', '시흥시', '파주시', '김포시', '의정부시', '광주시', '하남시', '광명시', '군포시', '양주시', '오산시', '이천시', '안성시', '구리시', '의왕시', '포천시', '양평군', '여주시', '동두천시', '과천시', '가평군', '연천군']) as t(value)
  union all
  select '인천', value from unnest(array['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군']) as t(value)
)
insert into public.ga_research_progress (region, district, status, organization_count, needs_more_research, notes)
select d.region, d.district, case when count(o.id) > 0 then '추가조사 필요' else '미조사' end, count(o.id)::integer, count(o.id) > 0, case when count(o.id) > 0 then '공개자료 기반 후보가 있으나 지역 단위 추가조사와 교차검증이 필요합니다.' else null end
from districts d
left join public.ga_organizations o on o.region = d.region and o.district = d.district
group by d.region, d.district
on conflict (region, district) do update set organization_count = excluded.organization_count, needs_more_research = excluded.needs_more_research, notes = excluded.notes;
