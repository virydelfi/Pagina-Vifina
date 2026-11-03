# Actividad: tu primer Cloudflare Worker

## Qué vamos a hacer

Un **Worker** es un programa chiquito que vive en internet y **contesta cuando alguien le pide una dirección**. No tenés que alquilar ni mantener un servidor: lo pegás, lo publicás y listo. Cloudflare lo corre por vos, y el plan gratis alcanza de sobra.

Hoy publicás uno que **le pregunta a la PokéAPI por un Pokémon y te contesta solo lo importante**: nombre, número e imagen.

**No tenés que escribir código.** Está todo abajo para copiar y pegar.

## Mirá workers de verdad

En Hook tenemos uno publicado. Se llama `firmware` y contesta una sola pregunta: **«¿cuál es la última versión del firmware de esta placa?»**. Mauro te explica para qué se usa. Probalo abriendo estos links:

- <https://firmware.balanzas-hook.workers.dev/latest?board=Placa-WiFi>
- <https://firmware.balanzas-hook.workers.dev/latest?board=St-One>
- <https://firmware.balanzas-hook.workers.dev/latest?board=St-7>
- <https://firmware.balanzas-hook.workers.dev/latest?board=St-H>

Cambiando lo que va después de `board=` cambia la respuesta, y si ponés una placa que no existe te contesta con un error. El tuyo va a hacer lo mismo, pero con Pokémon.

## Paso a paso

### 1. Creá la cuenta

1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) y registrate con tu mail (es gratis).
2. En el menú de la izquierda buscá **Workers & Pages** (el nombre puede variar un poco).
3. Si te lo pide, elegí un nombre para tu subdominio gratis `workers.dev`.

### 2. Creá el worker

1. Apretá **Create** → **Start with Hello World** (o parecido). Ponele de nombre `pokemon`.
2. Apretá **Deploy**.
3. Apretá **Edit code**, borrá todo lo que hay y pegá esto:

```js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "pokemon" || partes.length !== 2) {
      return new Response("Probá con /pokemon/pikachu", { status: 404 });
    }

    const nombre = decodeURIComponent(partes[1]).trim().toLowerCase();

    let respuesta;
    try {
      respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombre)}`);
    } catch {
      return new Response("La PokéAPI no responde", { status: 502 });
    }

    if (respuesta.status === 404) {
      return new Response(`No existe el Pokémon: ${nombre}`, { status: 404 });
    }
    if (!respuesta.ok) {
      return new Response(`La PokéAPI contestó ${respuesta.status}`, { status: 502 });
    }

    const pokemon = await respuesta.json();
    return Response.json({
      nombre: pokemon.name,
      numero: pokemon.id,
      imagen: pokemon.sprites.front_default,
    });
  },
};
```

4. Apretá **Deploy** de nuevo.

## Probá esto

Tu dirección es `https://pokemon.TU-SUBDOMINIO.workers.dev` (Cloudflare te la muestra). Agregale `/pokemon/` y un nombre:

1. `/pokemon/pikachu`: tiene que contestar nombre, número e imagen. Copiá el link de `imagen` y abrilo en otra pestaña.
2. `/pokemon/jigglypuff`, `/pokemon/ditto`, `/pokemon/charizard`: probá los tuyos favoritos.
3. `/pokemon/Pikachu` y `/pokemon/PIKACHU`: dan lo mismo. ¿En qué parte del código pasa eso?
4. `/pokemon/25`: la PokéAPI también entiende números.
5. `/pokemon/roberto`: no existe. Fijate el error. Abrí **F12** → pestaña **Red** y mirá el número: **404**.
6. `/pokemon` y `/cualquier-cosa`: también dan error. ¿Por qué?
7. Pasale tu link a un compañero/a. Funciona desde cualquier lado, con tu computadora apagada.
8. En el panel de Cloudflare mirá las **métricas** de tu worker: cuántos pedidos recibió.

## Cómo funciona

- `new URL(request.url)` desarma la dirección que te pidieron. `pathname` es la parte `/pokemon/pikachu`.
- Se separa por `/` y se queda con las dos partes: `pokemon` y el nombre.
- `fetch(...)` le pregunta a la PokéAPI, igual que en la actividad de la Pokédex.
- De toda la respuesta (que es enorme) el worker devuelve solo tres datos. Compará el peso de tu respuesta con la de <https://pokeapi.co/api/v2/pokemon/pikachu>.
- Los errores usan números con significado: **404** es «eso no existe» y **502** es «no es mi culpa, el que consulto falló».

## Cosas para pensar

- **¿Qué ventaja tiene que el worker devuelva solo tres datos?** Pensá en un celular con mala conexión.
- **¿Qué pasa con tu worker si la PokéAPI se cae?** ¿Y si cambia el formato de su respuesta?
- **¿Cualquiera que conozca tu dirección puede usar el worker?** Sí. ¿Qué cuidados habría que tener si el worker usara un dato secreto?

## Cambios chiquitos (opcionales)

1. **La imagen de espaldas.** Cambiá `front_default` por `back_default`.
2. **El peso y la altura.** Agregá `peso: pokemon.weight` y `altura: pokemon.height` al `Response.json`.
3. **Los tipos.** Agregá `tipos: pokemon.types.map((t) => t.type.name)`.
4. **Usalo desde tu Pokédex.** En `equipo-pokemon/app.js`, que la página le pida los datos a tu worker en vez de a la PokéAPI.
