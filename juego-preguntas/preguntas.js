// Cómo agregar una pregunta nueva:
//   1. Copiá un bloque { ... } de los de abajo y pegalo al final de su categoría.
//   2. En "opciones" escribí PRIMERO la respuesta correcta. El juego las mezcla solo.
//   3. Escribí una "explicacion" corta: es lo que aprende quien se equivoca.
// Las categorías posibles son: git, html, css, js, codigo, datos y seguridad.
// Para "codigo" ponele el código en "codigo" y como respuesta correcta lo que muestra en la consola.

const preguntas = [
  // ---------- Git y GitHub ----------
  {
    categoria: 'git',
    texto: '¿Qué es un `commit`?',
    opciones: [
      'Un guardado de tu proyecto al que podés volver cuando quieras',
      'Subir tus cambios a la nube',
      'Traer los cambios de la nube a tu compu',
      'Un pedido para que otra persona acepte tus cambios',
    ],
    explicacion: 'Un commit es como una foto del proyecto en un momento. Todos los commits juntos forman el historial, y podés volver a cualquiera.',
  },
  {
    categoria: 'git',
    texto: '¿Qué hace `git fetch`?',
    opciones: [
      'Descarga los cambios de la nube a tu compu, sin mezclarlos todavía con tu código',
      'Sube tus cambios a la nube',
      'Une los cambios de otra persona con tu código',
      'Guarda tus cambios en el historial',
    ],
    explicacion: 'fetch solo descarga lo nuevo para que lo puedas mirar. Para unirlo con tu código hace falta un merge, o directamente un `git pull`, que hace las dos cosas.',
  },
  {
    categoria: 'git',
    texto: '¿Qué hace `git push`?',
    opciones: [
      'Sube tus commits a la nube (GitHub)',
      'Trae los cambios de la nube a tu compu',
      'Crea una rama nueva',
      'Borra el último commit',
    ],
    explicacion: 'push empuja tus commits desde tu compu hacia GitHub, así los ve el resto del equipo.',
  },
  {
    categoria: 'git',
    texto: '¿Qué hace `git pull`?',
    opciones: [
      'Trae los cambios de la nube y los une con tu código',
      'Sube tus cambios a la nube',
      'Guarda tus cambios en un commit',
      'Borra los cambios que hiciste',
    ],
    explicacion: 'git pull es un `git fetch` (descargar) más un merge (unir), todo en un solo comando.',
  },
  {
    categoria: 'git',
    texto: '¿Qué es un Pull Request (PR)?',
    opciones: [
      'Un pedido para sumar tus cambios al proyecto, para que otra persona los revise y los acepte',
      'Un comando para descargar el proyecto',
      'Una copia de seguridad del proyecto en tu compu',
      'Un botón para borrar el repositorio',
    ],
    explicacion: 'En un PR le decís al dueño del proyecto: «hice estos cambios, ¿los querés sumar?». Se revisan antes de aceptarlos.',
  },
  {
    categoria: 'git',
    texto: '¿Qué es un `merge`?',
    opciones: [
      'Unir los cambios de una rama con otra',
      'Borrar una rama',
      'Descargar un proyecto de GitHub',
      'Deshacer el último commit',
    ],
    explicacion: 'Cuando se acepta un PR, GitHub hace un merge: junta los cambios de la rama del PR con la rama principal.',
  },
  {
    categoria: 'git',
    texto: '¿Qué hace `git clone`?',
    opciones: [
      'Descarga una copia completa de un repositorio a tu compu',
      'Crea una rama nueva',
      'Duplica un archivo',
      'Une dos ramas',
    ],
    explicacion: 'clone se usa una sola vez al principio: te baja el proyecto entero, con todo su historial.',
  },
  {
    categoria: 'git',
    texto: '¿Qué es una rama (`branch`)?',
    opciones: [
      'Una línea de trabajo paralela, para probar cambios sin tocar el código principal',
      'Un archivo con las contraseñas del proyecto',
      'Una copia del proyecto en otra compu',
      'Un comentario dentro del código',
    ],
    explicacion: 'Trabajás en tu rama sin romper nada. Cuando está lista, la unís con la principal a través de un Pull Request.',
  },
  {
    categoria: 'git',
    texto: '¿Qué es un repositorio?',
    opciones: [
      'La carpeta de un proyecto junto con todo el historial de sus cambios',
      'Un programa para editar fotos',
      'Una lista de contraseñas',
      'Un tipo de rama',
    ],
    explicacion: 'GitHub guarda repositorios. Cada proyecto tiene el suyo.',
  },
  {
    categoria: 'git',
    texto: '¿Qué botón apretás en GitHub para aceptar un Pull Request?',
    opciones: ['Merge pull request', 'Delete branch', 'Fork', 'Star'],
    explicacion: '«Merge pull request» une los cambios del PR con el proyecto. Después hay que confirmar.',
  },
  {
    categoria: 'git',
    texto: '¿Para qué sirve `git add .`?',
    opciones: [
      'Para preparar todos los cambios, así entran en el próximo commit',
      'Para subir los cambios a la nube',
      'Para crear un repositorio nuevo',
      'Para traer cambios de la nube',
    ],
    explicacion: 'Primero se hace `git add` (elegir qué se guarda), después `git commit` (guardarlo con un mensaje).',
  },
  {
    categoria: 'git',
    texto: 'Hiciste un commit pero todavía no hiciste `git push`. ¿Qué pasa con tus cambios?',
    opciones: [
      'Están guardados en tu compu, pero todavía no están en GitHub',
      'Se suben solos a la nube después de un rato',
      'Se borran',
      'Ya se unieron al proyecto principal',
    ],
    explicacion: 'El commit guarda en tu compu. Hasta que no hagas push, nadie más puede ver esos cambios.',
  },

  // ---------- HTML ----------
  {
    categoria: 'html',
    texto: '¿Para qué sirve HTML?',
    opciones: [
      'Para armar la estructura y el contenido de la página: títulos, textos, botones, imágenes',
      'Para darle colores y tamaños a la página',
      'Para tomar decisiones y hacer cuentas',
      'Para guardar datos en una base de datos',
    ],
    explicacion: 'HTML es el esqueleto. CSS es la ropa (el estilo) y JavaScript es el cerebro (la lógica).',
  },
  {
    categoria: 'html',
    texto: '¿Qué etiqueta crea un botón?',
    opciones: ['`<button>`', '`<boton>`', '`<click>`', '`<press>`'],
    explicacion: 'En HTML las etiquetas están en inglés: `<button>Apretame</button>`.',
  },
  {
    categoria: 'html',
    texto: '¿Qué etiqueta es la del título más importante de la página?',
    opciones: ['`<h1>`', '`<head>`', '`<top>`', '`<big>`'],
    explicacion: 'Los títulos van de `<h1>` (el principal) a `<h6>` (el menos importante).',
  },
  {
    categoria: 'html',
    texto: '¿Qué atributo le dice a una imagen qué archivo mostrar?',
    opciones: ['`src`', '`href`', '`link`', '`file`'],
    explicacion: '`<img src="gato.png">`. El `href` es el de los links.',
  },
  {
    categoria: 'html',
    texto: '¿Cómo se crea un link a otra página?',
    opciones: [
      '`<a href="https://...">Texto</a>`',
      '`<link src="https://...">Texto</link>`',
      '`<url>https://...</url>`',
      '`<go to="https://...">Texto</go>`',
    ],
    explicacion: 'La etiqueta es `<a>` (de «anchor», ancla) y la dirección va en `href`.',
  },
  {
    categoria: 'html',
    texto: '¿Qué crea `<input type="text">`?',
    opciones: [
      'Un cuadro donde se puede escribir texto',
      'Un botón que dice «text»',
      'Una imagen',
      'Un título',
    ],
    explicacion: 'Los `<input>` son los campos de los formularios. Con otro `type` cambia lo que se puede cargar: número, fecha, contraseña...',
  },
  {
    categoria: 'html',
    texto: '¿En qué se diferencia un `id` de una `class`?',
    opciones: [
      'El id es único en la página y la class se puede repetir en muchos elementos',
      'El id es para botones y la class para imágenes',
      'El id es de CSS y la class es de HTML',
      'No hay ninguna diferencia',
    ],
    explicacion: 'Si necesitás darle estilo a muchos elementos a la vez, usás una class. El id es para uno solo.',
  },
  {
    categoria: 'html',
    texto: '¿Cómo se arma una lista con viñetas?',
    opciones: [
      'Con `<ul>` y un `<li>` por cada elemento',
      'Con `<list>` y un `<item>` por cada elemento',
      'Con `<p>` y un `<br>` en cada línea',
      'Con `<bullet>` y nada más',
    ],
    explicacion: '`<ul>` es la lista y cada `<li>` es un elemento. Con `<ol>` la lista sale numerada.',
  },
  {
    categoria: 'html',
    texto: '¿Qué va dentro de `<body>`?',
    opciones: [
      'Todo lo que se ve en la página',
      'Solo el título de la pestaña del navegador',
      'Solo los colores',
      'Solo el historial de Git',
    ],
    explicacion: 'El `<head>` tiene información sobre la página (como el título de la pestaña) y el `<body>` tiene el contenido visible.',
  },

  // ---------- CSS ----------
  {
    categoria: 'css',
    texto: '¿Para qué sirve CSS?',
    opciones: [
      'Para darle estilo a la página: colores, tamaños y posiciones',
      'Para crear los botones y los textos',
      'Para guardar el código en la nube',
      'Para hacer cuentas y tomar decisiones',
    ],
    explicacion: 'CSS decide cómo se ve todo lo que armó el HTML.',
  },
  {
    categoria: 'css',
    texto: '¿Cómo ponés el texto de color rojo en CSS?',
    opciones: ['`color: red;`', '`text-color: red;`', '`font-color: red;`', '`red: text;`'],
    explicacion: 'La propiedad se llama simplemente `color`.',
  },
  {
    categoria: 'css',
    texto: '¿Qué propiedad cambia el color de fondo?',
    opciones: ['`background-color`', '`color-fondo`', '`bg-text`', '`fondo`'],
    explicacion: 'Las propiedades de CSS van en inglés: `background-color: #ffcb05;`.',
  },
  {
    categoria: 'css',
    texto: '¿Cómo escribís el selector de CSS para los elementos con `class="boton"`?',
    opciones: ['`.boton { }`', '`#boton { }`', '`boton.class { }`', '`*boton { }`'],
    explicacion: 'Punto para las clases (`.boton`) y numeral para los ids (`#boton`).',
  },
  {
    categoria: 'css',
    texto: '¿Qué hace `display: flex;`?',
    opciones: [
      'Permite acomodar los elementos de adentro en fila o en columna fácilmente',
      'Esconde el elemento',
      'Hace que el elemento parpadee',
      'Agranda la letra',
    ],
    explicacion: 'Flexbox es la herramienta más usada para acomodar cosas: centrar, repartir espacio, poner en fila...',
  },
  {
    categoria: 'css',
    texto: '¿Qué diferencia hay entre `margin` y `padding`?',
    opciones: [
      '`margin` es el espacio de afuera del elemento y `padding` el de adentro',
      '`margin` es para colores y `padding` para tamaños',
      '`margin` es de HTML y `padding` es de JavaScript',
      'Son exactamente lo mismo',
    ],
    explicacion: 'El `padding` separa el contenido del borde. El `margin` separa el elemento de sus vecinos.',
  },
  {
    categoria: 'css',
    texto: '¿Qué hace `font-size: 20px;`?',
    opciones: [
      'Cambia el tamaño de la letra',
      'Cambia el tipo de letra',
      'Cambia el color de la letra',
      'Pone la letra en negrita',
    ],
    explicacion: '`font-size` es el tamaño. El tipo de letra se cambia con `font-family` y la negrita con `font-weight`.',
  },
  {
    categoria: 'css',
    texto: '¿Cuándo se aplica un estilo que usa `:hover`?',
    opciones: [
      'Cuando pasás el mouse por encima del elemento',
      'Cuando la página termina de cargar',
      'Cuando hacés clic derecho',
      'Cuando se apaga la pantalla',
    ],
    explicacion: 'Por ejemplo `.boton:hover { background: red; }` cambia el color solo mientras tenés el mouse encima.',
  },
  {
    categoria: 'css',
    texto: '¿Para qué sirve `@media (max-width: 600px)`?',
    opciones: [
      'Para dar estilos que solo se aplican en pantallas chicas, como las de un celular',
      'Para reproducir videos',
      'Para poner la página en pantalla completa',
      'Para limitar la cantidad de letras',
    ],
    explicacion: 'Con las «media queries» una misma página se adapta a la compu y al celular.',
  },
  {
    categoria: 'css',
    texto: '¿Qué hace `border-radius`?',
    opciones: [
      'Redondea las esquinas del elemento',
      'Cambia el grosor del borde',
      'Gira el elemento',
      'Pone un borde rojo',
    ],
    explicacion: 'Con `border-radius: 50%` un cuadrado se convierte en un círculo.',
  },

  // ---------- JavaScript ----------
  {
    categoria: 'js',
    texto: '¿Para qué sirve `let`?',
    opciones: [
      'Para crear una variable: una cajita con nombre donde guardás un dato',
      'Para repetir código',
      'Para tomar una decisión',
      'Para mostrar un mensaje',
    ],
    explicacion: '`let edad = 17;` crea la variable `edad` con el valor 17. Después se la puede cambiar.',
  },
  {
    categoria: 'js',
    texto: '¿Qué significa `===` en JavaScript?',
    opciones: [
      'Comparar si dos valores son iguales (y del mismo tipo)',
      'Guardar un valor en una variable',
      'Sumar dos números',
      'Comparar si uno es mayor que otro',
    ],
    explicacion: 'Un solo `=` guarda un valor. Tres `===` comparan.',
  },
  {
    categoria: 'js',
    texto: '¿Qué significa `&&`?',
    opciones: [
      '«Y»: es verdadero solo si las dos condiciones son verdaderas',
      '«O»: es verdadero si al menos una condición es verdadera',
      '«No»: invierte el valor',
      'Suma dos textos',
    ],
    explicacion: '`edad > 12 && edad < 20` es verdadero solo si se cumplen las dos cosas a la vez.',
  },
  {
    categoria: 'js',
    texto: '¿Qué significa `||`?',
    opciones: [
      '«O»: es verdadero si al menos una condición es verdadera',
      '«Y»: es verdadero solo si las dos condiciones son verdaderas',
      '«No»: invierte el valor',
      'Divide dos números',
    ],
    explicacion: '`dia === "sábado" || dia === "domingo"` alcanza con que sea una de las dos.',
  },
  {
    categoria: 'js',
    texto: '¿Para qué sirve `if`?',
    opciones: [
      'Para ejecutar código solo si una condición es verdadera',
      'Para repetir código muchas veces',
      'Para crear una variable',
      'Para esperar una respuesta',
    ],
    explicacion: '`if` significa «si». Es la forma de tomar decisiones en un programa.',
  },
  {
    categoria: 'js',
    texto: '¿Cuándo se ejecuta lo que está dentro de `else`?',
    opciones: [
      'Cuando la condición del `if` es falsa',
      'Siempre, junto con el `if`',
      'Nunca',
      'Cuando la condición del `if` es verdadera',
    ],
    explicacion: '`else` significa «si no»: es el camino alternativo.',
  },
  {
    categoria: 'js',
    texto: '¿Para qué sirve un `for`?',
    opciones: [
      'Para repetir un bloque de código varias veces',
      'Para tomar una decisión',
      'Para comparar dos valores',
      'Para crear una función',
    ],
    explicacion: 'Los bucles evitan tener que escribir lo mismo 100 veces.',
  },
  {
    categoria: 'js',
    texto: '¿Qué hace `console.log("hola")`?',
    opciones: [
      'Muestra «hola» en la consola del navegador (F12)',
      'Muestra una ventanita en la pantalla',
      'Guarda «hola» en un archivo',
      'Borra la consola',
    ],
    explicacion: 'La ventanita es `alert`. `console.log` escribe en la consola, que es la herramienta de quienes programan.',
  },
  {
    categoria: 'js',
    texto: '¿Qué es un array?',
    opciones: [
      'Una lista de valores, como `[1, 2, 3]`',
      'Un tipo de bucle',
      'Un error de código',
      'Un botón especial',
    ],
    explicacion: 'Los arrays guardan muchos datos juntos. Cada uno tiene una posición, que empieza a contarse desde 0.',
  },
  {
    categoria: 'js',
    texto: '¿Qué hace `boton.addEventListener("click", ...)`?',
    opciones: [
      'Le dice al navegador qué hacer cuando alguien hace clic en el botón',
      'Crea un botón nuevo',
      'Cambia el color del botón',
      'Borra el botón',
    ],
    explicacion: 'Un «listener» es un oyente: queda escuchando hasta que pasa el evento.',
  },
  {
    categoria: 'js',
    texto: '¿Qué hace el operador `!`?',
    opciones: [
      'Invierte un valor: `!true` es `false`',
      'Multiplica por cero',
      'Comenta una línea',
      'Termina el programa',
    ],
    explicacion: '`!` significa «no». Es muy útil en condiciones como `if (!llueve)`.',
  },
  {
    categoria: 'js',
    texto: '¿Qué es una función?',
    opciones: [
      'Un bloque de código con nombre que podés usar cuando quieras',
      'Un tipo de variable',
      'Un comentario',
      'Un archivo HTML',
    ],
    explicacion: 'En vez de repetir el código, lo guardás en una función y la llamás por su nombre.',
  },

  // ---------- ¿Qué muestra este código? ----------
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "if (2 < 2) {\n  console.log('hola');\n} else {\n  console.log('chau');\n}",
    opciones: ['chau', 'hola', 'hola chau', 'No muestra nada'],
    explicacion: '`2 < 2` es falso (el 2 no es menor que sí mismo), así que se ejecuta el `else`.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "let x = 5;\nif (x > 3 && x < 10) {\n  console.log('adentro');\n} else {\n  console.log('afuera');\n}",
    opciones: ['adentro', 'afuera', 'adentro afuera', 'Da error'],
    explicacion: '5 es mayor que 3 y también menor que 10. Con `&&` se cumplen las dos, entonces entra al `if`.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: 'console.log(true && false);',
    opciones: ['false', 'true', 'undefined', 'Da error'],
    explicacion: 'Con `&&` hace falta que las dos sean verdaderas. Una es falsa, así que el resultado es `false`.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: 'console.log(false || true);',
    opciones: ['true', 'false', 'undefined', 'Da error'],
    explicacion: 'Con `||` alcanza con que una sea verdadera.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código? (cada número en su línea)',
    codigo: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}',
    opciones: ['0 1 2', '1 2 3', '0 1 2 3', '3'],
    explicacion: '`i` arranca en 0 y el bucle se repite mientras `i < 3`: pasa por 0, 1 y 2.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: 'let a = 2;\na = a + 3;\nconsole.log(a);',
    opciones: ['5', '2', '3', '23'],
    explicacion: 'A `a` le guardamos lo que ya tenía (2) más 3. Entonces ahora vale 5.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "console.log('2' + 3);",
    opciones: ['23', '5', '2 + 3', 'NaN'],
    explicacion: 'Con un texto, el `+` no suma: pega. `\'2\'` es un texto, entonces el resultado es el texto `23`.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "const lista = ['a', 'b', 'c'];\nconsole.log(lista[1]);",
    opciones: ['b', 'a', 'c', '1'],
    explicacion: 'Las posiciones de un array se cuentan desde 0: `lista[0]` es `a`, `lista[1]` es `b`.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "let edad = 17;\nif (edad >= 18) {\n  console.log('mayor');\n} else if (edad >= 13) {\n  console.log('adolescente');\n} else {\n  console.log('niño');\n}",
    opciones: ['adolescente', 'mayor', 'niño', 'Da error'],
    explicacion: '17 no es mayor o igual que 18, pero sí es mayor o igual que 13. Entra al `else if`.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: 'let n = 0;\nfor (let i = 1; i <= 4; i++) {\n  n = n + i;\n}\nconsole.log(n);',
    opciones: ['10', '4', '24', '15'],
    explicacion: 'El bucle suma 1 + 2 + 3 + 4. En cada vuelta `n` va acumulando: 1, 3, 6 y finalmente 10.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "console.log(5 === '5');",
    opciones: ['false', 'true', '5', 'Da error'],
    explicacion: 'El número 5 y el texto `\'5\'` tienen el mismo valor pero no el mismo tipo. `===` compara también el tipo.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "let llueve = false;\nif (!llueve) {\n  console.log('salgo');\n} else {\n  console.log('me quedo');\n}",
    opciones: ['salgo', 'me quedo', 'salgo me quedo', 'Da error'],
    explicacion: '`llueve` es falso y `!` lo invierte a verdadero, entonces entra al `if`.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "let nombre = 'Ana';\nconsole.log('Hola ' + nombre);",
    opciones: ['Hola Ana', 'Hola nombre', 'Ana Hola', 'Hola + Ana'],
    explicacion: '`nombre` es una variable: se reemplaza por lo que guarda (`Ana`) y el `+` pega los dos textos.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: 'console.log([10, 20, 30].length);',
    opciones: ['3', '30', '2', '60'],
    explicacion: '`length` es la cantidad de elementos de la lista. Hay tres.',
  },
  {
    categoria: 'codigo',
    texto: '¿Qué muestra este código?',
    codigo: "let dia = 'sábado';\nif (dia === 'sábado' || dia === 'domingo') {\n  console.log('finde');\n} else {\n  console.log('semana');\n}",
    opciones: ['finde', 'semana', 'finde semana', 'Da error'],
    explicacion: 'Con `||` alcanza con que se cumpla una de las dos condiciones, y `dia` es `sábado`.',
  },

  // ---------- APIs y bases de datos ----------
  {
    categoria: 'datos',
    texto: '¿Qué es una API?',
    opciones: [
      'Una puerta que un programa ofrece para que otros le pidan datos',
      'Un lenguaje de programación nuevo',
      'Un tipo de computadora muy rápida',
      'Un programa para diseñar páginas',
    ],
    explicacion: 'PokéAPI es una API: le pedís un número y te devuelve los datos de ese Pokémon.',
  },
  {
    categoria: 'datos',
    texto: 'En JavaScript, ¿para qué sirve `fetch("https://...")`?',
    opciones: [
      'Para pedirle datos a una dirección de internet, como una API',
      'Para traer cambios de GitHub a tu compu',
      'Para crear una variable',
      'Para guardar datos en una base de datos',
    ],
    explicacion: 'No te confundas: `git fetch` (de Git) descarga cambios del repositorio, y `fetch()` (de JavaScript) le pide datos a una dirección de internet. Se llaman igual pero hacen cosas distintas.',
  },
  {
    categoria: 'datos',
    texto: '¿Qué es JSON?',
    opciones: [
      'Un formato de texto para intercambiar datos, como `{ "name": "pikachu" }`',
      'Un lenguaje para dar estilos',
      'Un tipo de base de datos',
      'Una librería de imágenes',
    ],
    explicacion: 'Casi todas las APIs devuelven JSON porque es fácil de leer para las personas y para los programas.',
  },
  {
    categoria: 'datos',
    texto: '¿Qué hace `await` delante de un `fetch`?',
    opciones: [
      'Espera a que llegue la respuesta antes de seguir con la línea siguiente',
      'Cancela el pedido',
      'Repite el pedido tres veces',
      'Borra la respuesta',
    ],
    explicacion: 'Pedir datos a internet tarda. `await` hace que el programa espere el resultado en vez de seguir sin él.',
  },
  {
    categoria: 'datos',
    texto: 'En una base de datos, ¿qué es una tabla?',
    opciones: [
      'Algo parecido a una hoja de Excel: columnas (los datos) y filas (los registros)',
      'Una lista de contraseñas',
      'Un archivo de imágenes',
      'Un tipo de gráfico',
    ],
    explicacion: 'En nuestra tabla `pokemon_guardados` cada fila era un Pokémon, con tres columnas: id, número y nombre.',
  },
  {
    categoria: 'datos',
    texto: '¿Qué significan las letras de CRUD?',
    opciones: [
      'Create, Read, Update, Delete (Crear, Leer, Editar, Borrar)',
      'Copiar, Recortar, Unir, Duplicar',
      'Conectar, Reiniciar, Usar, Descargar',
      'Código, Revisión, Usuario, Datos',
    ],
    explicacion: 'Casi todo lo que se hace con datos es una de esas cuatro cosas.',
  },
  {
    categoria: 'datos',
    texto: '¿Qué comando de SQL agrega una fila nueva a una tabla?',
    opciones: ['`INSERT`', '`SELECT`', '`UPDATE`', '`DELETE`'],
    explicacion: '`INSERT` es la C de CRUD: crear.',
  },
  {
    categoria: 'datos',
    texto: '¿Qué comando de SQL sirve para leer datos de una tabla?',
    opciones: ['`SELECT`', '`INSERT`', '`DELETE`', '`DROP`'],
    explicacion: '`SELECT` es la R de CRUD: leer. No cambia nada, solo mira.',
  },
  {
    categoria: 'datos',
    texto: '¿Qué pasa si ejecutás `DELETE FROM pokemon_guardados;` sin `WHERE`?',
    opciones: [
      'Se borran todas las filas de la tabla',
      'No se borra nada',
      'Se borra solo la primera fila',
      'Siempre da un error',
    ],
    explicacion: 'Sin `WHERE`, SQL no sabe cuál fila elegir y las borra todas. Por eso hay que tener muchísimo cuidado.',
  },
  {
    categoria: 'datos',
    texto: '¿Para qué sirve `WHERE id = 4`?',
    opciones: [
      'Para elegir sobre cuál fila actuar: la que tiene id 4',
      'Para ordenar los resultados',
      'Para crear una tabla',
      'Para sumar 4 a todos los datos',
    ],
    explicacion: 'El `WHERE` filtra. Se usa con `SELECT`, `UPDATE` y `DELETE`.',
  },

  // ---------- Seguridad ----------
  {
    categoria: 'seguridad',
    texto: '¿Cuál de estas contraseñas es la más fuerte?',
    opciones: ['caballo bateria grapa correcta', 'Pikachu2024', 'P@ssw0rd!', '12345678'],
    explicacion: 'Gana la larga. Las otras tres están en cualquier diccionario de ataque, aunque tengan mayúsculas, números o símbolos.',
  },
  {
    categoria: 'seguridad',
    texto: '¿Cómo funciona un ataque por diccionario?',
    opciones: [
      'Prueba contraseñas muy comunes y sus variantes, una por una',
      'Prueba absolutamente todas las combinaciones posibles',
      'Le pregunta la contraseña a la persona',
      'Rompe la computadora para entrar',
    ],
    explicacion: 'Es rapidísimo, y por eso una palabra conocida con un número atrás no es una buena contraseña.',
  },
  {
    categoria: 'seguridad',
    texto: '¿Cómo funciona un ataque de fuerza bruta?',
    opciones: [
      'Prueba todas las combinaciones posibles, una por una',
      'Solo prueba palabras del diccionario',
      'Le manda un mail falso a la persona',
      'Borra la contraseña del sistema',
    ],
    explicacion: 'Siempre termina encontrando la contraseña. La pregunta es cuánto tarda: con una contraseña corta, segundos; con una larga, más años que el universo.',
  },
  {
    categoria: 'seguridad',
    texto: '¿Qué hace más difícil descubrir una contraseña por fuerza bruta?',
    opciones: [
      'Que sea más larga: cada carácter extra multiplica la cantidad de combinaciones',
      'Que empiece con mayúscula',
      'Que tenga tu nombre',
      'Que termine en 1',
    ],
    explicacion: 'Cada carácter nuevo multiplica el trabajo del atacante por la cantidad de letras posibles.',
  },
  {
    categoria: 'seguridad',
    texto: '¿Qué es la verificación en dos pasos (2FA)?',
    opciones: [
      'Pedir un segundo paso además de la contraseña, como un código en tu celular',
      'Escribir la contraseña dos veces',
      'Tener dos contraseñas iguales',
      'Cambiar la contraseña todos los días',
    ],
    explicacion: 'Aunque alguien consiga tu contraseña, sin ese segundo paso no puede entrar.',
  },
  {
    categoria: 'seguridad',
    texto: '¿Por qué es mala idea usar la misma contraseña en todos los sitios?',
    opciones: [
      'Si se filtra en uno solo, pueden entrar a todas tus cuentas',
      'Porque los sitios no permiten repetirlas',
      'Porque la contraseña se gasta con el uso',
      'No es mala idea: es más fácil de recordar',
    ],
    explicacion: 'Los datos filtrados de un sitio se prueban automáticamente en todos los demás. Un administrador de contraseñas te evita tener que acordarte.',
  },
  {
    categoria: 'seguridad',
    texto: '¿Qué es el phishing?',
    opciones: [
      'Un engaño con un mensaje o una página falsa para que entregues tu contraseña',
      'Un virus que rompe la compu',
      'Una contraseña muy fuerte',
      'Una forma de guardar contraseñas',
    ],
    explicacion: 'Se parece a un mensaje de tu banco o de tu juego favorito, pero es de un estafador. Ningún sitio serio te pide la contraseña por mensaje.',
  },
  {
    categoria: 'seguridad',
    texto: '¿Cuál es el problema de `pikachu123` como contraseña?',
    opciones: [
      'Es una palabra conocida con un número atrás: está en cualquier diccionario de ataque',
      'Es demasiado larga',
      'Tiene demasiados símbolos raros',
      'Ninguno, es excelente',
    ],
    explicacion: 'En el laboratorio de contraseñas se encontraba en pocos segundos.',
  },
];
