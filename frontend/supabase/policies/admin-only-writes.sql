-- M'log RLS 정책 (2026-10-16 Supabase SQL Editor에서 적용)
-- 읽기는 공개, 쓰기(posts·projects·이미지 버킷)는 관리자 uid만 허용한다.
-- 공개 회원가입은 꺼져 있지만, 실수로 켜지더라도 쓰기는 막히도록 uid 기준으로 둔다.

-- 1. 관리자 판별 함수: 관리자 uid를 한 곳에서 관리한다
create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(
    auth.uid() in (
      '<관리자 uid>'::uuid,     -- 대시보드 Authentication > Users에서 확인
      '<E2E 계정 uid>'::uuid   -- E2E 테스트 계정
    ),
    false
  );
$$;

-- 2. posts·projects 쓰기 정책 ("Enable read access for all users" 읽기 정책은 그대로 둔다)
create policy "admin insert" on public.posts for insert to authenticated
  with check ( (select public.is_admin()) );
create policy "admin update" on public.posts for update to authenticated
  using ( (select public.is_admin()) ) with check ( (select public.is_admin()) );
create policy "admin delete" on public.posts for delete to authenticated
  using ( (select public.is_admin()) );

create policy "admin insert" on public.projects for insert to authenticated
  with check ( (select public.is_admin()) );
create policy "admin update" on public.projects for update to authenticated
  using ( (select public.is_admin()) ) with check ( (select public.is_admin()) );
create policy "admin delete" on public.projects for delete to authenticated
  using ( (select public.is_admin()) );

-- 3. Storage 이미지 버킷 (공개 URL 조회는 RLS를 거치지 않는다. select는 upsert에 필요)
create policy "admin select images" on storage.objects for select to authenticated
  using ( bucket_id in ('post_images', 'project_images') and (select public.is_admin()) );
create policy "admin insert images" on storage.objects for insert to authenticated
  with check ( bucket_id in ('post_images', 'project_images') and (select public.is_admin()) );
create policy "admin update images" on storage.objects for update to authenticated
  using ( bucket_id in ('post_images', 'project_images') and (select public.is_admin()) )
  with check ( bucket_id in ('post_images', 'project_images') and (select public.is_admin()) );
create policy "admin delete images" on storage.objects for delete to authenticated
  using ( bucket_id in ('post_images', 'project_images') and (select public.is_admin()) );

-- 4. projects_view: 뷰가 소유자 권한으로 RLS를 우회하던 문제 수정
alter view public.projects_view set (security_invoker = true);
revoke insert, update, delete on public.projects_view from anon, authenticated;

-- 검증 (rollback이라 데이터는 바뀌지 않는다)
-- 관리자가 아닌 uid → 0 / 0 / 0, 관리자 uid → 5 / 3 / 35 (2026-10-16 결과)
-- begin;
-- set local role authenticated;
-- select set_config('request.jwt.claims',
--   '{"sub":"00000000-0000-0000-0000-000000000000","role":"authenticated"}', true);
-- with p as (update public.posts    set id = id                 returning 1),
--      j as (update public.projects set project_id = project_id returning 1)
-- select (select count(*) from p) as posts_updated,
--        (select count(*) from j) as projects_updated,
--        (select count(*) from storage.objects
--          where bucket_id in ('post_images','project_images')) as images_visible;
-- rollback;
