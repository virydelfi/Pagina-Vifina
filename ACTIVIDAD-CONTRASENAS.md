# Actividad: el laboratorio de contraseñas

## Qué vamos a hacer

Una página donde **inventás una contraseña** y ves dos cosas:

1. **Qué tan fuerte es**: cuántas combinaciones tiene y cuánto tardaría un hacker en descubrirla.
2. **Un ataque en vivo**: la página intenta «crackearla» probando contraseñas una por una, como lo haría un programa de verdad.

Al lado, un panel **«Lo que pasa por dentro»** te muestra el código de JavaScript que está corriendo y las variables que van cambiando.

La idea es que veas, con tus propios ojos, **por qué `pikachu123` es una mala contraseña** y por qué una frase larga es una buena. Y de paso, que entiendas cómo funcionan los **bucles**, los **`if`** y las **funciones**, que son la base de programar.

**No tenés que escribir ni copiar nada.** Alcanza con mergear este Pull Request y abrir la página.

Todo pasa en tu navegador: la contraseña **no se manda a ningún lado**. Igual, usá siempre una **inventada**.

## Paso a paso

1. Entrá al Pull Request en GitHub y apretá **Merge pull request** y después **Confirm merge**.
2. En la terminal, dentro de la carpeta del proyecto, escribí `git pull`.
3. En VS Code, abrí la carpeta `laboratorio-contrasenas`, hacé clic derecho sobre `index.html` y elegí **Open with Live Server**.

Necesitás internet para que se vean las tipografías.

## Probá esto

Hacelas en orden. Después de cada una, mirá cómo cambia **todo el color de la página**: rojo si es débil, verde si es fuerte.

1. **La peor de todas.** Tocá el ejemplo `123456` y apretá **Diccionario**. La encuentra en el intento 1.
2. **La mascota.** Tocá `pikachu` y apretá **Diccionario**. Fijate cuántos intentos le lleva, y mirá la lista que va probando. Después tocá `Pikachu2024`. Ponerle mayúscula y un año no la salvó.
3. **Cámara lenta.** Tildá **Cámara lenta**, y atacá `123456` con **Diccionario**. Mirá cómo se iluminan las líneas del código una por una: eso es un bucle `for` trabajando.
4. **Fuerza bruta.** Tocá `abc12` y apretá **Fuerza bruta**. Probó **1.777.853 contraseñas** en una fracción de segundo. Mirá el contador grande de arriba girando como un odómetro.
5. **Cuando no alcanza el tiempo.** Tocá `zq8vrt` (son solo 6 caracteres) y apretá **Fuerza bruta**. A los 6 segundos la página se rinde y te cuenta cuánto le faltaba.
6. **Los números de la lámina.** Con `zq8vrt`, mirá los dos tiempos de «Cuánto tardaría en crackearla»: desde internet tarda **años**, pero con una placa de video, **menos de 1 segundo**. ¿Por qué cambia tanto?
7. **Más largo, más fuerte.** Tocá `Tr0ub4dor&3` y después `caballo bateria grapa correcta`. Compará los tiempos. ¿Cuál es más fácil de recordar?
8. **Inventá las tuyas.** Escribí contraseñas propias (inventadas, no las reales) y tratá de conseguir la etiqueta **Excelente** con la menor cantidad de caracteres posible. Apostá con un compañero a ver quién lo logra más corto.
9. **Agregá un carácter.** Escribí `hola` y mirá el tiempo. Ahora `hola1`, `hola12`, `hola123`... ¿Cuánto cambia el tiempo con cada carácter nuevo?

## Qué aprendés (conceptos de programación)

| Concepto | Dónde lo ves en esta página |
| --- | --- |
| **Variable** | `intentos` va sumando 1 en cada prueba. Mirala en «Variables en vivo». |
| **`for`** | Probar una palabra del diccionario después de otra. |
| **Bucle dentro de otro bucle** | Para cada palabra, probar todas sus «variantes» (con mayúscula, con número...). |
| **`if`** | «¿Esta variante es igual a la contraseña? Entonces return». |
| **Función** | `atacarConDiccionario` y `atacarConFuerzaBruta` hacen una tarea y devuelven un resultado. |
| **Array (lista)** | `diccionario` es una lista de palabras. |
| **String (texto)** | La contraseña es un texto, y se compara carácter por carácter. |
| **Potencias** | `26 × 26 × 26...`: por eso cada carácter nuevo multiplica el trabajo. |

## Por qué una contraseña larga gana

Una contraseña de 4 letras minúsculas tiene `26 × 26 × 26 × 26 = 456.976` combinaciones. Una compu las prueba en un instante.

Con 8 letras son `26⁸`, más de **200.000 millones**. Con 12 letras ya son más de **95.000 billones**. Y si sumás mayúsculas, números y símbolos, la cuenta se dispara.

Pero ojo: una contraseña con muchas combinaciones **puede ser débil igual** si es una palabra conocida. Los atacantes no empiezan por la fuerza bruta: empiezan por un **diccionario** de las contraseñas más usadas del mundo, con sus disfraces típicos (`Pikachu`, `p1kachu`, `pikachu123`). Si la tuya está ahí, la descubren en segundos aunque parezca complicada.

## Cambios chiquitos (opcionales)

Cada uno es cambiar **una cosa** en `app.js` y guardar. Live Server recarga solo.

1. **Agregá tu palabra al diccionario.** Buscá `const diccionario` y sumá una palabra que sea tuya (el nombre de tu mascota, tu equipo...). Después escribila como contraseña y apretá **Diccionario**.
2. **Otro tiempo límite.** Buscá `LIMITE_FUERZA_BRUTA_MS = 6000` y poné `15000` (15 segundos). Ahora `zq8vrt` sí se llega a crackear.
3. **Una placa de video más poderosa.** Buscá `INTENTOS_POR_SEGUNDO_PLACA` y agregale un cero al número. Mirá cómo se achican los tiempos.
4. **Un disfraz nuevo.** Buscá `const sufijos` y agregá `'2026'` o `'*'`. El diccionario ahora prueba más variantes.
5. **Tus propios ejemplos.** Buscá `const ejemplos` y cambiá los botones por contraseñas inventadas tuyas.

## Cómo funciona (para los que tienen curiosidad)

- `index.html` es la estructura de la página y `estilos.css` los colores. El cerebro está en `app.js`.
- Para el diccionario, la página arma una lista gigante con cada palabra y sus variantes (en mayúscula, con números atrás, con letras cambiadas por números) y las prueba una por una.
- Para la fuerza bruta usa un **odómetro**, como el de un auto: `a, b, c ... z, aa, ab, ac ... zz, aaa ...`. Va avanzando de a una combinación y compara con la contraseña.
- Para que se pueda ver en 6 segundos, la página asume que el atacante **ya sabe qué tipos de caracteres usaste** (minúsculas, números...). En la vida real el atacante tendría que probar con todos, y tardaría todavía más.
- Los tiempos de la lámina son **aproximados**: sirven para entender la idea, no para medir con precisión.
- Las contraseñas de verdad **no se guardan en texto**: los sitios guardan una versión «mezclada» (un *hash*) y los hackers atacan esa versión cuando se filtra una base de datos. Por eso en el ejemplo hablamos de «si se filtró la base». Esta página prueba contra la contraseña directamente, para simplificar.

## Si algo sale mal

- **La página se ve sin la tipografía del título:** revisá que tengas internet.
- **El botón de ataque no se puede apretar:** primero escribí una contraseña o tocá un ejemplo.
- **Se quedó trabada en un ataque:** apretá **Parar**. Si cambiás la contraseña, el ataque se frena solo.
- **La fuerza bruta no termina:** es lo esperado con contraseñas largas. A los 6 segundos se corta y te cuenta cuánto faltaba.
- **Para ver el error real:** apretá **F12** y mirá la pestaña **Consola**. Si hay algo en rojo, pegáselo a ChatGPT o Gemini y pedile *«explicame este error para alguien que recién empieza»*.

## Una pregunta para pensar

Muchos sitios te limitan a **5 intentos** y después te bloquean la cuenta. ¿Por qué eso hace tan difícil la fuerza bruta desde internet? ¿Y por qué **no sirve de nada** si el atacante ya robó la base de datos?
