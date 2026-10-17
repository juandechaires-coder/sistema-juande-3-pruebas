# Investigación y razonamiento en servidor

Servicio desplegado en el proyecto de pruebas, función `juande-analyze`. Implementa dos fases mediante Gemini 2.5 Flash (modelo fijo): búsqueda web obligatoria y análisis con salida estructurada. Las URLs del informe se contrastan con las devueltas por búsqueda; esa comprobación acredita procedencia, no veracidad ni vigencia del precio.

## Activación del propietario

En [Supabase · Edge Function Secrets](https://supabase.com/dashboard/project/hblfzvfmrnaubetcqayw/functions/secrets), añadir:

| Nombre | Valor |
| --- | --- |
| `GEMINI_API_KEY` | Clave privada de un proyecto Gemini Free **sin cuenta de facturación vinculada** |
| `GEMINI_FREE_TIER_CONFIRMED` | `true`, únicamente después de comprobar esa condición en Google AI Studio |

Crear la clave en https://aistudio.google.com/api-keys. No activar «Set up billing», no comprar créditos ni usar una clave de proyecto Paid. No pegar la clave en chat, HTML o GitHub. Los secretos se configuran en Supabase, sin modificar archivos públicos.

La confirmación es una declaración del propietario: la función no tiene permisos para consultar Cloud Billing y devuelve `billing_verified:false`. Una API key no demuestra que el proyecto sea gratuito. Si se vincula facturación después, el código no puede impedir que Google cobre; retirar inmediatamente la confirmación o la clave. Los límites de uso no sustituyen un proyecto sin facturación. El alojamiento también debe mantenerse en Supabase Free; no se ha comprobado el plan de la organización ni modificado ninguna suscripción.

Estado de entrega: conexión bloqueada mientras falten clave y confirmación. No se ha efectuado una consulta real a Gemini. El diagnóstico público no consume Gemini. En el nivel gratuito Google puede usar los datos para mejorar sus productos; enviar solamente información deportiva pública, nunca credenciales ni datos personales sensibles.

## Controles

- `verify_jwt=false` permite CORS/preflight y diagnóstico público; cada POST valida su Bearer contra `/auth/v1/user`. Esto no desactiva la autenticación propia del servicio.
- Solo la cuenta de pruebas del propietario puede invocar investigación. Se compara SHA-256 del identificador autenticado; el hash no es una credencial. No se usa metadata editable como autorización.
- El navegador nunca envía una clave Gemini y no decide el modelo, instrucciones de servidor o límites.
- Cinco reservas al día por usuario en UTC; exclusión transaccional con advisory lock. Identificadores duplicados no vuelven a consultar al proveedor. Una solicitud fallida consume la reserva para evitar reintentos y consumo ambiguo.
- Tabla de reservas con RLS de lectura propia y sin INSERT/UPDATE/DELETE para clientes. Wrapper RPC público `SECURITY INVOKER`; implementación de cuota en esquema privado `SECURITY DEFINER`, con `auth.uid()` y search_path vacío. No se usa service role en la función.
- Máximo dos peticiones Gemini por investigación: búsqueda con Google Search y estructuración JSON sin herramientas. Salidas limitadas a 4096 y 8192 tokens, razonamiento a 512 y 1024 respectivamente, caso a 50000 bytes y solicitud construida a 45000 caracteres. Sin reintentos, tareas programadas, caché de pago, alternativas ni modelos configurables. Un error 429 detiene el proceso y muestra cuota gratuita agotada/límite temporal. Los límites de Google pueden impedir completar las cinco investigaciones diarias; no se garantiza disponibilidad.
- `OPENAI_API_KEY`, `OPENAI_MODEL`, `GEMINI_MODEL` y la antigua activación no tienen efecto. Solo se llama a `gemini-2.5-flash:generateContent` con clave en encabezado privado.
- Las URLs proceden de `groundingChunks` y pueden ser redirecciones de Google. Las sugerencias originales de búsqueda se muestran en un iframe aislado, sin scripts ni acceso al almacenamiento de la aplicación.
- No se investigan mercados en vivo: una búsqueda web carece de garantía de latencia adecuada. No se conectan logins de casas ni se eluden sus restricciones.
- Probabilidades nulas si no existe modelo sustentado. Los informes llegan con comprobaciones humanas sin marcar; ninguna respuesta se convierte automáticamente en apuesta o en grado A.

## Archivos y mantenimiento

`engine.js` y `catalog.js` son paquetes mínimos del contrato del navegador, sin originales ni funciones locales de almacenamiento. Las pruebas verifican equivalencia de la solicitud y de su identificador. Mantener ambos paquetes sincronizados al cambiar la metodología; actualizar solo el frontend dejaría versiones incompatibles.

Las respuestas y revisiones se conservan localmente en el asistente, y el informe se puede adjuntar a una ficha para la copia a nube existente. El servicio no guarda automáticamente credenciales ni resultados en tablas de apuestas.

## Verificación

15 pruebas de servidor con proveedor simulado: autenticación, propietario, CORS, configuración, cuotas/idempotencia, llamada de búsqueda, esquema, procedencia de fuentes y errores. La base real de pruebas confirmó cuota de cinco, bloqueo de sexto intento, lectura aislada y permisos; todo mediante transacciones revertidas. La prueba con Gemini real queda pendiente de activación.

El advisor solo conserva el aviso previo sobre [protección de contraseñas filtradas](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection). La nueva RPC pública no es SECURITY DEFINER.

Fuentes oficiales consultadas el 17 de octubre de 2026:

- https://ai.google.dev/gemini-api/docs/pricing (2.5 Flash Standard, texto y Google Search gratuitos con cuota)
- https://ai.google.dev/gemini-api/docs/billing (la clave hereda la facturación del proyecto)
- https://ai.google.dev/api/generate-content
- https://ai.google.dev/gemini-api/docs/structured-output
- https://supabase.com/docs/guides/functions/secrets
