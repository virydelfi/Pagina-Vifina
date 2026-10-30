const SEGUNDOS_POR_PREGUNTA = 20;
const SEGUNDOS_POR_PREGUNTA_DE_CODIGO = 30;
const PUNTOS_BASE = 100;
const PUNTOS_MAXIMOS_POR_TIEMPO = 50;
const PUNTOS_POR_RACHA = 20;
const RACHA_MAXIMA_CON_PUNTOS = 5;
const CLAVE_GUARDADO = 'quiz-de-programar';

const temas = {
  git: { nombre: 'Git y GitHub', color: '#f05133' },
  html: { nombre: 'HTML', color: '#ff8a3d' },
  css: { nombre: 'CSS', color: '#4d8dff' },
  js: { nombre: 'JavaScript', color: '#f7df1e' },
  codigo: { nombre: '¿Qué muestra?', color: '#7be0a5' },
  datos: { nombre: 'APIs y bases de datos', color: '#ff7ab8' },
  seguridad: { nombre: 'Seguridad', color: '#3dffd0' },
};

const niveles = [
  { desde: 90, nombre: 'Hacker legendario' },
  { desde: 75, nombre: 'Dev senior' },
  { desde: 55, nombre: 'Dev junior' },
  { desde: 35, nombre: 'Aprendiz' },
  { desde: 0, nombre: 'Recién llegado' },
];

const $ = (id) => document.getElementById(id);

let temasElegidos = new Set(Object.keys(temas));
let cantidadElegida = 10;
let partida = null;

// ---------- Utilidades ----------

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (letra) => '&#' + letra.charCodeAt(0) + ';');
}

// Los `trozos entre comillas invertidas` se muestran como código
function conCodigo(texto) {
  return escapar(texto).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function mezclar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function numero(valor) {
  return valor.toLocaleString('es-AR');
}

const patronDeCodigo = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|\b(\d+)\b|\b(let|const|if|else|for|true|false)\b/g;

function resaltar(codigo) {
  let resultado = '';
  let ultimo = 0;
  for (const coincidencia of codigo.matchAll(patronDeCodigo)) {
    resultado += escapar(codigo.slice(ultimo, coincidencia.index));
    const clase = coincidencia[1] ? 'texto' : coincidencia[2] ? 'numero' : 'clave';
    resultado += '<span class="' + clase + '">' + escapar(coincidencia[0]) + '</span>';
    ultimo = coincidencia.index + coincidencia[0].length;
  }
  return resultado + escapar(codigo.slice(ultimo));
}

function leerGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_GUARDADO)) || { mejores: {} };
  } catch (error) {
    return { mejores: {} };
  }
}

function escribirGuardado(datos) {
  try {
    localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(datos));
  } catch (error) {
    console.warn('No pude guardar el récord en este navegador.');
  }
}

function mostrarPantalla(nombre) {
  for (const id of ['menu', 'juego', 'resultados']) {
    $(id).hidden = id !== nombre;
  }
  window.scrollTo({ top: 0 });
}

// ---------- Menú ----------

function preguntasDisponibles() {
  return preguntas.filter((pregunta) => temasElegidos.has(pregunta.categoria));
}

function dibujarMenu() {
  const todos = temasElegidos.size === Object.keys(temas).length;
  const chips = Object.entries(temas).map(([clave, tema]) => {
    const cantidad = preguntas.filter((pregunta) => pregunta.categoria === clave).length;
    return (
      '<button type="button" class="chip" data-tema="' + clave + '" aria-pressed="' + temasElegidos.has(clave) + '" style="--color:' + tema.color + '">' +
      escapar(tema.nombre) + '<small>' + cantidad + '</small></button>'
    );
  });
  $('temas').innerHTML =
    '<button type="button" class="chip" data-tema="todos" aria-pressed="' + todos + '">Todos</button>' + chips.join('');

  document.querySelectorAll('#cantidades .chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(Number(chip.dataset.cantidad) === cantidadElegida));
  });

  const disponibles = preguntasDisponibles().length;
  $('botonJugar').disabled = disponibles === 0;
  $('botonJugar').textContent = disponibles === 0 ? 'Elegí al menos un tema' : 'Jugar';

  const mejor = leerGuardado().mejores[cantidadElegida];
  $('record').textContent = mejor ? 'Tu récord con ' + cantidadElegida + ' preguntas: ' + numero(mejor) + ' puntos' : 'Todavía no tenés récord con ' + cantidadElegida + ' preguntas. ¡Conseguilo!';
}

// ---------- Partida ----------

function iniciarPartida(lista, esRepaso = false) {
  partida = {
    preguntas: lista,
    indice: 0,
    puntaje: 0,
    racha: 0,
    mejorRacha: 0,
    respuestas: [],
    comodinUsado: false,
    tranquilo: $('modoTranquilo').checked,
    esRepaso,
    respondida: false,
    opciones: [],
    limite: 0,
    inicio: 0,
    marco: 0,
  };
  $('confeti').innerHTML = '';
  mostrarPantalla('juego');
  mostrarPregunta();
}

function mostrarPregunta() {
  const pregunta = partida.preguntas[partida.indice];
  const tema = temas[pregunta.categoria];
  partida.respondida = false;
  partida.opciones = mezclar(pregunta.opciones.map((texto, posicion) => ({ texto, esCorrecta: posicion === 0, descartada: false })));

  document.body.style.setProperty('--acento', tema.color);
  $('etiquetaTema').textContent = tema.nombre;
  $('numeroPregunta').textContent = partida.indice + 1 + '/' + partida.preguntas.length;
  $('puntaje').textContent = numero(partida.puntaje);
  $('racha').textContent = 'x' + partida.racha;
  $('botonComodin').disabled = partida.comodinUsado;
  $('textoPregunta').innerHTML = conCodigo(pregunta.texto);
  $('codigoPregunta').hidden = !pregunta.codigo;
  $('codigoPregunta').innerHTML = pregunta.codigo ? resaltar(pregunta.codigo) : '';
  $('devolucion').hidden = true;

  $('opciones').innerHTML = partida.opciones
    .map(
      (opcion, posicion) =>
        '<button type="button" class="opcion" data-posicion="' + posicion + '">' +
        '<span class="letra">' + 'ABCD'[posicion] + '</span><span>' + conCodigo(opcion.texto) + '</span></button>'
    )
    .join('');

  $('reloj').hidden = partida.tranquilo;
  if (!partida.tranquilo) {
    partida.limite = pregunta.codigo ? SEGUNDOS_POR_PREGUNTA_DE_CODIGO : SEGUNDOS_POR_PREGUNTA;
    partida.inicio = performance.now();
    correrReloj();
  }
}

function correrReloj() {
  const cuadro = () => {
    const gastado = (performance.now() - partida.inicio) / 1000;
    const restante = Math.max(0, partida.limite - gastado);
    $('relojRelleno').style.width = (restante / partida.limite) * 100 + '%';
    $('relojRelleno').classList.toggle('poco', restante <= 5);
    if (restante <= 0) {
      responder(null);
      return;
    }
    partida.marco = requestAnimationFrame(cuadro);
  };
  partida.marco = requestAnimationFrame(cuadro);
}

function usarComodin() {
  if (!partida || partida.respondida || partida.comodinUsado) {
    return;
  }
  partida.comodinUsado = true;
  $('botonComodin').disabled = true;
  const incorrectas = mezclar(partida.opciones.map((opcion, posicion) => ({ opcion, posicion })).filter((item) => !item.opcion.esCorrecta));
  for (const { opcion, posicion } of incorrectas.slice(0, 2)) {
    opcion.descartada = true;
    const boton = $('opciones').children[posicion];
    boton.classList.add('descartada');
    boton.disabled = true;
  }
}

function responder(posicion) {
  if (!partida || partida.respondida) {
    return;
  }
  partida.respondida = true;
  cancelAnimationFrame(partida.marco);
  $('botonComodin').disabled = true;

  const pregunta = partida.preguntas[partida.indice];
  const elegida = posicion === null ? null : partida.opciones[posicion];
  const acerto = Boolean(elegida && elegida.esCorrecta);
  let puntos = 0;

  if (acerto) {
    partida.racha++;
    partida.mejorRacha = Math.max(partida.mejorRacha, partida.racha);
    const fraccionDeTiempo = partida.tranquilo ? 0 : Math.max(0, 1 - (performance.now() - partida.inicio) / 1000 / partida.limite);
    puntos =
      PUNTOS_BASE +
      Math.round(PUNTOS_MAXIMOS_POR_TIEMPO * fraccionDeTiempo) +
      Math.min(partida.racha - 1, RACHA_MAXIMA_CON_PUNTOS) * PUNTOS_POR_RACHA;
    partida.puntaje += puntos;
  } else {
    partida.racha = 0;
  }
  partida.respuestas.push({ pregunta, elegida: elegida ? elegida.texto : null, acerto, puntos });

  document.querySelectorAll('.opcion').forEach((boton, indice) => {
    boton.disabled = true;
    if (partida.opciones[indice].esCorrecta) boton.classList.add('correcta');
    else if (indice === posicion) boton.classList.add('incorrecta');
  });

  const resultado = $('resultadoRespuesta');
  resultado.className = acerto ? 'bien' : 'mal';
  if (acerto) {
    resultado.textContent = '¡Correcto! +' + puntos + ' puntos' + (partida.racha >= 2 ? ' · racha x' + partida.racha : '');
  } else {
    resultado.textContent = posicion === null ? 'Se acabó el tiempo.' : 'Incorrecto.';
  }
  $('explicacion').innerHTML = conCodigo(pregunta.explicacion);
  $('botonSiguiente').textContent = partida.indice + 1 === partida.preguntas.length ? 'Ver resultados' : 'Siguiente';
  $('devolucion').hidden = false;
  $('puntaje').textContent = numero(partida.puntaje);
  $('racha').textContent = 'x' + partida.racha;
  $('botonSiguiente').focus();
}

function siguiente() {
  if (!partida || !partida.respondida) {
    return;
  }
  if (partida.indice + 1 === partida.preguntas.length) {
    terminar();
    return;
  }
  partida.indice++;
  mostrarPregunta();
}

// ---------- Resultados ----------

function lanzarConfeti() {
  const colores = ['#ff7ab8', '#ffd166', '#3dffd0', '#a66bff', '#ff8a3d', '#4d8dff'];
  $('confeti').innerHTML = Array.from({ length: 70 }, () => {
    const estilo = [
      '--x:' + Math.random() * 100 + '%',
      '--c:' + colores[Math.floor(Math.random() * colores.length)],
      '--t:' + (2.5 + Math.random() * 2) + 's',
      '--d:' + Math.random() * 0.8 + 's',
      '--dx:' + (Math.random() * 200 - 100) + 'px',
    ].join(';');
    return '<span style="' + estilo + '"></span>';
  }).join('');
  setTimeout(() => {
    $('confeti').innerHTML = '';
  }, 6000);
}

function terminar() {
  const total = partida.respuestas.length;
  const aciertos = partida.respuestas.filter((respuesta) => respuesta.acerto).length;
  const porcentaje = Math.round((aciertos / total) * 100);
  const nivel = niveles.find((item) => porcentaje >= item.desde);

  const guardado = leerGuardado();
  const anterior = guardado.mejores[total] || 0;
  const esRecord = !partida.esRepaso && partida.puntaje > anterior;
  if (esRecord) {
    guardado.mejores[total] = partida.puntaje;
    escribirGuardado(guardado);
  }

  $('nivel').textContent = nivel.nombre;
  $('puntosFinales').textContent = numero(partida.puntaje);
  $('detalleResumen').textContent = 'Acertaste ' + aciertos + ' de ' + total + ' (' + porcentaje + ' %) · Mejor racha: ' + partida.mejorRacha;
  $('nuevoRecord').hidden = !esRecord;

  const porTema = {};
  for (const respuesta of partida.respuestas) {
    const tema = porTema[respuesta.pregunta.categoria] || { aciertos: 0, total: 0 };
    tema.total++;
    if (respuesta.acerto) tema.aciertos++;
    porTema[respuesta.pregunta.categoria] = tema;
  }
  $('barrasTemas').innerHTML = Object.entries(porTema)
    .map(([clave, tema]) => {
      const valor = Math.round((tema.aciertos / tema.total) * 100);
      return (
        '<div class="barra-tema" style="--color:' + temas[clave].color + '">' +
        '<span>' + escapar(temas[clave].nombre) + '</span>' +
        '<div class="pista"><div class="relleno" style="--valor:' + valor + '"></div></div>' +
        '<strong>' + tema.aciertos + '/' + tema.total + '</strong></div>'
      );
    })
    .join('');

  const falladas = partida.respuestas.filter((respuesta) => !respuesta.acerto);
  $('repaso').innerHTML = falladas.length
    ? '<h3>Para repasar (' + falladas.length + ')</h3>' +
      falladas
        .map(
          (respuesta) =>
            '<div class="fallada"><p><b>' + conCodigo(respuesta.pregunta.texto) + '</b></p>' +
            (respuesta.pregunta.codigo ? '<pre class="codigo">' + resaltar(respuesta.pregunta.codigo) + '</pre>' : '') +
            '<p class="tu">Tu respuesta: ' + (respuesta.elegida === null ? 'sin responder (se acabó el tiempo)' : conCodigo(respuesta.elegida)) + '</p>' +
            '<p class="sol">Correcta: ' + conCodigo(respuesta.pregunta.opciones[0]) + '</p>' +
            '<p class="exp">' + conCodigo(respuesta.pregunta.explicacion) + '</p></div>'
        )
        .join('')
    : '<h3>¡No fallaste ninguna!</h3>';
  $('botonRepasar').hidden = falladas.length === 0;
  partida.falladas = falladas.map((respuesta) => respuesta.pregunta);

  document.body.style.setProperty('--acento', porcentaje >= 55 ? '#3dff7a' : '#ff8a3d');
  mostrarPantalla('resultados');
  if (porcentaje >= 75) {
    lanzarConfeti();
  }
}

// ---------- Eventos ----------

$('temas').addEventListener('click', (evento) => {
  const chip = evento.target.closest('[data-tema]');
  if (!chip) {
    return;
  }
  const claves = Object.keys(temas);
  if (chip.dataset.tema === 'todos') {
    temasElegidos = temasElegidos.size === claves.length ? new Set() : new Set(claves);
  } else if (temasElegidos.has(chip.dataset.tema)) {
    temasElegidos.delete(chip.dataset.tema);
  } else {
    temasElegidos.add(chip.dataset.tema);
  }
  dibujarMenu();
});

$('cantidades').addEventListener('click', (evento) => {
  const chip = evento.target.closest('[data-cantidad]');
  if (chip) {
    cantidadElegida = Number(chip.dataset.cantidad);
    dibujarMenu();
  }
});

function jugarConLosTemasElegidos() {
  const lista = mezclar(preguntasDisponibles()).slice(0, cantidadElegida);
  if (lista.length) {
    iniciarPartida(lista);
  }
}

$('botonJugar').addEventListener('click', jugarConLosTemasElegidos);
$('botonOtraVez').addEventListener('click', jugarConLosTemasElegidos);
$('botonRepasar').addEventListener('click', () => iniciarPartida(mezclar(partida.falladas), true));
$('botonMenu').addEventListener('click', () => {
  document.body.style.setProperty('--acento', '#a66bff');
  dibujarMenu();
  mostrarPantalla('menu');
});
$('botonComodin').addEventListener('click', usarComodin);
$('botonSiguiente').addEventListener('click', siguiente);

$('opciones').addEventListener('click', (evento) => {
  const boton = evento.target.closest('.opcion');
  if (boton) {
    responder(Number(boton.dataset.posicion));
  }
});

document.addEventListener('keydown', (evento) => {
  if ($('juego').hidden || evento.metaKey || evento.ctrlKey || evento.altKey) {
    return;
  }
  const posicion = Number(evento.key) - 1;
  if (posicion >= 0 && posicion < 4 && partida && !partida.respondida && !partida.opciones[posicion].descartada) {
    responder(posicion);
  } else if (evento.key === 'Enter' && partida && partida.respondida && evento.target.tagName !== 'BUTTON') {
    siguiente();
  }
});

dibujarMenu();
