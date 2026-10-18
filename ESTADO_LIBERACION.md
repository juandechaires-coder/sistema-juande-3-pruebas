# Estado actual · revisión del 17 de octubre de 2026 (México)

**Dictamen: NO sustituir todavía producción.** La integración de pruebas está publicada; faltan el ensayo real de IA y la preparación específica del entorno productivo. Los apartados posteriores son el historial de implementación y no sustituyen este estado.

## Comprobado en esta revisión

- 43 grupos automatizados aprobados, que incluyen 64 escenarios de análisis, servicio simulado, recuperación y finanzas. No equivalen a una investigación real ni a una prueba visual en Safari.
- Gemini está configurado y habilitado en pruebas, modelo fijo 2.5 Flash, cinco reservas/día, dos llamadas como máximo, sin reintentos ni alternativas de pago. Google AI Studio mostró Free en la captura del propietario.
- Organización Supabase verificada por la API: plan free/tier_free. Los dos proyectos están ACTIVE_HEALTHY; no se contrataron servicios ni se modificó facturación.
- El contador real de solicitudes IA está en cero. Todavía no se ha reservado una investigación desde la aplicación.
- Producción tiene dos tablas: published_radar (96 filas) y user_records (1 fila), con RLS. El Radar permite lectura pública; los registros privados tienen políticas propias de SELECT/INSERT/UPDATE/DELETE. Los conteos reflejan la consulta, no un respaldo ni una validación REST completa.
- Producción no tiene Edge Functions ni las tablas sj3_* utilizadas por el laboratorio. La cuenta Auth de pruebas no coincide por correo con la única cuenta de producción; confirmar la cuenta productiva y autorizar su identificador, sin trasladar el hash de pruebas a ciegas.

## Integración requerida antes del cambio

1. Ejecutar un caso real prematch desde analisis.html con la sesión de pruebas. Confirmar búsqueda y fuentes trazables, informe válido, guardado y reapertura. Si falla, corregir antes del corte; no activar facturación ni servicios alternativos.
2. Construir el candidato de producción preservando la clave `juande-mobile-reset-20261012-v1`, el panel Supabase existente, el Radar público y la copia privada. El laboratorio usa `sj3-beta3-lab-main-v1` y sustituye cloudMerged por lectura local: copiar su index.html directamente ocultaría datos locales anteriores y retiraría funciones de nube.
3. Incorporar tablas de investigación/cuotas, políticas y Edge Function al proyecto productivo mediante migraciones nuevas revisadas. Conservar published_radar/user_records. La primera migración del laboratorio crea solo la cuota: no es un instalador completo de las cuatro tablas sj3_* preexistentes. Generar y probar el esquema completo antes de aplicarlo.
4. Cambiar todas las URLs y claves públicas de pruebas por configuración de producción, y registrar por separado los secretos gratuitos en ese proyecto. No pueden copiarse claves privadas mediante las herramientas disponibles y nunca deben entrar en GitHub. Verificar la cuenta autorizada.
5. Respaldar los datos productivos de nube y exportar el estado local desde el iPhone (ese almacenamiento no es accesible al servidor). Verificar restauración y hacer prueba de aceptación móvil con copia, recuperación, fichas, precios, picks y un parlay sin doble conteo.

## Corte y retorno

Cabeza de producción inspeccionada: `26fdf18ed108f353c79af3bdb78bb1a64783dd1b`. Pruebas: `43130b3b1600f9e5c810d74a5bf17d131ab157f6`. Mantener un respaldo verificable y una rama/tag de retorno antes del corte. Volver al HTML anterior no revierte operaciones de base de datos ni datos locales, por lo que el corte debe ser aditivo y sin borrados.

No se modificó producción durante esta revisión. El paso inmediato del propietario es iniciar una investigación real desde el enlace de pruebas; no compartir contraseña ni clave API en el chat. El resto de la integración puede prepararse sin sustituir la aplicación actual.

---

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


## Integración de análisis · 17 de octubre de 2026

Los 26 originales tienen versiones operativas 1.0 y acceso desde Inicio, Radar y fichas. El asistente en `analisis.html` selecciona enfoques por rol/mercado, prepara solicitudes para análisis externo, recibe informes estructurados, exige evidencia y dato decisivo, calcula EV con pushes y sensibilidad, y conserva revisiones. Permite crear ficha y aplicar un dictamen revisado en las tres secciones del Radar. No crea apuestas.

El informe completo se adjunta y conserva en la recuperación compatible; su estado vuelve a «En análisis / Sin calificar». Producción y base de datos no se modifican. No hay inferencia de IA ni búsqueda de datos automática en el sitio. Ver `prompts/METODOLOGIA.md`.

Validación local: 24 escenarios previos y pruebas nuevas del motor, compatibilidad de recuperación y clasificación del Radar; comprobación de sintaxis e integridad de originales. No se afirma una prueba visual en un navegador real ni validación de un modelo predictivo.


## Conexión IA directa · 17 de octubre de 2026

Función `juande-analyze` activa en Supabase de pruebas. Autentica la sesión y restringe el uso al propietario; cuota diaria e idempotencia en base de datos. Frontend conectado para recibir y guardar informes sin copiar JSON desde el chat. Diagnóstico remoto: servicio responde 200, sin credencial OpenAI (`configured:false`, `enabled:false`), rechaza POST sin sesión con 401. La ejecución real con IA queda pendiente de clave y activación explícita en Secrets; no se realizó consumo pagado.

13 pruebas nuevas del servicio con proveedor simulado y pruebas SQL reales revertidas de cuota/permisos. Producción y las tablas de picks/parlays no se modificaron. Ver `supabase/functions/juande-analyze/README.md`.


## Gemini gratuito · 17 octubre 2026

Sustituida la conexión anterior por Gemini 2.5 Flash fijo. Cinco reservas por día UTC, máximo dos llamadas por investigación, límites de entrada/salida y sin reintentos, modelos alternativos ni servicios de pago. Error 429 detiene la consulta. La configuración anterior no activa el servicio.

Activación bloqueada hasta guardar la clave privada de un proyecto Google Free sin facturación y confirmar esa condición en secretos. El servicio no verifica Cloud Billing: mantener Google sin facturación y Supabase en Free es condición externa. Sin credencial disponible no se ha hecho una investigación real. 15 pruebas de servicio y las suites de análisis, recuperación y finanzas pasan. Sin prueba visual en navegador ni cambios en producción.


## Pantalla simplificada · 17 octubre 2026

Análisis con un botón principal, selección automática por tipo/rol y resultados en texto claro. Los 26 enfoques, el JSON, la revisión detallada, los análisis guardados y los respaldos están en apartados desplegables. Se unifica la fecha/hora del evento, la hora del precio se completa al capturarlo y los tipos de equipos/carrera/recepción sugieren su rol. Las reglas desconocidas se envían como pendientes explícitos. Cambiar el caso oculta el informe anterior; nada se aprueba automáticamente. La investigación y los límites gratuitos conservan el servicio existente. Verificaciones: estructura HTML, referencias, sintaxis y 43 grupos de pruebas correctos; sin verificación visual de navegador.
