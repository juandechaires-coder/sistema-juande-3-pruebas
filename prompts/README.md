# Prompts originales recuperados

1. `originales/touchdown_prop_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Touchdown. Su número dentro de los 27 originales todavía no está identificado. Guardado íntegro; aún no se ejecuta desde la aplicación.

2. `originales/goal_line_role_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Touchdown, vinculado a Running Back. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

3. `originales/prop_pricing_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Market & Pricing, vinculado a Touchdown. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

4. `originales/live_betting_latency_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Live Market. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

5. `originales/live_line_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Live Market. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

6. `originales/in_play_discipline_check.txt` — texto entregado por Juande el 16 de octubre de 2026; control transversal de disciplina y exposición, vinculado a Live Market. La especificación previa asigna disciplina al prompt 7, pero su correspondencia exacta aún no se da por confirmada. Guardado íntegro; aún no se ejecuta desde la aplicación.

7. `originales/scripted_drive_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo First Quarter. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

8. `originales/early_down_defense_tempo_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo First Quarter. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

9. `originales/first_quarter_line_consistency_checker.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo First Quarter, vinculado a Market & Pricing. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

10. `originales/receiver_separation_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Receiver. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

11. `originales/yards_after_catch_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Receiver. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

12. `originales/quarterback_impact_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Receiver. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

13. `originales/attribution_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Player Performance, con aplicación transversal a la evaluación individual. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

14. `originales/hidden_value_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Player Performance, con aplicación transversal a roles y aportaciones individuales. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

15. `originales/repeatability_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Player Performance, vinculado a la evaluación de estabilidad y regresión. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

16. `originales/backfield_workload_analyst.txt` — texto entregado por Juande el 16 de octubre de 2026; módulo Running Back. Número original sin identificar. Guardado íntegro; aún no se ejecuta desde la aplicación.

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

## Revisión pendiente del prompt de series planificadas

- Verificar la fuente del 60% desde 2007 y definir su unidad de análisis (equipo, equipo-temporada, partido) y la métrica que determina «mejor». No tratarlo como probabilidad de cubrir una línea de primer cuarto.
- Definir «scripted window»: primer drive, primeras N jugadas u otra ventana. No confundir primer drive con primer cuarto ni mezclar ventanas entre equipos.
- Separar tasa de anotación, EPA/jugada y yardas/jugada; registrar muestra, oponentes, localía y temporadas/coordinador comparables. No completar la clasificación histórica sin evidencia.
- La velocidad de ajuste defensivo y el efecto de ser coordinador nuevo requieren evidencia; no fijar un instante exacto en que desaparece la ventaja ni asumir que un debutante es necesariamente más impredecible.
- Considerar quién recibe la primera posesión, ritmo, oportunidades y reglas del mercado al relacionar el guion inicial con el primer cuarto. Cuota y probabilidad justificadas siguen siendo necesarias para afirmar valor.
- Si falta la comparación dentro/fuera de guion, devolver lectura de guion no disponible, tal como exige el original.
- No se recibió un enfrentamiento ni datos concretos. El original queda intacto.

## Revisión pendiente del prompt de defensa y ritmo del primer cuarto

- Verificar liga, temporadas y fuente de los promedios de nueve/catorce puntos y del supuesto de dos/tres posesiones por equipo. Son referencias del original, no cifras validadas ni límites garantizados.
- Definir tasas defensivas (three-and-out, éxito permitido en primeros downs), denominadores, dirección y muestras comparables. Una tasa alta de éxito permitida indica algo distinto de una tasa alta de stops.
- Segundos por jugada no bastan para calcular posesiones: considerar jugadas por serie, incompletos, carrera/pase, reloj, posición de campo y posesión inicial. Mostrar estimación o intervalo y supuestos; no forzar «dos o tres» cuando no esté sustentado.
- Una serie que empieza en el primer cuarto puede continuar en el segundo; distinguir posesiones iniciadas, completadas y puntos anotados dentro del periodo.
- Relacionar defensa contra carrera/pase con el guion inicial real del rival; si ese guion es desconocido, declarar el dato faltante.
- El punto de partida debe ser el mercado exacto (hándicap o total), equipo/signo y cuota. Una dirección táctica favorable no demuestra por sí misma valor para apostar.
- No se recibieron equipos, métricas, posesión inicial ni líneas concretas. El original queda intacto.

## Revisión pendiente del diagnóstico de coherencia del primer cuarto

- Verificar fuente, periodos, muestras y denominadores de 20%, 1.0, 2.7, 37%, dos tercios, 92.5% y 24%. Los cocientes citados son supuestos del original, no parámetros calibrados del sistema.
- La diferencia media de puntos de los locales no identifica por sí sola un efecto causal puro de localía: requiere controlar fuerza de rivales, calendario y otros factores. No usar automáticamente 2.7 como ventaja actual de cualquier estadio.
- El hándicap completo ya incorpora localía y otra información; hace falta una estimación independiente de esa contribución para separarla sin doble conteo. Fijar convención de signos y equipo antes de calcular.
- Como identidad diagnóstica bajo supuestos explícitos: margen esperado del local en 1Q = s × (margen esperado del local en partido − H_partido) + H_1Q. Si se usa H_1Q = h × H_partido, queda s × margen_partido + (h − s) × H_partido. No confundir margen esperado con el signo opuesto del hándicap cotizado.
- Diferenciar puntos de un equipo, marcador conjunto y margen entre equipos al definir números clave. La frecuencia de un marcador no es automáticamente la probabilidad de push o de cubrir un hándicap.
- Para el empate faltan las cuotas del mercado de tres vías (idealmente las tres). Mostrar probabilidad implícita, tratamiento del margen y modelo de probabilidad de empate antes de llamarla generosa.
- Definir y verificar también el total 1Q: una proporción histórica no garantiza proporcionalidad del total de un partido concreto.
- Mantener el carácter de diagnóstico: una discrepancia indica qué investigar, no una apuesta aprobada.
- No se recibieron equipos, líneas ni cuotas concretas. El original queda intacto.

## Revisión pendiente del prompt de separación de receptores

- Definir fuente, temporada, muestra y metodología de separación: en el lanzamiento, recepción, todas las rutas o solo targets. Estas mediciones no son intercambiables ni resumen por sí solas toda la capacidad de desmarque.
- Diferenciar tasa de éxito en recepciones disputadas (atrapadas/intentos disputados), proporción de targets disputados y catch rate total. No afirmar que uno sostiene al otro sin datos conjuntos.
- Registrar profundidad de target, precisión/timing del quarterback, rutas, alineación y cobertura. No inferir rutas ganadoras o coberturas problemáticas a partir solo de tamaño, velocidad o catch rate agregado.
- Separar rendimiento por ruta de frecuencia de uso: una ruta poco utilizada no demuestra incapacidad, y una muestra pequeña de éxitos no prueba dominio.
- No fijar regresión inevitable de recepciones disputadas sin muestra, comparación y evidencia de estabilidad; un perfil puede combinar separación y habilidad en tráfico.
- Conservar los dictámenes originales, permitiendo perfil mixto o información insuficiente cuando los datos no sostengan una categoría única.
- La advertencia sobre desaparecer ante un corner físico es una hipótesis contextual, no un desenlace garantizado.
- No se recibió jugador ni datos concretos. El original queda intacto.

## Revisión pendiente del prompt de yardas tras recepción

- Para separar yardas totales recibidas entre aire y YAC hacen falta métricas sobre recepciones completadas de la misma muestra. El aDOT de todos los targets no equivale a yardas aéreas completadas y no permite obtenerlas restándolo de yardas totales.
- Distinguir YAC total, YAC por recepción, YAC esperado y YAC sobre esperado cuando existan; registrar fuente, definiciones, temporada y número de recepciones.
- Pantallas, motion y pases rápidos pueden facilitar espacio, sin eliminar el aporte del receptor. No asumir que toda yarda de una jugada diseñada proviene exclusivamente del coordinador.
- Para atribuir producción a tackles evitados, velocidad o avance tras contacto se necesitan datos o revisión verificable de jugadas; no deducirlo solo de YAC agregado.
- Evaluar el cambio de volumen y eficiencia si se reducen toques diseñados como escenario condicionado, con supuestos; no garantizar una caída ni declarar que la habilidad no se transfiere ante cualquier cambio.
- Mantener los tres perfiles solicitados y permitir información insuficiente cuando falten evidencias.
- No se recibió jugador ni datos concretos. El original queda intacto.

## Revisión pendiente del prompt de impacto del quarterback

- Relacionar las zonas y rutas donde gana el receptor con la distribución de targets, precisión y disposición del quarterback a lanzar allí; registrar fuente, temporada, muestra y contexto. El tiempo para lanzar o la precisión global no bastan por sí solos.
- Distinguir disposición a lanzar profundo o a ventanas estrechas de precisión y eficiencia en esos intentos. La voluntad del quarterback influye, pero no determina por completo el techo: intervienen protección, esquema, cobertura, rol y habilidad del receptor.
- Separar volumen de pases del equipo, rutas del receptor, participación de targets y calidad de esos targets. Un ataque de bajo volumen no implica automáticamente escaso volumen individual.
- Definir qué significan suelo y techo (recepciones, yardas, touchdowns y horizonte). No inventar porcentajes de producción atribuibles al quarterback o al receptor sin modelo o comparación sustentada.
- Un mismo box score puede resultar de causas distintas; no afirmar equivalencia causal entre mala separación e imprecisión del quarterback a partir del resultado agregado.
- Mantener los tres dictámenes solicitados, permitiendo información insuficiente cuando no se pueda atribuir el efecto. Ningún dictamen garantiza producción ni valor de una apuesta.
- No se recibió receptor, quarterback ni datos concretos. El original queda intacto.

## Revisión pendiente del prompt de atribución

- Conservar la línea estadística oficial y sus definiciones. Separar el registro del resultado de la valoración causal; una intercepción o sack correctamente registrado no es un error de anotación por el mero hecho de existir responsabilidad compartida.
- Para atribuir cada jugada se necesitan identificadores, contexto y evidencia verificable (vídeo, play-by-play o evaluación documentada). Un pase desviado o presión inmediata no exculpa automáticamente al quarterback ni identifica por sí solo al responsable.
- Permitir responsabilidad compartida y casos indeterminados entre jugador, compañeros, esquema y situación. No forzar un culpable único ni inferir asignaciones de protección o cobertura que no se conocen.
- Revisar también los resultados positivos con criterios simétricos, considerando aportes del jugador y ayudas de compañeros, rival o diseño.
- Cualquier línea ajustada es una estimación analítica contrafactual, no una estadística oficial ni el resultado garantizado de jugadas alternativas. Explicar reglas, supuestos e incertidumbre; si no se puede cuantificar, presentar atribuciones cualitativas sin inventar números.
- La liquidación de apuestas depende de las reglas de la casa y la fuente oficial aplicable; la atribución analítica no modifica por sí sola el resultado liquidado.
- Mantener los tres dictámenes solicitados y permitir información insuficiente o resultados mixtos cuando no exista evidencia para una conclusión global.
- No se recibió jugador, línea estadística ni jugadas concretas. El original queda intacto.

## Revisión pendiente del prompt de valor oculto

- Definir posición, rol y asignaciones observables antes de atribuir bloqueos, protección, rutas de arrastre, atención de cobertura u ocupación de bloqueadores. La función habitual de una posición no demuestra que el jugador la ejecute bien.
- Distinguir ausencia en el box score tradicional de ausencia de medición: pueden existir datos de tracking, charting o evaluaciones de vídeo. Registrar fuentes, muestra y criterios de éxito.
- Cuantificar la dependencia del éxito colectivo requiere un modelo o comparación sustentada y control de contexto. Si no existe, describir mecanismos y grado de evidencia sin inventar porcentajes ni causalidad.
- Identificar compañeros beneficiados mediante jugadas verificables; una correlación de estadísticas o diferencias con/sin el jugador no demuestran por sí solas que él las causó.
- Evaluar con criterios simétricos la ejecución favorable y los fallos. No asumir ni valor oculto ni excusa a partir de producción baja; permitir evidencia mixta o insuficiente.
- Precisar qué significa «infravalorado»: por el box score, por evaluadores o por una cuota concreta. Una contribución real no demuestra que el mercado la omita ni que una apuesta tenga valor.
- La afirmación de que es la excusa más común se conserva como parte del original, sin tratarla como frecuencia verificada. Los dictámenes no garantizan resultados.
- No se recibió jugador, estadísticas ni evidencia de asignaciones concretas. El original queda intacto.

## Revisión pendiente del prompt de repetibilidad

- Separar control individual, influencia compartida y variación aleatoria. Volumen y uso dependen también de entrenador, compañeros, lesiones y guion; no clasificarlos automáticamente como controlados por el jugador.
- Definir cada tasa y su denominador, fuente, periodo y muestra de oportunidades. Touchdowns, intercepciones no atrapadas, recuperaciones de fumbles y errores rivales pueden combinar habilidad, contexto y azar; no tratarlos como suerte pura por categoría.
- Para afirmar que una variable estuvo por encima o por debajo de lo esperable, justificar una referencia ajustada al rol, calidad de oportunidades y contexto, con incertidumbre. Sin referencia no cuantificar cuánto estuvo caliente o frío.
- Separar cambios de rol o proceso de fluctuaciones del resultado. Una racha puede contener mejoras reales; no fijar de antemano un declive solo porque hubo resultados favorables.
- Si se proyecta regresión, explicar horizonte, supuestos y método de ajuste según muestra y estabilidad de la métrica. No usar automáticamente la media de liga ni suponer que una muestra mayor elimina cambios de contexto.
- Regresar hacia una expectativa no implica que el azar compense resultados pasados: no pronosticar una mala racha para saldar una buena, ni prometer mejora tras resultados negativos.
- Mantener los tres dictámenes solicitados y permitir información insuficiente o componentes mixtos. Una proyección de producción no demuestra valor de una apuesta sin línea, cuota y distribución estimada.
- No se recibió jugador, línea estadística ni tamaño de muestra concretos. El original queda intacto.

## Revisión pendiente del prompt de carga del backfield

- Definir el denominador: acarreos del jugador entre acarreos de los corredores, o entre acarreos totales del equipo. Mostrar cuál se usa y tratar explícitamente carreras del quarterback, kneel-downs y otros corredores; no mezclar participaciones.
- Registrar fuente, partidos, fechas y acarreos por encuentro. Para la participación acumulada usar sumas de acarreos de la misma muestra; un promedio simple de porcentajes por partido puede producir una cifra distinta.
- Distinguir participación observada de volumen futuro esperado. Disponibilidad, lesiones, partidos incompletos, guion y cambios de plantilla pueden alterar la comparación de las últimas semanas.
- Identificar roles de otros corredores mediante uso observado (primeros downs, corto yardaje, línea de gol, pase o cierre del partido). Estar en el roster o en el depth chart no demuestra trabajo significativo.
- Snap share no equivale a carry share. Para evaluar situaciones de pase diferenciar rutas, targets y bloqueos de protección; salir en esos downs puede reducir oportunidades de recepción sin determinar automáticamente el volumen de acarreos.
- Una tendencia requiere datos comparables por partido; no inferirla de un único encuentro ni fijar categorías de workhorse/comité sin explicar criterios. Permitir rol incierto o información insuficiente.
- La comparación de doce frente a veintidós acarreos se conserva como regla orientativa del original, no como orden universal: importan mercado, línea, cuota, eficiencia y distribución del resultado.
- No se recibieron jugador, roster ni recuentos concretos. El original queda intacto.

Estado: 16 textos originales recuperados; los restantes siguen pendientes. La conservación del archivo no equivale a integración funcional de los 27 prompts.
