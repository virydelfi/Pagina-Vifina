const API = 'https://pokeapi.co/api/v2/';
const ULTIMO_NUMERO = 1025;
const CARPETA_SQLJS = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/';

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

const ejemplos = [
  { numero: 25, nombre: 'Roberto' },
  { numero: 25, nombre: 'Mario' },
  { numero: 39, nombre: 'Rosita' },
];

const $ = (id) => document.getElementById(id);

let db;
let pokemonEnVista = null;
let editando = null;
let liberando = null;
let numeroDeDibujo = 0;
let temporizadorFiltro;
let temporizadorLiberarTodos;
const datosPokemon = new Map();
const historial = [];

// ---------- Utilidades ----------

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (letra) => '&#' + letra.charCodeAt(0) + ';');
}

function esperar(milisegundos) {
  return new Promise((resolver) => setTimeout(resolver, milisegundos));
}

function imagenDe(numero) {
  return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + numero + '.png';
}

async function pedir(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error('Error ' + respuesta.status);
  }
  return respuesta.json();
}

// Cuando SQL pide un dato, lo mandamos aparte del texto con "?". Así un nombre
// con comillas nunca puede romper la consulta. Esta función solo arma el texto
// que se muestra en pantalla, con los valores ya puestos.
function rellenar(plantilla, valores) {
  let posicion = 0;
  return plantilla.replace(/\?/g, () => {
    const valor = valores[posicion++];
    return typeof valor === 'number' ? String(valor) : "'" + String(valor).replace(/'/g, "''") + "'";
  });
}

const palabrasDeSql = [
  'CREATE TABLE IF NOT EXISTS', 'INSERT INTO', 'DELETE FROM', 'ORDER BY', 'PRIMARY KEY',
  'AUTOINCREMENT', 'NOT NULL', 'INTEGER', 'VALUES', 'SELECT', 'UPDATE', 'WHERE', 'FROM', 'LIKE', 'TEXT', 'SET',
];
const patronDeSql = new RegExp("('(?:[^']|'')*')|\\b(\\d+)\\b|\\b(" + palabrasDeSql.join('|') + ')\\b', 'g');

function resaltar(sql) {
  let resultado = '';
  let ultimo = 0;
  for (const coincidencia of sql.matchAll(patronDeSql)) {
    resultado += escapar(sql.slice(ultimo, coincidencia.index));
    const clase = coincidencia[1] ? 'texto' : coincidencia[2] ? 'numero' : 'palabra';
    resultado += '<span class="' + clase + '">' + escapar(coincidencia[0]) + '</span>';
    ultimo = coincidencia.index + coincidencia[0].length;
  }
  return resultado + escapar(sql.slice(ultimo));
}

function mostrarMensaje(texto, esCorrecto = false) {
  const mensaje = $('mensajeFormulario');
  mensaje.textContent = texto;
  mensaje.classList.toggle('ok', esCorrecto);
}

// ---------- Base de datos guardada en el navegador (IndexedDB) ----------

function abrirAlmacen() {
  return new Promise((resolver, rechazar) => {
    const pedido = indexedDB.open('mi-pc-pokemon', 1);
    pedido.onupgradeneeded = () => pedido.result.createObjectStore('archivos');
    pedido.onsuccess = () => resolver(pedido.result);
    pedido.onerror = () => rechazar(pedido.error);
  });
}

async function leerBaseGuardada() {
  const almacen = await abrirAlmacen();
  return new Promise((resolver, rechazar) => {
    const pedido = almacen.transaction('archivos').objectStore('archivos').get('base');
    pedido.onsuccess = () => resolver(pedido.result || null);
    pedido.onerror = () => rechazar(pedido.error);
  });
}

async function guardarBase() {
  try {
    const almacen = await abrirAlmacen();
    await new Promise((resolver, rechazar) => {
      const transaccion = almacen.transaction('archivos', 'readwrite');
      transaccion.objectStore('archivos').put(db.export(), 'base');
      transaccion.oncomplete = resolver;
      transaccion.onerror = () => rechazar(transaccion.error);
    });
  } catch (error) {
    console.warn('No pude guardar la base en el navegador:', error);
  }
}

function consultar(sql, valores = []) {
  const sentencia = db.prepare(sql);
  sentencia.bind(valores);
  const filas = [];
  while (sentencia.step()) {
    filas.push(sentencia.getAsObject());
  }
  sentencia.free();
  return filas;
}

// ---------- Panel "Lo que pasa por dentro" ----------

function registrar(operacion, sql) {
  const hora = new Date().toLocaleTimeString('es-AR', { hour12: false });
  historial.unshift({ hora, operacion, sql: sql.replace(/\s*\n\s*/g, ' ') });
  historial.length = Math.min(historial.length, 60);

  $('cantidadHistorial').textContent = '(' + historial.length + ')';
  $('listaHistorial').innerHTML = historial
    .map((item) => '<li><span>' + item.hora + '</span><span>' + item.operacion + '</span><span>' + escapar(item.sql) + '</span></li>')
    .join('');
}

function explicar(operacion, sql, lineas) {
  $('consola').innerHTML =
    '<span class="etiqueta-operacion">' + operacion + '</span>' +
    '<pre><code>' + resaltar(sql) + '</code></pre>' +
    '<ul class="explicacion">' + lineas.map((linea) => '<li>' + linea + '</li>').join('') + '</ul>';

  document.querySelectorAll('.crud li').forEach((item) => {
    item.classList.toggle('activa', item.dataset.operacion === operacion);
  });
}

// ---------- Datos de PokéAPI ----------

async function traerDatos(numero, pokemonYaPedido) {
  if (datosPokemon.has(numero)) {
    return datosPokemon.get(numero);
  }
  const [pokemon, especie] = await Promise.all([
    pokemonYaPedido || pedir(API + 'pokemon/' + numero),
    pedir(API + 'pokemon-species/' + numero),
  ]);
  const nombre = especie.names.find((item) => item.language.name === 'es');
  const tipos = pokemon.types.map((item) => item.type.name);
  const datos = {
    numero,
    especie: nombre ? nombre.name : pokemon.name,
    tipos,
    color: coloresDeTipo[tipos[0]],
  };
  datosPokemon.set(numero, datos);
  return datos;
}

function datosDe(numero) {
  return datosPokemon.get(numero) || { numero, especie: 'N.º ' + numero, tipos: [], color: '#888888' };
}

// ---------- Las cuatro operaciones: Crear, Leer, Editar y Borrar ----------

const SQL_CREAR_TABLA =
  'CREATE TABLE IF NOT EXISTS pokemon_guardados (\n' +
  '  id INTEGER PRIMARY KEY AUTOINCREMENT,\n' +
  '  pokemon_number INTEGER NOT NULL,\n' +
  '  pokemon_name TEXT NOT NULL\n' +
  ');';

function crearTabla() {
  db.run(SQL_CREAR_TABLA);
  registrar('CREATE', SQL_CREAR_TABLA);
}

function explicarCrearTabla() {
  explicar('CREATE', SQL_CREAR_TABLA, [
    'Estoy ejecutando un <code>CREATE TABLE</code>: armo la tabla <code>pokemon_guardados</code>. Pensala como una planilla de Excel vacía, con tres columnas.',
    '<code>id</code>: un número que SQLite le pone solo a cada fila (1, 2, 3...). Sirve para distinguir un Pokémon de otro, aunque se llamen igual.',
    '<code>pokemon_number</code>: el número del Pokémon en la Pokédex. Lo trae PokéAPI. <code>NOT NULL</code> quiere decir que no puede quedar vacío.',
    '<code>pokemon_name</code>: el nombre que le elegís vos. Es texto (<code>TEXT</code>).',
  ]);
}

function insertar(numero, apodo, mostrar = true) {
  const plantilla = 'INSERT INTO pokemon_guardados (pokemon_number, pokemon_name)\nVALUES (?, ?);';
  const valores = [numero, apodo];
  db.run(plantilla, valores);
  const id = consultar('SELECT last_insert_rowid() AS id')[0].id;
  const sql = rellenar(plantilla, valores);
  registrar('INSERT', sql);

  if (mostrar) {
    const especie = escapar(datosDe(numero).especie);
    explicar('INSERT', sql, [
      'Estoy ejecutando un <code>INSERT</code>: agrego una fila nueva a la tabla <code>pokemon_guardados</code>.',
      'En <code>pokemon_number</code> guardo <b>' + numero + '</b>: el número de ' + especie + ', que me lo dio PokéAPI.',
      'En <code>pokemon_name</code> guardo <b>' + escapar("'" + apodo.replace(/'/g, "''") + "'") + '</b>: el nombre que le elegiste vos.',
      'No le puse <code>id</code>: SQLite se lo puso solo y le tocó el <b>' + id + '</b>.',
      'Resultado: ahora tenés un ' + especie + ' llamado ' + escapar(apodo) + '.',
    ]);
  }
  return id;
}

function leerEquipo(mostrar) {
  const filtro = $('filtro').value.trim();
  let plantilla = 'SELECT id, pokemon_number, pokemon_name\nFROM pokemon_guardados';
  const valores = [];
  if (filtro) {
    plantilla += '\nWHERE pokemon_name LIKE ?';
    valores.push('%' + filtro + '%');
  }
  plantilla += '\nORDER BY id;';

  const filas = consultar(plantilla, valores);
  if (mostrar) {
    const sql = rellenar(plantilla, valores);
    registrar('SELECT', sql);
    const lineas = [
      'Estoy ejecutando un <code>SELECT</code>: le pido datos a la tabla. No cambia nada, solo mira.',
      '<code>SELECT id, pokemon_number, pokemon_name</code>: las columnas que quiero ver.',
      '<code>FROM pokemon_guardados</code>: de qué tabla las saco.',
    ];
    if (filtro) {
      lineas.push('<code>WHERE pokemon_name LIKE ' + escapar("'%" + filtro.replace(/'/g, "''") + "%'") + '</code>: solo los que tengan <b>' + escapar(filtro) + '</b> en el nombre. Los <code>%</code> quieren decir «cualquier cosa».');
    }
    lineas.push('<code>ORDER BY id</code>: en el orden en que los guardaste.');
    lineas.push('Me devolvió <b>' + filas.length + (filas.length === 1 ? ' fila' : ' filas') + '</b>: cada una es un Pokémon de los que ves en pantalla.');
    explicar('SELECT', sql, lineas);
  }
  return filas;
}

function actualizar(id, numero, nombreViejo, nombreNuevo) {
  const plantilla = 'UPDATE pokemon_guardados\nSET pokemon_name = ?\nWHERE id = ?;';
  const valores = [nombreNuevo, id];
  db.run(plantilla, valores);
  const sql = rellenar(plantilla, valores);
  registrar('UPDATE', sql);

  explicar('UPDATE', sql, [
    'Estoy ejecutando un <code>UPDATE</code>: cambio datos de una fila que ya existe.',
    '<code>SET pokemon_name = ' + escapar("'" + nombreNuevo.replace(/'/g, "''") + "'") + '</code>: el nombre nuevo.',
    '<code>WHERE id = ' + id + '</code>: le digo cuál fila cambiar. Solo la que tiene id ' + id + '. Si me olvidara del <code>WHERE</code>, le cambiaría el nombre a <b>todos</b> tus Pokémon.',
    'Resultado: tu ' + escapar(datosDe(numero).especie) + ' pasó de llamarse ' + escapar(nombreViejo) + ' a ' + escapar(nombreNuevo) + '.',
  ]);
}

function liberar(id, numero, nombre) {
  const plantilla = 'DELETE FROM pokemon_guardados\nWHERE id = ?;';
  db.run(plantilla, [id]);
  const sql = rellenar(plantilla, [id]);
  registrar('DELETE', sql);

  explicar('DELETE', sql, [
    'Estoy ejecutando un <code>DELETE</code>: borro filas de la tabla <code>pokemon_guardados</code>.',
    '<code>WHERE id = ' + id + '</code>: borro solamente la fila que tiene id ' + id + '.',
    'Sin el <code>WHERE</code> se borrarían <b>todas</b> las filas. Probalo con «Liberar a todos».',
    'Resultado: tu ' + escapar(datosDe(numero).especie) + ' llamado ' + escapar(nombre) + ' ya no existe en la base. Fue liberado.',
  ]);
}

function liberarTodos() {
  const sql = 'DELETE FROM pokemon_guardados;';
  db.run(sql);
  const borradas = db.getRowsModified();
  registrar('DELETE', sql);

  explicar('DELETE', sql, [
    'Estoy ejecutando un <code>DELETE</code> <b>sin <code>WHERE</code></b>: no le dije cuál fila, así que borra <b>todas</b>.',
    'Se borraron <b>' + borradas + (borradas === 1 ? ' fila' : ' filas') + '</b>. Mirá la tabla de abajo: quedó vacía.',
    'Por eso en SQL el <code>WHERE</code> es tan importante: es lo que evita los desastres.',
  ]);
}

// ---------- Dibujar la pantalla ----------

function dibujarEquipo(filas, nuevoId, entrada) {
  const equipo = $('equipo');
  if (!filas.length) {
    equipo.innerHTML =
      '<div class="vacio">' +
      ($('filtro').value.trim()
        ? 'Ningún Pokémon tiene ese nombre.'
        : 'Tu PC está vacía.<br>Buscá un Pokémon, ponele un nombre y guardalo.<br><br><button class="boton" data-accion="ejemplos">Cargar 3 de ejemplo</button>') +
      '</div>';
    return;
  }

  equipo.innerHTML = filas
    .map((fila) => {
      const datos = datosDe(fila.pokemon_number);
      const clase = fila.id === nuevoId ? 'pokemon nuevo' : entrada ? 'pokemon entra' : 'pokemon';
      const nombre = escapar(fila.pokemon_name);

      let titulo = '<h3>' + nombre + '</h3>';
      let botones =
        '<div class="botones">' +
        '<button class="boton chico" data-accion="editar" data-id="' + fila.id + '">Cambiar nombre</button>' +
        '<button class="boton chico" data-accion="preguntar" data-id="' + fila.id + '">Liberar</button>' +
        '</div>';

      if (editando === fila.id) {
        titulo = '';
        botones =
          '<form data-accion="guardar-cambio" data-id="' + fila.id + '">' +
          '<input name="nombre" maxlength="20" autocomplete="off" aria-label="Nombre nuevo" value="' + nombre + '" />' +
          '<button class="boton chico principal" type="submit">Guardar cambio</button>' +
          '<button class="boton chico" type="button" data-accion="cancelar">Cancelar</button>' +
          '</form>';
      } else if (liberando === fila.id) {
        botones =
          '<p class="pregunta">¿Liberar a ' + nombre + '?</p>' +
          '<div class="botones">' +
          '<button class="boton chico peligro" data-accion="liberar" data-id="' + fila.id + '">Sí, liberar</button>' +
          '<button class="boton chico" data-accion="cancelar">No</button>' +
          '</div>';
      }

      return (
        '<article class="' + clase + '" style="--color:' + datos.color + '" data-id="' + fila.id + '">' +
        '<img src="' + imagenDe(fila.pokemon_number) + '" alt="' + escapar(datos.especie) + '" />' +
        titulo +
        '<p class="especie">' + escapar(datos.especie) + ' · N.º ' + fila.pokemon_number + '</p>' +
        botones +
        '</article>'
      );
    })
    .join('');

  const campo = equipo.querySelector('form input');
  if (campo) {
    campo.focus();
    campo.select();
  }
}

function dibujarTabla(filas, nuevoId) {
  $('cuerpoTabla').innerHTML = filas.length
    ? filas
        .map(
          (fila) =>
            '<tr' + (fila.id === nuevoId ? ' class="fila-nueva"' : '') + '>' +
            '<td>' + fila.id + '</td><td>' + fila.pokemon_number + '</td><td>' + escapar(fila.pokemon_name) + '</td></tr>'
        )
        .join('')
    : '<tr><td colspan="3" class="tabla-vacia">(la tabla está vacía: 0 filas)</td></tr>';
}

async function redibujar({ explicarLectura = false, nuevoId = null, entrada = false } = {}) {
  const miDibujo = ++numeroDeDibujo;
  const filas = leerEquipo(explicarLectura);
  const todas = consultar('SELECT id, pokemon_number, pokemon_name FROM pokemon_guardados ORDER BY id');

  await Promise.all(filas.map((fila) => traerDatos(fila.pokemon_number).catch(() => null)));
  if (miDibujo !== numeroDeDibujo) {
    return;
  }

  $('cantidadPokemon').textContent = $('filtro').value.trim() ? filas.length + ' de ' + todas.length : String(todas.length);
  dibujarEquipo(filas, nuevoId, entrada);
  dibujarTabla(todas, nuevoId);
}

// ---------- Buscar y guardar ----------

function mostrarVistaPrevia(datos) {
  const tipos = datos.tipos
    .map((tipo) => '<span class="tipo" style="--color:' + coloresDeTipo[tipo] + '">' + tiposEnEspanol[tipo] + '</span>')
    .join('');
  $('vistaPrevia').className = 'vista-previa';
  $('vistaPrevia').innerHTML =
    '<img src="' + imagenDe(datos.numero) + '" alt="' + escapar(datos.especie) + '" />' +
    '<div><h3>' + escapar(datos.especie) + '</h3><p>N.º ' + datos.numero + '</p><div class="etiquetas">' + tipos + '</div></div>';
  document.body.style.setProperty('--acento', datos.color);
}

function ponerVistaPreviaVacia(texto) {
  pokemonEnVista = null;
  $('vistaPrevia').className = 'vista-previa vacia';
  $('vistaPrevia').textContent = texto;
  $('apodo').disabled = true;
  $('botonGuardar').disabled = true;
}

async function buscarPokemon(consulta) {
  const texto = String(consulta).trim().toLowerCase();
  if (!texto) {
    return;
  }
  mostrarMensaje('');
  ponerVistaPreviaVacia('Buscando...');

  try {
    const pokemon = await pedir(API + 'pokemon/' + encodeURIComponent(texto));
    if (pokemon.id > ULTIMO_NUMERO) {
      throw new Error('Número fuera de la Pokédex');
    }
    pokemonEnVista = await traerDatos(pokemon.id, pokemon);
    mostrarVistaPrevia(pokemonEnVista);
    $('apodo').disabled = false;
    $('botonGuardar').disabled = false;
    $('apodo').focus();
  } catch (error) {
    ponerVistaPreviaVacia('No encontré «' + texto + '». Probá con un número del 1 al ' + ULTIMO_NUMERO + ' o con un nombre en inglés.');
  }
}

async function guardarPokemon() {
  const apodo = $('apodo').value.trim();
  if (!apodo) {
    mostrarMensaje('Ponele un nombre a tu ' + pokemonEnVista.especie + ' antes de guardarlo.');
    $('apodo').focus();
    return;
  }

  const id = insertar(pokemonEnVista.numero, apodo);
  await guardarBase();
  $('apodo').value = '';
  mostrarMensaje('¡Guardado! Si querés, ponele otro nombre y guardá otro ' + pokemonEnVista.especie + '.', true);
  $('filtro').value = '';
  await redibujar({ nuevoId: id });
}

// ---------- Acciones de las tarjetas ----------

async function cambiarNombre(id, nombreNuevo) {
  const nombre = nombreNuevo.trim();
  if (!nombre) {
    return;
  }
  const fila = consultar('SELECT pokemon_number, pokemon_name FROM pokemon_guardados WHERE id = ?', [id])[0];
  actualizar(id, fila.pokemon_number, fila.pokemon_name, nombre);
  await guardarBase();
  editando = null;
  await redibujar({ nuevoId: id });
}

async function liberarPokemon(id) {
  const fila = consultar('SELECT pokemon_number, pokemon_name FROM pokemon_guardados WHERE id = ?', [id])[0];
  liberar(id, fila.pokemon_number, fila.pokemon_name);
  await guardarBase();
  liberando = null;

  const tarjeta = document.querySelector('.pokemon[data-id="' + id + '"]');
  if (tarjeta) {
    tarjeta.classList.add('sale');
    await esperar(450);
  }
  await redibujar();
}

async function cargarEjemplos() {
  ejemplos.forEach((ejemplo) => insertar(ejemplo.numero, ejemplo.nombre, false));
  const ultimo = ejemplos[ejemplos.length - 1];
  const sql = rellenar('INSERT INTO pokemon_guardados (pokemon_number, pokemon_name)\nVALUES (?, ?);', [ultimo.numero, ultimo.nombre]);
  explicar('INSERT', sql, [
    'Hice <b>' + ejemplos.length + ' <code>INSERT</code></b> seguidos, uno por cada Pokémon de ejemplo. Acá ves el último.',
    'Cada <code>INSERT</code> agrega una fila. Mirá la tabla de abajo: ahora tiene ' + ejemplos.length + '.',
  ]);
  await Promise.all(ejemplos.map((ejemplo) => traerDatos(ejemplo.numero).catch(() => null)));
  await guardarBase();
  await redibujar({ entrada: true });
}

const acciones = {
  editar: async (boton) => {
    editando = Number(boton.dataset.id);
    liberando = null;
    await redibujar();
  },
  preguntar: async (boton) => {
    liberando = Number(boton.dataset.id);
    editando = null;
    await redibujar();
  },
  cancelar: async () => {
    editando = null;
    liberando = null;
    await redibujar();
  },
  liberar: (boton) => liberarPokemon(Number(boton.dataset.id)),
  ejemplos: cargarEjemplos,
};

// ---------- Eventos ----------

document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-accion]');
  if (boton && acciones[boton.dataset.accion]) {
    acciones[boton.dataset.accion](boton);
  }
});

$('equipo').addEventListener('submit', (evento) => {
  const formulario = evento.target.closest('form[data-accion="guardar-cambio"]');
  if (formulario) {
    evento.preventDefault();
    cambiarNombre(Number(formulario.dataset.id), formulario.elements.nombre.value);
  }
});

$('formularioBuscar').addEventListener('submit', (evento) => {
  evento.preventDefault();
  buscarPokemon($('busqueda').value);
});

$('botonAzar').addEventListener('click', () => {
  const numero = Math.floor(Math.random() * ULTIMO_NUMERO) + 1;
  $('busqueda').value = numero;
  buscarPokemon(numero);
});

$('formularioGuardar').addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (pokemonEnVista) {
    guardarPokemon();
  }
});

$('filtro').addEventListener('input', () => {
  clearTimeout(temporizadorFiltro);
  temporizadorFiltro = setTimeout(() => redibujar({ explicarLectura: true }), 250);
});

$('botonLiberarTodos').addEventListener('click', async (evento) => {
  const boton = evento.currentTarget;
  if (!boton.classList.contains('peligro')) {
    boton.classList.add('peligro');
    boton.textContent = '¿Seguro? Tocá de nuevo';
    temporizadorLiberarTodos = setTimeout(() => {
      boton.classList.remove('peligro');
      boton.textContent = 'Liberar a todos';
    }, 3000);
    return;
  }
  clearTimeout(temporizadorLiberarTodos);
  boton.classList.remove('peligro');
  boton.textContent = 'Liberar a todos';
  liberarTodos();
  await guardarBase();
  $('filtro').value = '';
  editando = null;
  liberando = null;
  await redibujar();
});

$('botonDescargar').addEventListener('click', () => {
  const archivo = new Blob([db.export()], { type: 'application/x-sqlite3' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(archivo);
  enlace.download = 'mis-pokemon.sqlite';
  enlace.click();
  URL.revokeObjectURL(enlace.href);
});

// ---------- Arranque ----------

async function iniciar() {
  if (typeof initSqlJs === 'undefined') {
    $('consola').textContent = 'No pude cargar SQLite. Revisá que tengas internet y apretá F5.';
    return;
  }

  const SQL = await initSqlJs({ locateFile: (archivo) => CARPETA_SQLJS + archivo });
  const guardada = await leerBaseGuardada().catch(() => null);

  if (guardada) {
    db = new SQL.Database(guardada);
    await redibujar({ explicarLectura: true, entrada: true });
    return;
  }

  db = new SQL.Database();
  crearTabla();
  ejemplos.forEach((ejemplo) => insertar(ejemplo.numero, ejemplo.nombre, false));
  await guardarBase();
  await redibujar({ entrada: true });
  explicarCrearTabla();
}

iniciar();
