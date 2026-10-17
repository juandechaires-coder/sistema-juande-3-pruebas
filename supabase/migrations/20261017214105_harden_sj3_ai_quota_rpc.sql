create schema if not exists sj3_private;
revoke all on schema sj3_private from public, anon;
grant usage on schema sj3_private to authenticated;
alter function public.sj3_claim_ai_request(uuid) set schema sj3_private;
create function public.sj3_claim_ai_request(p_request_id uuid) returns jsonb
language sql security invoker set search_path = ''
as $$ select sj3_private.sj3_claim_ai_request(p_request_id); $$;
revoke all on function public.sj3_claim_ai_request(uuid) from public, anon;
grant execute on function public.sj3_claim_ai_request(uuid) to authenticated;
