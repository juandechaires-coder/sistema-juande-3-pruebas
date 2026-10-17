create table public.sj3_ai_request_log (
 user_id uuid not null references auth.users(id),
 request_id uuid not null,
 created_at timestamptz not null default now(),
 primary key (user_id, request_id)
);
alter table public.sj3_ai_request_log enable row level security;
revoke all on public.sj3_ai_request_log from public, anon, authenticated;
grant select on public.sj3_ai_request_log to authenticated;
create policy ai_request_read_own on public.sj3_ai_request_log for select to authenticated using ((select auth.uid())=user_id);
create or replace function public.sj3_claim_ai_request(p_request_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare u uuid := auth.uid(); n integer;
begin
 if u is null then raise exception 'Authentication required'; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(u::text, 26017));
 if exists(select 1 from public.sj3_ai_request_log where user_id=u and request_id=p_request_id) then
  return pg_catalog.jsonb_build_object('accepted',false,'reason','duplicate');
 end if;
 select count(*) into n from public.sj3_ai_request_log where user_id=u and created_at>=pg_catalog.date_trunc('day',now() at time zone 'UTC') at time zone 'UTC';
 if n>=5 then return pg_catalog.jsonb_build_object('accepted',false,'reason','daily_limit'); end if;
 insert into public.sj3_ai_request_log(user_id,request_id) values(u,p_request_id);
 return pg_catalog.jsonb_build_object('accepted',true,'remaining',4-n);
end $$;
revoke all on function public.sj3_claim_ai_request(uuid) from public, anon;
grant execute on function public.sj3_claim_ai_request(uuid) to authenticated;
