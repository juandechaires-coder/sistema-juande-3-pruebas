# Sistema Juande — Análisis operativo 1.0

Actualizado el 17 de octubre de 2026. Alcance: los 26 prompts confirmados por Juande. Los originales permanecen intactos en `originales/`; las versiones en español en `operativos/` añaden entradas decisivas, método, incertidumbre y límites. Los identificadores siguen el orden de recuperación.

## Qué cambió en la metodología

1. Definir la apuesta completa antes del análisis: evento, hora/zona, mercado, selección, línea, casa, cuota, reglas y periodo. Un diagnóstico de jugador sin precio no es un pick.
2. Elegir enfoques por mercado y rol. Un receptor no se evalúa como un corredor de línea de gol; un híbrido requiere ambas lecturas. Hay 26 enfoques en los ocho módulos existentes, sin cambiar la estructura del Radar.
3. Exigir el dato decisivo de cada enfoque, fuentes, hora, muestra y denominadores. Lo que falta se declara; no se reemplaza con una métrica distinta ni se inventa una fuente.
4. Separar hechos, interpretación y pronóstico. Comparar rivales, disponibilidad, rol y guion sin contar varias veces la misma señal. Pedir argumento contrario y condición que invalida la tesis.
5. Documentar cualquier modelo y su calibración fuera de muestra. Una frecuencia histórica, un consenso de analistas o una simulación sin supuestos comprobados no certifican una probabilidad. Si falta modelo, probabilidades nulas y oportunidad condicional.
6. Comparar cotizaciones ejecutables del mismo mercado y reglas. «Mejor» significa solo entre las casas verificadas. Si existe una mejor cuota, actualizar el caso antes de promoverlo.
7. Evaluar precio e incertidumbre, además del rendimiento deportivo. No aumentar apuestas para recuperar pérdidas; varias oportunidades del mismo evento pueden estar correlacionadas.
8. Conservar revisiones y separar investigación, clasificación y apuesta ejecutada. El sitio no crea picks ni parlays automáticamente.

Las correcciones específicas están en cada versión operativa: muestras pequeñas en zona roja, YAC frente a expectativa, atribución compartida, regresión sin compensación de suerte, localía sin doble conteo, diferencia entre marcador y margen, y movimientos que no revelan por sí solos quién apostó.

## Cálculo de precio

Se utilizan probabilidades incondicionales de ganar W, push P y perder L, con W+P+L=1. Para cuota decimal d y retorno íntegro del importe en un push:

- EV neto por unidad = W(d−1)−L = Wd+P−1.
- Equilibrio de W = (1−P)/d.
- Sin push, el equilibrio es 1/d.
- Edge en pp = 100[W−(1−P)/d].

El rango bajo/alto es una sensibilidad de W manteniendo P fijo. Lo aporta el modelo; la app no lo convierte en un intervalo estadístico ni lo estima de oficio. No se calcula EV para líneas divididas o liquidaciones parciales no modeladas.

## Clasificación sugerida

- **No aprobados / D:** incluso el EV del escenario alto es ≤0.
- **Condicionales / C o B+:** faltan comprobaciones, probabilidad sustentada, calibración revisada, comparación de casas, datos decisivos o margen positivo bajo sensibilidad.
- **Principales / A−:** solo tras revisión humana declarada de evidencia, reglas, disponibilidad y modelo, con EV bajo >0, precio vigente, sin mejor precio verificado, y probabilidad sobre el umbral elegido.

Estas etiquetas son reglas de cribado, no grados de probabilidad calibrados ni garantías. El umbral inicial es 75% por preferencia del usuario y puede cambiarse por mercado; no demuestra valor ni es necesario para que una apuesta tenga EV positivo. Ningún promedio entre prompts genera una probabilidad.

Se usa como política operativa un máximo de 60 minutos desde la consulta de cuota (2 minutos en vivo). Son límites administrativos, no validación de latencia ni garantía de disponibilidad: comprobar siempre el precio antes de apostar. El comienzo del evento bloquea promoción de un caso prepartido. Un cambio de caso invalida el informe por su identificador de versión; no es una firma criptográfica ni prueba de autenticidad.

## Uso en la aplicación

1. Abrir `analisis.html` desde Inicio, Radar o una ficha. Cargar una ficha anterior si corresponde y confirmar los datos actuales.
2. Seleccionar los enfoques pertinentes, completar sus entradas y preparar la solicitud. Copiarla en este chat de Oráculo para el análisis con fuentes; el sitio no envía datos automáticamente.
3. Pegar el informe JSON en la aplicación. La estructura comprueba correspondencia del caso, resultados por enfoque, referencias, faltantes y probabilidades. El contenido de las fuentes requiere revisión humana.
4. Evaluar y guardar una revisión. Los borradores pueden guardarse aunque estén incompletos. Cada guardado conserva la revisión anterior.
5. Crear la ficha; se adjunta el informe completo. En el Radar principal usar «Revisar fichas para integrar» y confirmar. Después «Revisar dictamen de Oráculo» permite aplicar la clasificación calculada a las tres secciones. La vigencia se vuelve a comprobar al mostrarla.
6. Para cambiar precio, línea o evidencia, crear otra revisión y repetir análisis. El registro de una apuesta sigue siendo una acción independiente.

Los informes adjuntos se conservan al exportar/importar fichas y al recuperar una copia compatible de nube. La recuperación mantiene «En análisis / Sin calificar / sin validar»; abrir el informe en el asistente reinicia las comprobaciones. El respaldo completo del asistente conserva casos y revisiones; restaurarlos tampoco aprueba fichas.

## Límites explícitos

Esta entrega integra las 26 versiones operativas, selección por rol, generación de solicitudes, captura y validación estructural de informes, cálculo de precio, revisiones, fichas y clasificación. **No integra un servicio de IA servidor, búsqueda automática de cuotas/datos, calibración propia ni un modelo predictivo nuevo.** La inferencia se realiza fuera del sitio y se devuelve como informe. No se ponen claves privadas en el navegador. Automatizar esa parte requiere un servicio autenticado, datos autorizados y un modelo validado; no basta con añadir un botón.

Los datos de trabajo permanecen en este navegador hasta que el usuario exporta o usa la copia a nube de pruebas existente. Esa copia es unidireccional y no sobrescribe investigaciones existentes. Esta entrega no cambia tablas, políticas ni producción.

## Referencias de método

Las fuentes se usan para definiciones y diseño, no para validar todos los porcentajes históricos de los originales ni para producir predicciones actuales.

- [NFL Football Operations: Next Gen Stats](https://operations.nfl.com/gameday/technology/nfl-next-gen-stats): contexto de tracking y métricas esperadas.
- [NFL: Expected Rushing Yards](https://www.nfl.com/news/next-gen-stats-intro-to-expected-rushing-yards): separación de oportunidad/resultado y uso de distribuciones predictivas.
- [Modelos nflfastR, por sus desarrolladores](https://opensourcefootball.com/posts/2020-09-28-nflfastr-ep-wp-and-cp-models/): documentación de modelos y comprobación de calibración. No equivalen a calibración del Sistema Juande.

Las fórmulas de EV anteriores se derivan de los tres posibles retornos del mercado, no de los porcentajes históricos incluidos en los prompts originales.
