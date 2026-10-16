# Prompts originales recuperados

1. `originales/touchdown_prop_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Touchdown. Su número dentro de los 27 originales todavía no está identificado. Guardado íntegro; aún no se ejecuta desde la aplicación.

2. `originales/goal_line_role_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Touchdown, vinculado a Running Back. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

3. `originales/prop_pricing_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Market & Pricing, vinculado a Touchdown. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

4. `originales/live_betting_latency_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Live Market. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

5. `originales/live_line_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Live Market. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

6. `originales/in_play_discipline_check.txt` — texto entregado por Juande el 16 de octubre de 2026; control transversal de disciplina y exposición, vinculado a Live Market. La especificación previa asigna disciplina al prompt 7, pero su correspondencia exacta aún no se da por confirmada. Guardado íntegro; aún no se ejecuta desde la aplicación.

## Revisión pendiente del prompt Anytime TD

- Los porcentajes históricos se conservan como afirmaciones del texto original. Falta una fuente verificable y delimitar liga, temporadas y definición del denominador; no se consideran datos validados.
- La frase «under half of it for the other» no se deduce de los porcentajes citados: el propio texto sitúa 67% de touchdowns por pase dentro de la yarda 20. Distinguir fracción de anotaciones, valor predictivo del uso en zona roja y volumen/explosividad antes de elaborar una versión operativa. No se cambió el original.
- Mantener separados los criterios para corredores y receptores y analizar ambas vías en jugadores híbridos. Definir el dato decisivo y detener el análisis si falta.
- No se recibió un jugador ni una cuota concreta; no hay una recomendación de apuesta resultante de esta captura.

## Revisión pendiente del prompt de rol en línea de gol

- Verificar fuente, periodo y definiciones de los porcentajes históricos citados; no tratarlos como probabilidades individuales.
- Para mostrar las dos columnas solicitadas faltan los acarreos totales por jugador entre los campos de entrada. Documentar juegos disputados y comparabilidad de la muestra.
- Menos de cuatro partidos es el umbral de cautela solicitado por el usuario, no una garantía de estabilidad al llegar a cuatro.
- Las conclusiones de sobreprecio requieren cuota y probabilidad estimada documentada; el rol por sí solo no demuestra que un jugador sea el más sobrevalorado del mercado.
- Evaluar participación del quarterback con datos observados, sin restar automáticamente el 33% histórico a la probabilidad del corredor.
- No se recibió un caso concreto de jugadores o partido.

## Revisión pendiente del prompt de precios de props

- Los márgenes, la comparación 4.1%/28.9%, el promedio de 2025 y el dato de Week 1 necesitan fuentes, fechas y metodología. Conservar las afirmaciones originales sin presentarlas como estadísticas verificadas.
- El formato de cuota y la estimación propia de probabilidad deben incluirse en las entradas para poder convertir y comparar. Si falta la estimación, solo puede mostrarse el punto de equilibrio.
- Los eventos Anytime TD de distintos jugadores no son mutuamente excluyentes: sumar sus probabilidades implícitas y restar 100% no determina por sí solo el margen de una pizarra de «sí». El número de jugadores cotizados tampoco basta para calcularlo.
- Diferenciar overround de un mercado sí/no, margen estimado de una pizarra y retención realizada de la casa.
- La mejor cuota solo puede afirmarse entre las casas y cotizaciones efectivamente verificadas, con hora de consulta y mismas reglas de liquidación; no garantizar que sea la mejor de todo el mercado.
- Una separación entre casas es diferencia de precio, no evidencia suficiente de EV positivo ni de rentabilidad. La afirmación final sobre pérdidas de temporada se conserva como texto original, no como resultado matemático inevitable.
- No se recibieron jugador, cuotas concretas ni estimación de probabilidad.

## Revisión pendiente del prompt de latencia en vivo

- No deducir segundos exactos solo a partir de la categoría cable/streaming/Red Zone/estadio. Requiere servicio, dispositivo, ajustes, momento de medición y referencia sincronizada; si no hay medición, mostrar incertidumbre y no inventar una cifra.
- Distinguir retraso audiovisual, retraso del marcador, feed de la casa, actualización de cuotas y demora de aceptación. Estar en el estadio no asegura prioridad sobre el feed.
- La sensibilidad relativa depende del tiempo hasta liquidación y de la información pendiente. Clasificar solo los mercados que indique el usuario; no afirmar que el precio ya cambió en cada caso sin observación.
- «Unwinnable» es una afirmación absoluta: distinguir una apuesta que puede acertar de una estrategia sin ventaja demostrada. La latencia puede justificar no apostar por reacción, pero no implica probabilidad cero de ganar.
- La latencia por sí sola no cuantifica un coste monetario ni el EV: se necesitan precios observados, marcas temporales y una estimación documentada del valor.
- No se proporcionaron servicio, segundos medidos ni mercados concretos. El original queda intacto.

## Revisión pendiente del prompt de líneas en vivo

- Definir deporte, liga, periodo del mercado, equipo al que corresponde el hándicap, signo, cuota, timestamp y reglas de prórroga. Comparar cotizaciones sincronizadas del mismo mercado.
- Distinguir total final del partido (incluye puntos ya anotados) de puntos restantes. Menos tiempo reduce oportunidades futuras, pero no implica automáticamente que baje el total final.
- No presentar como cálculo exacto una simple extrapolación lineal por minutos. Documentar ritmo esperado, posesión, posición de campo, down/distancia, tiempos muertos, estado del reloj y reglas relevantes.
- Separar el efecto de marcador/reloj del de lesiones, eficiencia, información nueva y revisión de fuerza requiere un modelo o comparación contrafactual explícita. Sin eso no cuantificar la descomposición ni afirmar sobreajuste.
- Una sola serie puede contener información relevante; no fijar de antemano la respuesta a «¿debería cambiar la valoración?».
- La descripción de los modelos de la casa es una hipótesis del prompt: no sabemos qué datos o señales utiliza una casa concreta. No afirmar que solo usa marcador y reloj o que no incorpora lo ocurrido en el partido.
- Conservar los tres dictámenes solicitados: movimiento proporcionado, posible exceso o información insuficiente. Una discrepancia de línea no demuestra EV positivo sin cuota y probabilidad justificadas.
- No se recibió un partido ni líneas concretas. El original queda intacto.

## Revisión pendiente del control de disciplina en vivo

- Solicitar apuesta, cuota vigente, importe, unidad habitual, resultados del día y motivo. Distinguir apuestas liquidadas, pendientes y exposición; expresar importe/unidad cuando ambos sean válidos.
- Formular la pregunta sobre aumento de importe sin sugerir que recuperar pérdidas lo justifica. No aumentar automáticamente la unidad ni proponer progresiones para recuperar.
- Identificar evidencia observable y su fuente/hora. La observación puede ser cierta sin justificar el precio; «lectura» no equivale a valor positivo ni a autorización para apostar.
- Mantener los tres dictámenes: lectura, reacción o información insuficiente. No atribuir estados psicológicos que no se desprendan de la información proporcionada.
- Si los datos indican persecución de pérdidas o impulso, el flujo debe permitir detenerse/cerrar la app, sin presentar otra apuesta como solución.
- La frase sobre ser el único mercado que ofrece precio al perder es retórica del original, no una propiedad exclusiva verificada del mercado en vivo.
- Este mensaje contiene una plantilla, no una declaración del estado emocional ni de pérdidas del usuario. No se recibió una apuesta concreta.
- El original queda intacto.

Estado: 6 textos originales recuperados; los restantes siguen pendientes. La conservación del archivo no equivale a integración funcional de los 27 prompts.
