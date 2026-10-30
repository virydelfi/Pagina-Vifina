# Actividad: tu PC Pokémon con una base de datos

## Qué vamos a hacer

Una página donde **buscás un Pokémon, le ponés un nombre y lo guardás**: un Pikachu llamado Roberto, otro Pikachu llamado Mario, un Jigglypuff llamado Rosita.

Lo especial: cada vez que tocás un botón, la página **te muestra la consulta SQL que se ejecuta** y te explica qué está haciendo, en palabras simples.

Los Pokémon se guardan en una **base de datos SQLite de verdad** que vive dentro de tu navegador. Si cerrás la pestaña y volvés, siguen ahí.

**No tenés que escribir ni copiar nada.** Alcanza con mergear este Pull Request y abrir la página.

## Qué es una base de datos

Una base de datos es como una planilla de Excel muy rápida y muy ordenada:

- Cada **tabla** es una hoja. La nuestra se llama `pokemon_guardados`.
- Cada **columna** es un dato. Nosotros guardamos tres: `id`, `pokemon_number` y `pokemon_name`.
- Cada **fila** es un Pokémon.

Para hablarle a la base de datos se usa un idioma que se llama **SQL**. Y casi todo lo que se hace con datos entra en cuatro operaciones, que se llaman **CRUD**:

| Letra | Qué hace | Palabra de SQL | En esta página |
| --- | --- | --- | --- |
| **C** | Crear | `INSERT` | Guardar un Pokémon con nombre |
| **R** | Leer | `SELECT` | Ver tu lista y buscar por nombre |
| **U** | Editar | `UPDATE` | Cambiarle el nombre a uno |
| **D** | Borrar | `DELETE` | Liberar un Pokémon |

Arriba a la derecha de la página están las cuatro letras: **se prende la que estás usando**.

## Paso a paso

1. Entrá al Pull Request en GitHub y apretá **Merge pull request** y después **Confirm merge**.
2. En la terminal, dentro de la carpeta del proyecto, escribí `git pull`.
3. En VS Code, abrí la carpeta `equipo-pokemon`, hacé clic derecho sobre `index.html` y elegí **Open with Live Server**.

Necesitás internet: la base de datos, los Pokémon y las imágenes se cargan de afuera.

## Probá esto

Hacelas en este orden. Después de cada una, **mirá el panel «Lo que pasa por dentro»**.

1. **Mirá lo que ya hay.** Al abrir, la página creó la tabla y guardó 3 Pokémon de ejemplo. Leé la explicación del panel y la tabla de abajo («La tabla por dentro»): son los mismos 3.
2. **Crear (C).** Buscá `25`, ponele de nombre el tuyo y apretá **Guardar**. Mirá el `INSERT` en el panel y cómo aparece una fila nueva en la tabla.
3. **Crear otro igual.** Sin cambiar de Pokémon, ponele otro nombre y guardá. Tenés dos Pikachu. ¿Cómo sabe la base de datos cuál es cuál? (Pista: mirá la columna `id`).
4. **Leer (R).** Escribí `ro` en el cuadro «Buscar en mi PC». Mirá el `SELECT` con `WHERE ... LIKE`. ¿Qué hacen los `%`?
5. **Editar (U).** Apretá **Cambiar nombre** en uno de tus Pokémon. Mirá el `UPDATE`: ¿qué pasaría si no tuviera el `WHERE`?
6. **Borrar (D).** Apretá **Liberar** en uno. Mirá el `DELETE` y cómo desaparece la fila de la tabla.
7. **Los dos más peligrosos.** Apretá **Liberar a todos** (dos veces para confirmar). Fijate que el `DELETE` no tiene `WHERE` y borra **todo**. Después apretá **Cargar 3 de ejemplo** para recuperarlos.
8. **Probá que se guarda de verdad.** Cerrá la pestaña, abrila de nuevo y mirá que tus Pokémon siguen ahí.
9. **Llevate la base.** Apretá **Descargar .sqlite**. Es un archivo real. Podés abrirlo con un programa como [DB Browser for SQLite](https://sqlitebrowser.org/).

## Cambios chiquitos (opcionales)

Cada uno es cambiar **una cosa** y apretar **F5**. Si hay un Live Server abierto, se recarga solo.

1. **Otros Pokémon de ejemplo.** En `app.js` buscá `const ejemplos` y cambiá los números y los nombres. Para que se vean, apretá **Liberar a todos** y después **Cargar 3 de ejemplo**.
2. **Otro título.** En `index.html` buscá `MI PC POKÉMON` y poné tu nombre.
3. **Otro largo máximo del nombre.** En `index.html` buscá `maxlength="20"` y cambiá el 20.
4. **Un color para el botón Guardar.** En `estilos.css` buscá `.boton.principal` y cambiá `background: #ffffff;`.

## Cómo funciona (para los que tienen curiosidad)

- `index.html` es la estructura de la página: los cuadros, los botones y los formularios.
- `estilos.css` son los colores y las animaciones.
- `app.js` es el cerebro. Usa una librería llamada **sql.js**, que es SQLite (una base de datos muy usada, que tienen los celulares) traducida para que corra en el navegador.
- Después de cada cambio, `app.js` guarda una copia de la base en **IndexedDB**, un almacén que el navegador tiene para cada sitio. Así los datos sobreviven cuando cerrás la pestaña.
- Para ver eso con tus propios ojos: apretá **F12**, entrá a la pestaña **Application**, y buscá **IndexedDB** → `mi-pc-pokemon`.

Una cosa importante: cuando guardás un nombre, el programa **nunca pega tu texto adentro de la consulta**. Manda la consulta (con un `?` en el lugar del nombre) y el nombre por separado. Así, aunque alguien escriba comillas o cosas raras, no puede romper la base. Probalo: ponele a un Pokémon de nombre `D'Artagnan`.

## Si algo sale mal

- **Dice «No pude cargar SQLite»:** revisá que tengas internet y apretá **F5**.
- **Los Pokémon de ejemplo no aparecen o la página se ve rara:** borrá los datos del sitio: **F12** → **Application** → **Storage** → **Clear site data**, y apretá **F5**.
- **Se cierra la pestaña y no se guardan los Pokémon:** abrí la página con **Open with Live Server** y no con doble clic sobre el archivo. Si usás una ventana privada, el navegador borra todo al cerrarla.
- **Mis Pokémon no aparecen en otro navegador o en otra compu:** es normal. La base vive dentro de **ese** navegador. Usá **Descargar .sqlite** para llevarla.
- **No encuentra mi Pokémon:** probá un número del 1 al 1025, o un nombre **en inglés** (`jigglypuff`, no `rolycoly`).
- **Para ver el error real:** **F12** y pestaña **Consola**. Si hay algo en rojo, pegáselo a ChatGPT o Gemini y pedile *«explicame este error para alguien que recién empieza»*.

## Una pregunta para pensar

Casi todo lo que usás todos los días funciona con una base de datos: tu usuario de un juego, tus mensajes, tus likes, tu carrito de compras. ¿Qué datos creés que guarda Roblox o Instagram sobre vos? ¿En qué tablas y con qué columnas los guardarías?
