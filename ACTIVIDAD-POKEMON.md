# Actividad: armá tu Pokédex

## Qué vamos a hacer

Una página donde **escribís el número de un Pokémon** (o su nombre) y aparece **todo sobre él**: imagen, nombre, tipos, descripción, altura, peso, habilidades, estadísticas y sus evoluciones.

Qué tiene de especial:

- **Cambia de color** según el tipo del Pokémon: rojo anaranjado para Fuego, azul para Agua, amarillo para Eléctrico.
- La imagen **se mueve en 3D** cuando pasás el mouse.
- Tiene botones para ver la versión **Shiny** (los Pokémon de otro color) y para escuchar su **Grito**.
- Con las flechas **←** y **→** del teclado pasás de un Pokémon al otro.
- Mostrás una **familia evolutiva** y hacés clic en cada uno para saltar a él.

Los datos no están en nuestra página: los pide a **PokéAPI**, una base de datos gratis con más de mil Pokémon. A eso se le llama **API**: una puerta para que un programa pida datos a otro.

**No tenés que escribir ni copiar nada.** La página ya está hecha: alcanza con mergear este Pull Request y probarla.

Tiempo: 10 minutos para que ande, y el resto para jugar.

## Paso a paso

1. Entrá al Pull Request de la Pokédex en GitHub y apretá el botón verde **Merge pull request**, y después **Confirm merge**.
2. Bajá los cambios a tu compu: en la terminal, dentro de la carpeta del proyecto, escribí `git pull`.
3. Abrí la carpeta `pokemon` y hacé doble clic en `index.html`. Se abre en el navegador y tiene que aparecer **Pikachu**.

Listo. Necesitás internet: los datos, las imágenes y la tipografía vienen de afuera.

Si no podés mergear o usar `git pull`, también sirve copiar el código de la sección **El código completo** (de `<!DOCTYPE html>` a `</html>`), pegarlo en un archivo que se llame `index.html` y abrirlo con doble clic.

## Probá esto

- Escribí `1` y apretá **Buscar** (o la tecla **Enter**). Es Bulbasaur.
- Escribí un nombre en inglés: `charizard`, `mewtwo`, `eevee`, `gengar`.
- Apretá **Al azar** varias veces. ¿Cuántos Pokémon nuevos te salen?
- Pasá el mouse sobre la imagen y movelo.
- Apretá **Shiny** y **Grito**.
- Usá las flechas **←** y **→** del teclado.
- Buscá el `133` (Eevee) y hacé clic en cada una de sus evoluciones.
- Escribí `0` o `5000`. ¿Qué dice la página? ¿Por qué?
- Buscá el Pokémon con más **Ataque** que puedas encontrar. Compará con tus compañeros.
- Buscá un Pokémon **Legendario**: aparece una etiqueta blanca al lado del tipo.
- Mirá la dirección de la página: termina en `#25` o el número que estés viendo. Copiala y mandásela a alguien: va a ver el mismo Pokémon.

## El código completo (para leer, no hace falta copiarlo)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokédex</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bungee&family=Chakra+Petch:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      /* Con @property el color de fondo cambia suave cuando cambia el Pokémon */
      @property --acento {
        syntax: "<color>";
        inherits: true;
        initial-value: #6390f0;
      }

      * {
        box-sizing: border-box;
      }

      body {
        --acento: #6390f0;
        margin: 0;
        min-height: 100vh;
        overflow-x: hidden;
        font-family: "Chakra Petch", system-ui, sans-serif;
        color: #ffffff;
        background:
          radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--acento) 48%, transparent), transparent 55%),
          radial-gradient(circle at 90% 95%, color-mix(in srgb, var(--acento) 28%, transparent), transparent 50%),
          #07080d;
        background-attachment: fixed;
        transition: --acento 0.8s ease;
      }

      button,
      input {
        font: inherit;
        color: inherit;
      }

      :focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 3px;
      }

      /* ---------- Barra de arriba ---------- */
      .barra {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 24px;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: "Bungee", sans-serif;
        font-size: 1.5rem;
        letter-spacing: 2px;
      }

      .pokebola {
        width: 28px;
        height: 28px;
        border: 3px solid #ffffff;
        border-radius: 50%;
        background: linear-gradient(#ee1515 0 46%, #ffffff 46% 54%, #ffffff 54%);
        position: relative;
      }

      .pokebola::after {
        content: "";
        position: absolute;
        inset: 50% auto auto 50%;
        width: 8px;
        height: 8px;
        translate: -50% -50%;
        border: 2px solid #1c1c1c;
        border-radius: 50%;
        background: #ffffff;
      }

      .buscador {
        display: flex;
        flex: 1 1 360px;
        justify-content: flex-end;
        gap: 8px;
      }

      .buscador input {
        flex: 1 1 200px;
        max-width: 340px;
        min-width: 0;
        padding: 11px 16px;
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
      }

      .buscador input::placeholder {
        color: rgba(255, 255, 255, 0.55);
      }

      .boton {
        padding: 11px 20px;
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, transform 0.2s;
      }

      .boton:hover {
        background: rgba(255, 255, 255, 0.22);
        transform: translateY(-2px);
      }

      .boton[aria-pressed="true"] {
        background: #ffffff;
        color: #0b0c12;
      }

      /* ---------- Escena ---------- */
      main {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
        gap: 32px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 8px 24px 56px;
        transition: opacity 0.3s;
      }

      body.cargando main {
        opacity: 0.35;
        pointer-events: none;
      }

      body.cargando::after {
        content: "";
        position: fixed;
        inset: 50% auto auto 50%;
        width: 56px;
        height: 56px;
        translate: -50% -50%;
        border: 5px solid #ffffff;
        border-radius: 50%;
        background: linear-gradient(#ee1515 0 46%, #ffffff 46%);
        animation: girar 0.8s linear infinite;
      }

      @keyframes girar {
        to {
          rotate: 360deg;
        }
      }

      /* ---------- Vitrina (imagen) ---------- */
      #vitrina {
        position: sticky;
        top: 16px;
        align-self: start;
        height: calc(100vh - 96px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
        min-height: 520px;
        perspective: 900px;
        overflow: clip;
      }

      .marca {
        position: absolute;
        inset: 42% auto auto 50%;
        translate: -50% -50%;
        font-family: "Bungee", sans-serif;
        font-size: clamp(8rem, 16vw, 15rem);
        line-height: 1;
        color: transparent;
        -webkit-text-stroke: 2px color-mix(in srgb, var(--acento) 70%, transparent);
        opacity: 0.55;
        user-select: none;
        pointer-events: none;
      }

      .halo {
        position: absolute;
        inset: 42% auto auto 50%;
        width: min(440px, 80%);
        aspect-ratio: 1;
        translate: -50% -50%;
        border-radius: 50%;
        background: radial-gradient(circle, color-mix(in srgb, var(--acento) 75%, transparent), transparent 68%);
        filter: blur(30px);
        animation: latir 4s ease-in-out infinite;
      }

      @keyframes latir {
        50% {
          scale: 1.15;
          opacity: 0.75;
        }
      }

      .arte {
        position: relative;
        width: min(400px, 82%);
        aspect-ratio: 1;
        object-fit: contain;
        filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.5));
        transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
        transition: transform 0.15s ease-out, scale 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.3), opacity 0.5s;
        animation: flotar 5s ease-in-out infinite;
        scale: 0.6;
        opacity: 0;
      }

      .arte.listo {
        scale: 1;
        opacity: 1;
      }

      @keyframes flotar {
        50% {
          translate: 0 -14px;
        }
      }

      .acciones {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }

      /* ---------- Ficha ---------- */
      #ficha {
        align-self: center;
        padding: 28px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(16px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
        animation: entrar 0.6s ease-out both;
      }

      @keyframes entrar {
        from {
          opacity: 0;
          translate: 0 24px;
        }
      }

      h1 {
        margin: 0;
        font-family: "Bungee", sans-serif;
        font-size: clamp(2rem, 5vw, 3.3rem);
        font-weight: 400;
        line-height: 1.05;
        overflow-wrap: anywhere;
      }

      .genero {
        margin: 6px 0 14px;
        color: rgba(255, 255, 255, 0.7);
        letter-spacing: 0.04em;
      }

      .fila {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 18px;
      }

      .tipo {
        padding: 5px 16px;
        border: 1.5px solid var(--color);
        border-radius: 999px;
        background: color-mix(in srgb, var(--color) 30%, transparent);
        font-weight: 600;
        font-size: 0.9rem;
      }

      .insignia {
        padding: 5px 16px;
        border-radius: 999px;
        background: #ffffff;
        color: #0b0c12;
        font-weight: 700;
        font-size: 0.9rem;
      }

      .descripcion {
        max-width: 60ch;
        margin: 0 0 22px;
        font-size: 1.05rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.85);
      }

      h2 {
        margin: 24px 0 12px;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.6);
      }

      .datos {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 10px;
      }

      .dato {
        padding: 12px 14px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.07);
      }

      .dato.ancho {
        grid-column: 1 / -1;
      }

      .dato small {
        display: block;
        margin-bottom: 2px;
        font-size: 0.72rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.6);
      }

      .dato strong {
        font-size: 1.1rem;
      }

      .stat {
        display: grid;
        grid-template-columns: 130px 40px 1fr;
        align-items: center;
        gap: 10px;
        margin-bottom: 9px;
      }

      .stat span {
        color: rgba(255, 255, 255, 0.85);
      }

      .stat strong {
        text-align: end;
        font-variant-numeric: tabular-nums;
      }

      .pista {
        height: 10px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.1);
        overflow: hidden;
      }

      .relleno {
        width: calc(var(--valor) * 1%);
        height: 100%;
        border-radius: 5px;
        background: linear-gradient(90deg, var(--acento), color-mix(in srgb, var(--acento) 50%, #ffffff));
        animation: crecer 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        animation-delay: calc(var(--orden) * 90ms);
      }

      @keyframes crecer {
        from {
          width: 0;
        }
      }

      .total {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.14);
        display: flex;
        justify-content: space-between;
        font-weight: 700;
      }

      .familia {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .pariente {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 96px;
        padding: 8px 4px;
        border: 1px solid transparent;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.07);
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
      }

      .pariente:hover {
        transform: translateY(-4px);
        background: rgba(255, 255, 255, 0.16);
      }

      .pariente.actual {
        border-color: #ffffff;
      }

      .pariente img {
        width: 72px;
        height: 72px;
        image-rendering: pixelated;
      }

      .pariente span {
        font-size: 0.8rem;
        text-align: center;
      }

      .error {
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.6;
      }

      footer {
        padding: 0 24px 32px;
        text-align: center;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.5);
      }

      @media (max-width: 900px) {
        main {
          grid-template-columns: minmax(0, 1fr);
        }

        #vitrina {
          position: relative;
          top: auto;
          height: auto;
          min-height: 460px;
        }

        .buscador {
          flex-wrap: wrap;
          justify-content: stretch;
        }

        .buscador input {
          flex-basis: 100%;
          max-width: none;
        }

        .buscador .boton {
          flex: 1;
        }
      }

      @media (max-width: 480px) {
        .stat {
          grid-template-columns: 118px 34px 1fr;
        }

        #ficha {
          padding: 20px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
        }

        .arte {
          scale: 1;
          opacity: 1;
        }
      }
    </style>
  </head>
  <body>
    <header class="barra">
      <div class="logo"><span class="pokebola"></span> POKÉDEX</div>
      <form class="buscador" id="formulario">
        <input
          id="busqueda"
          type="text"
          autocomplete="off"
          aria-label="Número o nombre del Pokémon"
          placeholder="Número o nombre en inglés: 25, charizard..."
        />
        <button class="boton" type="submit">Buscar</button>
        <button class="boton" type="button" data-accion="azar">Al azar</button>
      </form>
    </header>

    <main>
      <section id="vitrina" aria-label="Imagen del Pokémon"></section>
      <section id="ficha" aria-live="polite"></section>
    </main>

    <footer>
      Datos de PokéAPI · Usá las flechas ← → del teclado para pasar de uno a otro
    </footer>

    <script>
      const API = 'https://pokeapi.co/api/v2/';
      const ULTIMO_NUMERO = 1025;

      const coloresDeTipo = {
        normal: '#a8a77a', fire: '#ee8130', water: '#6390f0', electric: '#f7d02c',
        grass: '#7ac74c', ice: '#96d9d6', fighting: '#c22e28', poison: '#a33ea1',
        ground: '#e2bf65', flying: '#a98ff3', psychic: '#f95587', bug: '#a6b91a',
        rock: '#b6a136', ghost: '#735797', dragon: '#6f35fc', dark: '#705746',
        steel: '#b7b7ce', fairy: '#d685ad',
      };

      const tiposEnEspanol = {
        normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
        grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
        ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
        rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro',
        steel: 'Acero', fairy: 'Hada',
      };

      const statsEnEspanol = {
        hp: 'PS', attack: 'Ataque', defense: 'Defensa',
        'special-attack': 'Ataque especial', 'special-defense': 'Defensa especial',
        speed: 'Velocidad',
      };

      const habitatsEnEspanol = {
        cave: 'Cueva', forest: 'Bosque', grassland: 'Pradera', mountain: 'Montaña',
        rare: 'Raro', 'rough-terrain': 'Terreno difícil', sea: 'Mar',
        urban: 'Ciudad', 'waters-edge': 'Orilla del agua',
      };

      let pokemonActual = null;
      let esShiny = false;
      let numeroDePedido = 0;

      const $ = (id) => document.getElementById(id);

      async function pedir(url) {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          throw new Error('Error ' + respuesta.status);
        }
        return respuesta.json();
      }

      function enEspanol(lista) {
        return lista.find((item) => item.language.name === 'es');
      }

      function escapar(texto) {
        return texto.replace(/[&<>"']/g, (letra) => '&#' + letra.charCodeAt(0) + ';');
      }

      function traerHabilidades(pokemon) {
        return Promise.all(
          pokemon.abilities.map(async (item) => {
            const habilidad = await pedir(item.ability.url);
            const nombre = enEspanol(habilidad.names);
            return (nombre ? nombre.name : item.ability.name) + (item.is_hidden ? ' (oculta)' : '');
          })
        );
      }

      async function traerFamilia(especie) {
        if (!especie.evolution_chain) {
          return [];
        }
        const cadena = await pedir(especie.evolution_chain.url);
        const miembros = [];
        (function recorrer(nodo) {
          miembros.push(nodo.species);
          nodo.evolves_to.forEach(recorrer);
        })(cadena.chain);

        return Promise.all(
          miembros.map(async (miembro) => {
            const datos = await pedir(miembro.url);
            const nombre = enEspanol(datos.names);
            return { id: datos.id, nombre: nombre ? nombre.name : miembro.name };
          })
        );
      }

      function imagenDe(pokemon) {
        const arte = pokemon.sprites.other['official-artwork'];
        const normal = arte.front_default || pokemon.sprites.front_default;
        return esShiny ? arte.front_shiny || normal : normal;
      }

      function mostrar(pokemon, especie, habilidades, familia) {
        const colorPrincipal = coloresDeTipo[pokemon.types[0].type.name];
        document.body.style.setProperty('--acento', colorPrincipal);

        const nombre = enEspanol(especie.names);
        const nombreVisible = nombre ? nombre.name : pokemon.name;
        const genero = enEspanol(especie.genera);
        const descripcion = enEspanol([...especie.flavor_text_entries].reverse());
        const generacion = especie.generation.name.split('-')[1].toUpperCase();
        const habitat = especie.habitat ? habitatsEnEspanol[especie.habitat.name] : 'Desconocido';
        const numero = String(pokemon.id).padStart(3, '0');
        const total = pokemon.stats.reduce((suma, item) => suma + item.base_stat, 0);

        const tipos = pokemon.types.map((item) => {
          const color = coloresDeTipo[item.type.name];
          return '<span class="tipo" style="--color:' + color + '">' + tiposEnEspanol[item.type.name] + '</span>';
        });

        const insignias = [];
        if (especie.is_legendary) insignias.push('Legendario');
        if (especie.is_mythical) insignias.push('Mítico');
        if (especie.is_baby) insignias.push('Bebé');

        const stats = pokemon.stats.map((item, orden) => {
          const valor = Math.min(100, (item.base_stat / 255) * 100);
          return (
            '<div class="stat">' +
            '<span>' + statsEnEspanol[item.stat.name] + '</span>' +
            '<strong>' + item.base_stat + '</strong>' +
            '<div class="pista"><div class="relleno" style="--valor:' + valor + ';--orden:' + orden + '"></div></div>' +
            '</div>'
          );
        });

        const parientes = familia.map((pariente) => {
          const clase = pariente.id === pokemon.id ? 'pariente actual' : 'pariente';
          return (
            '<button class="' + clase + '" data-accion="ir" data-id="' + pariente.id + '">' +
            '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pariente.id + '.png" alt="">' +
            '<span>' + pariente.nombre + '</span>' +
            '</button>'
          );
        });

        $('vitrina').innerHTML =
          '<div class="marca">' + numero + '</div>' +
          '<div class="halo"></div>' +
          '<img id="arte" class="arte" alt="' + nombreVisible + '" src="' + imagenDe(pokemon) + '" />' +
          '<div class="acciones">' +
          '<button class="boton" data-accion="anterior">← Anterior</button>' +
          '<button class="boton" id="botonShiny" data-accion="shiny" aria-pressed="false">Shiny</button>' +
          (pokemon.cries && pokemon.cries.latest ? '<button class="boton" data-accion="grito">Grito</button>' : '') +
          '<button class="boton" data-accion="siguiente">Siguiente →</button>' +
          '</div>';

        const arte = $('arte');
        arte.addEventListener('load', () => arte.classList.add('listo'));
        if (arte.complete) arte.classList.add('listo');

        const ficha = $('ficha');
        ficha.style.animation = 'none';
        ficha.offsetHeight;
        ficha.style.animation = '';
        ficha.innerHTML =
          '<h1>' + nombreVisible + '</h1>' +
          '<p class="genero">N.º ' + numero + (genero ? ' · ' + genero.genus : '') + '</p>' +
          '<div class="fila">' + tipos.join('') +
          insignias.map((texto) => '<span class="insignia">' + texto + '</span>').join('') + '</div>' +
          '<p class="descripcion">' + (descripcion ? descripcion.flavor_text.replace(/[\n\f]/g, ' ') : '') + '</p>' +
          '<h2>Datos</h2>' +
          '<div class="datos">' +
          '<div class="dato"><small>Altura</small><strong>' + (pokemon.height / 10).toLocaleString('es-AR') + ' m</strong></div>' +
          '<div class="dato"><small>Peso</small><strong>' + (pokemon.weight / 10).toLocaleString('es-AR') + ' kg</strong></div>' +
          '<div class="dato"><small>Experiencia base</small><strong>' + (pokemon.base_experience ?? '-') + '</strong></div>' +
          '<div class="dato"><small>Generación</small><strong>' + generacion + '</strong></div>' +
          '<div class="dato"><small>Hábitat</small><strong>' + habitat + '</strong></div>' +
          '<div class="dato"><small>Ratio de captura</small><strong>' + especie.capture_rate + '</strong></div>' +
          '<div class="dato ancho"><small>Habilidades</small><strong>' + habilidades.join(' · ') + '</strong></div>' +
          '</div>' +
          '<h2>Estadísticas</h2>' + stats.join('') +
          '<div class="total"><span>Total</span><span>' + total + '</span></div>' +
          '<h2>Familia evolutiva</h2>' +
          (parientes.length > 1 ? '<div class="familia">' + parientes.join('') + '</div>' : '<p class="descripcion">No evoluciona.</p>');

        document.title = nombreVisible + ' · Pokédex';
        history.replaceState(null, '', '#' + pokemon.id);
      }

      async function buscar(consulta) {
        const texto = String(consulta).trim().toLowerCase();
        if (!texto) {
          return;
        }

        const miPedido = ++numeroDePedido;
        document.body.classList.add('cargando');

        try {
          const pokemon = await pedir(API + 'pokemon/' + encodeURIComponent(texto));
          const especie = await pedir(pokemon.species.url);
          const [habilidades, familia] = await Promise.all([traerHabilidades(pokemon), traerFamilia(especie)]);
          if (miPedido !== numeroDePedido) {
            return;
          }
          pokemonActual = pokemon;
          esShiny = false;
          mostrar(pokemon, especie, habilidades, familia);
        } catch (error) {
          if (miPedido !== numeroDePedido) {
            return;
          }
          $('ficha').innerHTML =
            '<p class="error">No encontré ningún Pokémon con «' + escapar(texto) + '». ' +
            'Probá con un número del 1 al ' + ULTIMO_NUMERO + ' o con el nombre en inglés, por ejemplo <strong>pikachu</strong>.</p>';
        } finally {
          if (miPedido === numeroDePedido) {
            document.body.classList.remove('cargando');
          }
        }
      }

      function vecino(paso) {
        const id = pokemonActual ? pokemonActual.id : 1;
        if (id > ULTIMO_NUMERO) {
          return 1;
        }
        return ((id - 1 + paso + ULTIMO_NUMERO) % ULTIMO_NUMERO) + 1;
      }

      const acciones = {
        azar: () => buscar(Math.floor(Math.random() * ULTIMO_NUMERO) + 1),
        anterior: () => buscar(vecino(-1)),
        siguiente: () => buscar(vecino(1)),
        ir: (boton) => buscar(boton.dataset.id),
        shiny: (boton) => {
          esShiny = !esShiny;
          boton.setAttribute('aria-pressed', esShiny);
          $('arte').src = imagenDe(pokemonActual);
        },
        grito: () => {
          new Audio(pokemonActual.cries.latest).play().catch(() => {});
        },
      };

      document.addEventListener('click', (evento) => {
        const boton = evento.target.closest('[data-accion]');
        if (boton) {
          acciones[boton.dataset.accion](boton);
        }
      });

      $('formulario').addEventListener('submit', (evento) => {
        evento.preventDefault();
        buscar($('busqueda').value);
        $('busqueda').blur();
      });

      document.addEventListener('keydown', (evento) => {
        if (evento.target.tagName === 'INPUT') {
          return;
        }
        if (evento.key === 'ArrowRight') acciones.siguiente();
        if (evento.key === 'ArrowLeft') acciones.anterior();
      });

      const vitrina = $('vitrina');
      const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      vitrina.addEventListener('mousemove', (evento) => {
        if (sinMovimiento) {
          return;
        }
        const caja = vitrina.getBoundingClientRect();
        const x = (evento.clientX - caja.left) / caja.width - 0.5;
        const y = (evento.clientY - caja.top) / caja.height - 0.5;
        vitrina.style.setProperty('--ry', x * 22 + 'deg');
        vitrina.style.setProperty('--rx', -y * 22 + 'deg');
      });

      vitrina.addEventListener('mouseleave', () => {
        vitrina.style.setProperty('--ry', '0deg');
        vitrina.style.setProperty('--rx', '0deg');
      });

      buscar(location.hash.slice(1) || 25);
    </script>
  </body>
</html>
```

## Cambios chiquitos (opcionales)

Cada uno es cambiar **una cosa** y apretar **F5**.

1. **Otro Pokémon al arrancar.** Al final del código buscá `buscar(location.hash.slice(1) || 25);` y cambiá el `25` por otro número.
2. **Otro nombre.** Buscá `POKÉDEX` y poné tu nombre, por ejemplo `POKÉDEX DE SOFI`.
3. **Otro color para un tipo.** Buscá `fire: '#ee8130'` y cambiá el color. ¿Querés el Fuego en violeta? Probá con `#9b30ff`. Los códigos como `#ee8130` son colores: en Google escribí "color picker" para elegir uno.
4. **Imagen más grande.** Buscá `width: min(400px, 82%);` y cambiá el `400` por `520`.
5. **Un giro 3D más loco.** Buscá `x * 22` y `y * 22`, y cambiá los dos `22` por `45`.
6. **Otra tipografía.** En el `<link>` de arriba y en `font-family`, cambiá `Chakra Petch` por otra de https://fonts.google.com

Si algo se rompe, no pasa nada: deshacé con **Ctrl + Z** o volvé a copiar el código de arriba.

## Cómo funciona (para los que tienen curiosidad)

Todo pasa en la función `buscar`:

1. Lee lo que escribiste (un número o un nombre).
2. Le pide los datos a PokéAPI con `fetch`. Lo hace varias veces: una para el Pokémon, otra para su especie (nombre en español y descripción), otra por cada habilidad y otra por cada pariente de la familia evolutiva.
3. Espera a que lleguen todas con `await`.
4. Arma el HTML con esos datos y lo pone en la pantalla.

El color de fondo sale de un diccionario (`coloresDeTipo`): una lista de pares «tipo → color». Cuando cambia el Pokémon, la página cambia **una sola variable** (`--acento`) y todo el diseño se pinta distinto.

Probá esto: abrí en otra pestaña https://pokeapi.co/api/v2/pokemon/25 . Eso es **exactamente** lo que recibe tu página. Es muchísimo texto, y tu página se encarga de ordenarlo para que se vea lindo.

## Si algo sale mal

- **Aparece una rueda girando para siempre:** revisá que tengas internet. Probá de nuevo con **F5**.
- **La página se ve sin colores o con texto raro:** si copiaste el código a mano, faltó una parte. Volvé a copiarlo **entero**, de `<!DOCTYPE html>` a `</html>`, o usá el archivo `pokemon/index.html` del proyecto.
- **Se ve el código en el navegador en vez de la página:** si lo copiaste a mano, el archivo se guardó con otro nombre. Tiene que llamarse `index.html`, no `index.html.txt`.
- **Dice "No encontré ningún Pokémon":** probá un número del 1 al 1025, o un nombre **en inglés** (`pikachu`, no `pikachú`).
- **El Grito no suena:** revisá el volumen y que la pestaña no esté silenciada.
- **Para ver el error real:** apretá **F12** y mirá la pestaña **Consola**. Si hay algo en rojo, pegáselo a ChatGPT o Gemini y pedile *"explicame este error para alguien que recién empieza"*.

## Una pregunta para pensar

Esta página nunca tuvo guardados los 1025 Pokémon. Se los pide a otro programa cada vez que apretás **Buscar**. ¿Qué otras páginas o aplicaciones que usás todos los días creés que funcionan igual?
