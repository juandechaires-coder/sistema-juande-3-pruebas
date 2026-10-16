# Sistema Juande 3.0 — preparación para el 16 de octubre de 2026

Objetivo: liberar el viernes 16 de octubre. Estado: laboratorio; aún no aprobado para producción.

## Cambio del 15 de octubre

- Se compararon index.html y radar3-beta2.html con Beta 5, rc1-escritura.html con RC1 Fase 2 y rc1-radar-sync.html con Fase 3: coincidencia del contenido, ignorando espacios de extremos.
- Se incorpora el puente recuperado Fase 4A, con enlace de regreso. Mantiene su comportamiento de consulta y exportación.
- Inicio incluye accesos a Fase 4A y las pruebas RC1.
- No se cambiaron las claves locales, la lógica del Radar, los cálculos, las tablas ni las políticas de Supabase.

## Alcance actual

Beta 5 trabaja en el navegador. RC1 Fase 3 copia fichas nuevas a la nube de pruebas; Fase 4A consulta hasta 500 filas y permite exportarlas. Ese JSON no se importa directamente a Beta 5. No existe sincronización bidireccional completa.

Los ocho módulos están presentes. El texto íntegro original de los 27 prompts sigue pendiente de recuperación/verificación; las categorías no equivalen a su texto.

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
