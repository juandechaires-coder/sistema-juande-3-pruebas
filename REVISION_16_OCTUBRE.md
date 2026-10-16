# Revisión del Sistema Juande — 16 de octubre de 2026

## Estado

Repositorio de pruebas: juandechaires-coder/sistema-juande-3-pruebas.
Base revisada: 006880c0262bca6ad77550a7ce5c194132312548.
No se modificó el repositorio ni la base de producción 2.0.

Fase 4B confirmada por el usuario en iPhone: consulta, detección de una ficha existente sin duplicación, exclusión del registro RC1 incompatible y recuperación de A vs B en pestaña privada.

## Base de datos de pruebas

- Cuatro tablas sj3_* con RLS habilitada y políticas de propietario para authenticated, incluyendo USING y WITH CHECK.
- Historial y selecciones verifican también que el registro padre pertenezca al usuario.
- Los roles anon y authenticated no tienen BYPASSRLS.
- Lectura bajo el rol authenticated y UID propietario: dos investigaciones visibles, ninguna de otro propietario.
- Lectura con otra identidad simulada bajo el rol real authenticated: cero registros visibles en las cuatro tablas.
- Lectura bajo anon: cero registros visibles en las cuatro tablas.
- Prueba transaccional: el propietario insertó y leyó investigación, versión, ticket y selección temporales; otra identidad no pudo leerlos ni actualizarlos.
- ROLLBACK confirmado: dos investigaciones originales, cero registros de auditoría y cero tickets.

Estas pruebas usan identidades JWT simuladas en SQL con roles reales; no equivalen a iniciar sesión con dos cuentas reales mediante Auth. No se certifican aquí todos los caminos de DELETE ni intentos de reasignación mediante REST.

Se retiraron TRUNCATE, REFERENCES y TRIGGER de anon/authenticated, y las operaciones de escritura de anon. Quedan SELECT para anon (sin filas visibles por RLS) y SELECT/INSERT/UPDATE/DELETE para authenticated, restringidas por las políticas. Se verificaron los permisos resultantes y se repitieron lectura del propietario, lectura anónima e inserción propia con ROLLBACK. Solo se modificó el proyecto de pruebas.

El asesor de seguridad no informó problemas de RLS; informó protección de contraseñas filtradas desactivada. Revisar disponibilidad/configuración: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection . No se alteró Auth.

## Cálculos y parlays

- Corregido estado sugerido: selecciones ganadas + anuladas => ganado cuando no quedan pendientes ni pérdidas; todas anuladas => nulo.
- Al liquidar un parlay ganado con anulaciones sigue siendo obligatoria la cuota ajustada indicada por la casa.
- Cancelar la edición del resultado o de la cuota ajustada no modifica las selecciones originales en memoria.
- Cuotas/unidades no finitas no entran en utilidad ni ROI; también se rechazan en captura de ticket y apuesta vinculada al Radar.
- La regla existente para ROI usa unidades de apuestas resueltas, incluyendo push/nulo en el denominador. Una apuesta nula aporta cero utilidad. No se cambió esa convención.
- Un parlay cuenta como un ticket; sus selecciones no aportan apuestas adicionales.
- No se liquidaron ni reclasificaron tickets históricos automáticamente.

Nueve pruebas ejecutadas sobre las funciones reales de index.html: utilidad 0.69 U a cuota 1.69; pérdidas/push/pendientes; parlay sin doble conteo; registros omitidos/incompletos/no finitos; investigación separada; estados mixtos; cancelación; cuota ajustada; cancelación de cuota.

## Prompts

Se buscaron textos en archivos recuperados, dentro de ZIP, por nombre/contenido en archivos guardados y en contexto de conversaciones. No se localizó el texto íntegro original de los 27 prompts. Se conserva la asignación a ocho módulos en la especificación; no se inventaron sustitutos ni se afirma que el texto esté ejecutándose en la aplicación.

Para integrar fielmente los prompts se necesita recuperar su texto o imágenes originales. La interfaz actual es un flujo de captura, investigación y seguimiento; no realiza por sí sola investigación web ni modela automáticamente 100–300 mercados.

## Antes de ampliar a producción

- Permisos excesivos del esquema de pruebas reducidos y acceso comprobado; revisar el mismo criterio antes de cualquier migración a producción.
- Probar con dos sesiones Auth reales si se habilitarán múltiples usuarios.
- Resolver la actualización no atómica de ficha/historial o mantener esa página exclusivamente como diagnóstico.
- Recuperar y verificar el texto de los prompts.
- Acordar el alcance de la primera versión: captura, copia a nube y recuperación manual están disponibles; sincronización bidireccional y motor automático de análisis no están terminados.
- Respaldar el estado de producción y revisar diferencias antes de cambiarlo.
