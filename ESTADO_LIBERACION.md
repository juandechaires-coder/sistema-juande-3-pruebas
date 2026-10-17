# Sistema Juande 3.0 — preparación para el 16 de octubre de 2026

Objetivo: liberar el viernes 16 de octubre. Estado: laboratorio; aún no aprobado para producción.

## Cambio del 15 de octubre

- Se compararon index.html y radar3-beta2.html con Beta 5, rc1-escritura.html con RC1 Fase 2 y rc1-radar-sync.html con Fase 3: coincidencia del contenido, ignorando espacios de extremos.
- Se incorpora el puente recuperado Fase 4A, con enlace de regreso. Mantiene su comportamiento de consulta y exportación.
- Inicio incluye accesos a Fase 4A y las pruebas RC1.
- No se cambiaron las claves locales, la lógica del Radar, los cálculos, las tablas ni las políticas de Supabase.

## Alcance actual

Beta 5 trabaja en el navegador. RC1 Fase 3 copia fichas nuevas a la nube de pruebas; Fase 4A consulta hasta 500 filas y permite exportarlas. Ese JSON no se importa directamente a Beta 5. No existe sincronización bidireccional completa.

Los ocho módulos están presentes. Recuperación completada: los 26 prompts entregados por Juande están íntegros en prompts/originales y catalogados en prompts/README.md. Juande confirmó que el total correcto es 26, no 27. La ejecución de los prompts desde la aplicación sigue pendiente.

## Comprobaciones pendientes antes de liberar

- [ ] Inicio, Radar, edición y exportación/importación en Safari iPhone.
- [ ] Login con cuenta de pruebas y consulta Fase 4A.
- [ ] Confirmar que las investigaciones esperadas aparecen y que no exceden el límite de consulta.
- [ ] Exportar y verificar respaldo; recuperar registros con su formato compatible.
- [ ] Repetir copia RC1 sin duplicados y comprobar persistencia tras cerrar sesión.
- [ ] Verificar políticas reales y aislamiento entre dos usuarios en las tablas expuestas.
- [ ] Resolver o excluir de la liberación la actualización e historial en solicitudes separadas de RC1 Fase 2.
- [ ] Comprobar ROI de picks y tickets parlay sin doble conteo.
- [ ] Confirmar alcance de prompts y automatización: no afirmar investigación web automática por existir formularios.
- [ ] Revisar diferencias y definir respaldo/retorno antes de modificar producción.

La subida de archivos y la compilación sintáctica no certifican esas pruebas funcionales. No se modificó el repositorio de producción.


## Fase 4B — incorporación controlada

- Nueva pantalla recuperar-radar.html, enlazada desde Inicio y Fase 4A.
- Consulta autenticada con filtro de usuario y validación de propietario; paginación en bloques de 200, máximo 2.000 fichas. El filtro del cliente no sustituye políticas RLS.
- Solo incorpora registros research_only con payload sj3_beta1 y radar_record coherente con el source_id, partido y mercado. Pruebas RC1 genéricas quedan incompatibles.
- Vista previa y confirmación; añade IDs nuevos a sj3_beta1_investigations sin reemplazar existentes. Mantiene los ocho módulos existentes.
- Guarda el contenido exacto previo bajo sj3_cloud_backup:<usuario>:<identificador>; si falla el respaldo, no añade fichas. La copia es local y no constituye respaldo externo ni restauración automática.
- Fichas incorporadas regresan a En análisis/Sin calificar/probabilidad sin validar; no son apuestas.
- No hay escrituras remotas, migraciones, cambios de políticas, actualización bidireccional ni modificaciones de picks/parlays.
- Sesión y token solo en memoria de esta pantalla. Cerrar sesión quita la sesión local; no se implementa revocación remota. Las fichas incorporadas permanecen en el navegador.
- Confirmado por el usuario en Fase 4A: consulta de dos investigaciones y recuperación tras volver a iniciar sesión.
- Pendiente: prueba real de Fase 4B en el iPhone y aislamiento RLS entre cuentas. Las pruebas automatizadas usan respuestas simuladas y no certifican el esquema ni RLS reales.


### Validación automatizada de Fase 4B

- 9 pruebas de normalización, deduplicación, conservación de datos y fallos de almacenamiento: aprobadas.
- 6 escenarios de integración de interfaz con DOM y API simulados: aprobados (login, consulta, incorporación, logout, ficha existente, vista previa obsoleta, propietario ajeno, login fallido y paginación agrupados en seis escenarios).
- Sintaxis JavaScript y enlaces de las siete páginas HTML verificados.
- Prueba Playwright preparada, pero NO ejecutada: el navegador no estaba instalado y su descarga devolvió archivos inválidos. No se da por comprobado el renderizado móvil.
- Ejecución local: node tests/cloud-recovery.test.cjs y node tests/cloud-recovery.integration.cjs.
- Prueba real solicitada: entrar en recuperar-radar.html, pulsar Revisar fichas y comprobar los conteos. Incorporar solo si hay fichas nuevas. Si A vs B ya está localmente, debe omitirse; no borrar fichas para forzar la prueba.


## Revisión del 16 de octubre

- Confirmado por el usuario: recuperación completa de A vs B en pestaña privada, además de detección de duplicados en Safari habitual.
- Se ejecutaron pruebas con roles reales de la base de pruebas e identidades simuladas; ver REVISION_16_OCTUBRE.md para alcance y resultados.
- Se redujeron privilegios innecesarios exclusivamente en las cuatro tablas de pruebas.
- Corregidos estado sugerido de parlays con anulaciones, cancelación de edición y exclusión de valores no finitos de ROI; nueve pruebas financieras aprobadas.
- Total: 24 pruebas automatizadas locales aprobadas (9 recuperación, 6 integración simulada, 9 financieras).
- Actualización de cierre: los 26 textos originales ya están recuperados y catalogados. No se afirma integración funcional ni automatización de investigación.
- La actualización ficha/historial de RC1 Fase 2 se mantiene como diagnóstico; no se libera como sincronización bidireccional.
