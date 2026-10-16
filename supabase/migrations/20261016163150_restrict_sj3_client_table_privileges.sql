-- Applied to Sistema Juande 3.0 Pruebas only.
revoke insert, update, delete, truncate, references, trigger on table public.sj3_investigations, public.sj3_investigation_versions, public.sj3_tickets, public.sj3_ticket_legs from anon;
revoke truncate, references, trigger on table public.sj3_investigations, public.sj3_investigation_versions, public.sj3_tickets, public.sj3_ticket_legs from authenticated;
