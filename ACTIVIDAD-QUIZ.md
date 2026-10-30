# Actividad: El Quiz de Programar

## Qué vamos a hacer

Un juego de preguntas para ver **cuánto aprendiste**. Hay 76 preguntas sobre:

- **Git y GitHub:** commit, fetch, push, pull, Pull Request, merge, ramas...
- **HTML** y **CSS**.
- **JavaScript:** variables, `if`, `else`, `for`, `&&`, `||`, funciones, arrays.
- **¿Qué muestra este código?:** te mostramos un programita y vos decís qué escribe en la consola. Los resultados están comprobados corriendo cada código de verdad.
- **APIs y bases de datos:** `fetch`, JSON, `await`, CRUD y SQL.
- **Seguridad:** contraseñas, fuerza bruta, diccionario, 2FA y phishing.

**No tenés que escribir ni copiar nada** para jugar. Alcanza con mergear este Pull Request y abrir la página.

## Paso a paso

1. Entrá al Pull Request en GitHub y apretá **Merge pull request** y después **Confirm merge**.
2. En la terminal, dentro de la carpeta del proyecto, escribí `git pull`.
3. En VS Code, abrí la carpeta `juego-preguntas`, hacé clic derecho sobre `index.html` y elegí **Open with Live Server**.

## Cómo se juega

- Elegí **los temas** (o dejá «Todos») y **cuántas preguntas**: 5, 10 o 20.
- Cada pregunta tiene **4 opciones** y **un reloj**: 20 segundos (30 en las de código). Si querés jugar sin apuro, tildá **Modo tranquilo**.
- Podés responder con el mouse o con las teclas **1**, **2**, **3** y **4**. Con **Enter** pasás a la siguiente.
- **Puntos:** 100 por cada acierto. Más hasta 50 de bonus por responder rápido. Más 20 por cada acierto seguido que llevás (la **racha**): +20 en el segundo, +40 en el tercero, y así hasta un máximo de +100.
- Si te equivocás, la racha vuelve a cero. Pero siempre te explica **por qué**.
- **50 / 50:** una vez por partida, descarta dos opciones incorrectas.
- Al final ves tu **nivel**, cómo te fue en cada tema y las preguntas que fallaste. Con **Repasar las que fallé** volvés a jugar solo esas.
- Tu récord se guarda en tu navegador.

## Probá esto

1. **Jugá una partida de 10 preguntas con todos los temas.** ¿Qué nivel sacaste?
2. **Jugá solo «¿Qué muestra?»** y tratá de adivinar la respuesta *antes* de mirar las opciones. Si dudás, abrí la consola con **F12** y pegá el código para comprobarlo.
3. **Repasá las que fallaste.** ¿Las pudiste responder todas la segunda vez?
4. **Jugá solo «Git y GitHub»** y tratá de explicarle en voz alta a un compañero qué es un commit y qué es un Pull Request.
5. **Desafío entre compañeros:** jueguen la misma cantidad de preguntas. Gana quien llegue a más puntos.

## Tu primer Pull Request: agregá preguntas

Esta es la mejor parte: **las preguntas las escribís vos**, y subirlas es practicar justo lo que el juego pregunta.

1. Abrí el archivo `juego-preguntas/preguntas.js`. Arriba tiene las instrucciones.
2. Copiá una pregunta de ejemplo, pegala al final de su categoría y cambiala:

```js
{
  categoria: 'js',
  texto: '¿Qué hace `console.log("hola")`?',
  opciones: [
    'Muestra «hola» en la consola',     // la PRIMERA siempre es la correcta
    'Muestra una ventanita',
    'Guarda «hola» en un archivo',
    'Borra la consola',
  ],
  explicacion: 'Una frase corta que le explique a quien se equivoque por qué.',
},
```

3. Guardá y recargá el juego. Tu pregunta ya puede salir.
4. Creá una **rama**, hacé un **commit** y subí tus cambios con un **push**:

```bash
git switch -c mis-preguntas
git add .
git commit -m "feat: agrega preguntas nuevas al quiz"
git push -u origin mis-preguntas
```

5. En GitHub apretá **Compare & pull request**, escribí qué agregaste y creá el **Pull Request**.
6. Pedile a un compañero que lo revise y lo **mergee**. Después hagan `git pull` y juéguenlo.

Reglas para una buena pregunta: que tenga **una sola** respuesta correcta, que las otras tres sean creíbles y que la explicación enseñe algo.

## Cambios chiquitos (opcionales)

1. **Más tiempo por pregunta.** En `app.js` buscá `SEGUNDOS_POR_PREGUNTA = 20` y poné `30`.
2. **Más puntos por racha.** Buscá `PUNTOS_POR_RACHA = 20` y poné `50`. ¿Cambia la manera de jugar?
3. **Otro nombre para los niveles.** Buscá `const niveles` y poné los tuyos.
4. **Otros colores.** Buscá `const temas` y cambiá el `color` de uno.
5. **Otra cantidad de preguntas.** En `index.html` buscá `data-cantidad="20"` y cambiá el `20` por `30`, y también el número que dice el botón. Ahora podés jugar una partida de 30.

## Cómo funciona (para los que tienen curiosidad)

- `preguntas.js` es una lista (un **array**) de preguntas. Cada una es un **objeto** con `categoria`, `texto`, `opciones` y `explicacion`.
- Para que la respuesta correcta no caiga siempre en la misma letra, el juego **mezcla** las opciones cada vez. Por eso en el archivo la correcta va siempre primera.
- El reloj usa `requestAnimationFrame`, que le pide al navegador que ejecute una función antes de dibujar cada cuadro, unas 60 veces por segundo.
- El récord se guarda en `localStorage`: un cajón de tu navegador donde una página puede dejar datos pequeños.
- El resto del cerebro está en `app.js`: `mostrarPregunta`, `responder`, `siguiente` y `terminar`.

## Si algo sale mal

- **El título se ve con otra tipografía:** revisá que tengas internet.
- **No se puede apretar «Jugar»:** elegí al menos un tema.
- **Agregué una pregunta y no aparece:** revisá que haya una **coma** después de la llave `}` de la pregunta anterior y que el bloque esté **dentro** de la lista `[ ]`. Con **F12** y la pestaña **Consola** ves el error en rojo.
- **Salen solo preguntas conocidas:** en cada partida se eligen al azar entre las disponibles. Si elegís un solo tema chico, se repiten más.
- **Para ver el error real:** apretá **F12** y mirá la pestaña **Consola**. Si hay algo en rojo, pegáselo a ChatGPT o Gemini y pedile *«explicame este error para alguien que recién empieza»*.

## Una pregunta para pensar

Escribir una buena pregunta es más difícil que responderla. ¿Qué tema de los que viste todavía no te animarías a explicarle a alguien? Ese es el que más te conviene repasar.
