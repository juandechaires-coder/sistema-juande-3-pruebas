# Investigación y razonamiento en servidor

Servicio desplegado en el proyecto de pruebas, función `juande-analyze`. Implementa dos fases mediante OpenAI Responses: búsqueda web obligatoria y análisis con salida estructurada. Las URLs del informe se contrastan con las devueltas por búsqueda; esa comprobación acredita procedencia, no veracidad ni vigencia del precio.

## Activación del propietario

En [Supabase · Edge Function Secrets](https://supabase.com/dashboard/project/hblfzvfmrnaubetcqayw/functions/secrets), añadir:

| Nombre | Valor |
| --- | --- |
| `OPENAI_API_KEY` | Clave privada del proyecto OpenAI API con acceso y saldo/límites configurados |
| `JUANDE_AI_ENABLED` | `true`, después de revisar facturación API |
| `OPENAI_MODEL` | Opcional; por defecto `gpt-5`, modificable según acceso y coste |

No pegar la clave en el chat, HTML o GitHub. Los secretos están disponibles en la función sin volver a desplegarla. La API se factura aparte de ChatGPT; revisar presupuesto en OpenAI antes de activar.

Diagnóstico remoto real al desplegar: GET 200 con `configured:false`, `enabled:false`; POST sin sesión 401; preflight OPTIONS 200. No se realizó una llamada real a OpenAI ni una prueba completa de investigación porque falta la credencial y la activación. No hay peticiones reservadas después de las pruebas SQL con rollback.

## Controles

- `verify_jwt=false` permite CORS/preflight y diagnóstico público; cada POST valida su Bearer contra `/auth/v1/user`. Esto no desactiva la autenticación propia del servicio.
- Solo la cuenta de pruebas del propietario puede invocar investigación. Se compara SHA-256 del identificador autenticado; el hash no es una credencial. No se usa metadata editable como autorización.
- El navegador nunca envía una clave OpenAI y no decide el modelo, instrucciones de servidor o límites.
- Cinco reservas al día por usuario en UTC; exclusión transaccional con advisory lock. Identificadores duplicados no vuelven a consultar al proveedor. Una solicitud fallida consume la reserva para evitar reintentos y cargos ambiguos.
- Tabla de reservas con RLS de lectura propia y sin INSERT/UPDATE/DELETE para clientes. Wrapper RPC público `SECURITY INVOKER`; implementación de cuota en esquema privado `SECURITY DEFINER`, con `auth.uid()` y search_path vacío. No se usa service role en la función.
- Máximo cuatro llamadas a herramientas de búsqueda en la primera fase y dos llamadas Responses totales; timeout sin reintento automático. El límite de solicitudes/tokens no es un tope monetario: configurar presupuesto del proveedor.
- No se investigan mercados en vivo: una búsqueda web carece de garantía de latencia adecuada. No se conectan logins de casas ni se eluden sus restricciones.
- Probabilidades nulas si no existe modelo sustentado. Los informes llegan con comprobaciones humanas sin marcar; ninguna respuesta se convierte automáticamente en apuesta o en grado A.

## Archivos y mantenimiento

`engine.js` y `catalog.js` son paquetes mínimos del contrato del navegador, sin originales ni funciones locales de almacenamiento. Las pruebas verifican equivalencia de la solicitud y de su identificador. Mantener ambos paquetes sincronizados al cambiar la metodología; actualizar solo el frontend dejaría versiones incompatibles.

Las respuestas y revisiones se conservan localmente en el asistente, y el informe se puede adjuntar a una ficha para la copia a nube existente. El servicio no guarda automáticamente credenciales ni resultados en tablas de apuestas.

## Verificación

13 pruebas de servidor con proveedor simulado: autenticación, propietario, CORS, configuración, cuotas/idempotencia, llamada de búsqueda, esquema, procedencia de fuentes y errores. La base real de pruebas confirmó cuota de cinco, bloqueo de sexto intento, lectura aislada y permisos; todo mediante transacciones revertidas. La prueba con OpenAI real queda pendiente de activación.

El advisor solo conserva el aviso previo sobre [protección de contraseñas filtradas](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection). La nueva RPC pública no es SECURITY DEFINER.

Fuentes oficiales consultadas el 17 de octubre de 2026:

- https://developers.openai.com/api/docs/guides/tools-web-search
- https://developers.openai.com/api/docs/guides/structured-outputs
- https://supabase.com/docs/guides/functions/secrets
- https://supabase.com/docs/guides/functions/auth-legacy-jwt
- https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform
