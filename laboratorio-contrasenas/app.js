const LIMITE_FUERZA_BRUTA_MS = 6000;
const INTENTOS_POR_SEGUNDO_INTERNET = 10;
const INTENTOS_POR_SEGUNDO_PLACA = 10_000_000_000;

const LETRAS_MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
const LETRAS_MAYUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMEROS = '0123456789';
const SIMBOLOS = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

const diccionario = [
  '123456', 'password', '12345678', 'qwerty', '123456789', '12345', '1234', '111111', '1234567', 'dragon',
  '123123', 'baseball', 'abc123', 'football', 'monkey', 'letmein', 'shadow', 'master', '666666', 'qwertyuiop',
  '123321', 'mustang', '1234567890', 'michael', '654321', 'superman', '1qaz2wsx', '7777777', '121212', '000000',
  'qazwsx', '123qwe', 'killer', 'trustno1', 'jordan', 'jennifer', 'zxcvbnm', 'asdfgh', 'hunter', 'buster',
  'soccer', 'harley', 'batman', 'andrew', 'tigger', 'sunshine', 'iloveyou', 'charlie', 'robert', 'thomas',
  'hockey', 'ranger', 'daniel', 'starwars', '112233', 'george', 'computer', 'michelle', 'jessica', 'pepper',
  'zxcvbn', '555555', '11111111', '131313', 'freedom', '777777', 'maggie', '159753', 'aaaaaa', 'ginger',
  'princess', 'joshua', 'cheese', 'amanda', 'summer', 'love', 'ashley', 'nicole', 'chelsea', 'biteme',
  'matthew', 'access', 'yankees', '987654321', 'dallas', 'austin', 'thunder', 'taylor', 'matrix', 'minecraft',
  'roblox', 'pikachu', 'pokemon', 'charizard', 'messi', 'messi10', 'boca', 'river', 'bocajuniors', 'riverplate',
  'argentina', 'contraseña', 'contrasena', 'clave', 'hola', 'hola123', 'admin', 'administrador', 'tequiero',
  'mama', 'papa', 'amigos', 'fortnite', 'freefire', 'barcelona', 'realmadrid', 'cristiano', 'ronaldo', 'neymar',
  'gatito', 'perro', 'pelota', 'futbol', 'familia', 'sofia', 'valentina', 'mateo', 'santiago', 'lucas',
  'agustin', 'nicolas', '12341234', 'qwerty123', 'welcome', 'login', 'a1b2c3', 'luna', 'estrella', 'princesa',
];

const sufijos = ['', '1', '12', '123', '1234', '2024', '2025', '!', '10', '69', '99'];

const ejemplos = ['123456', 'pikachu', 'Pikachu2024', 'abc12', 'zq8vrt', 'Tr0ub4dor&3', 'caballo bateria grapa correcta'];

const codigos = {
  diccionario: [
    'function atacarConDiccionario(clave) {',
    '  let intentos = 0;',
    '  for (const palabra of diccionario) {    // una palabra a la vez',
    '    for (const variante of variantes(palabra)) {',
    '      intentos = intentos + 1;',
    '      if (variante === clave) {   // ¿es la contraseña?',
    '        return intentos;          // ¡crackeada!',
    '      }',
    '    }',
    '  }',
    '  return null;   // no estaba',
    '}',
  ],
  'fuerza-bruta': [
    'function atacarConFuerzaBruta(clave, letras) {',
    '  let intentos = 0;',
    '  for (let largo = 1; largo <= clave.length; largo++) {',
    '    for (const intento of combinaciones(letras, largo)) {',
    '      intentos = intentos + 1;',
    '      if (intento === clave) {   // ¿es la contraseña?',
    '        return intentos;         // ¡crackeada!',
    '      }',
    '    }',
    '  }',
    '}',
  ],
};

const $ = (id) => document.getElementById(id);

let idDeAtaque = 0;
let marcoDeAnimacion = 0;
let pestanaDeCodigo = 'diccionario';
let listaDelDiccionario = null;

// ---------- Utilidades ----------

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (letra) => '&#' + letra.charCodeAt(0) + ';');
}

function esperar(milisegundos) {
  return new Promise((resolver) => setTimeout(resolver, milisegundos));
}

function numero(valor) {
  return valor.toLocaleString('es-AR', { maximumFractionDigits: 1 });
}

function plural(cantidad, singular, pluralizado) {
  return numero(cantidad) + ' ' + (cantidad === 1 ? singular : pluralizado);
}

function formatearDuracion(segundos) {
  if (segundos < 1) return 'menos de 1 segundo';
  if (segundos < 60) return plural(Math.round(segundos), 'segundo', 'segundos');
  if (segundos < 3600) return plural(Math.round(segundos / 60), 'minuto', 'minutos');
  if (segundos < 86400) return plural(Math.round(segundos / 3600), 'hora', 'horas');
  if (segundos < 31_557_600) return plural(Math.round(segundos / 86400), 'día', 'días');

  const anios = segundos / 31_557_600;
  let texto;
  if (anios < 1000) texto = plural(Math.round(anios), 'año', 'años');
  else if (anios < 1e6) texto = numero(Math.round(anios / 1000)) + ' mil años';
  else if (anios < 1e9) texto = numero(Math.round(anios / 1e6)) + ' millones de años';
  else if (anios < 1e12) texto = numero(Math.round(anios / 1e9)) + ' mil millones de años';
  else if (anios < 1e15) texto = numero(Math.round(anios / 1e12)) + ' billones de años';
  else texto = 'más de 1.000 billones de años';

  return anios > 1.38e10 ? texto + ' (más que la edad del universo)' : texto;
}

function formatearVelocidad(intentosPorSegundo) {
  if (intentosPorSegundo >= 1e6) return numero(intentosPorSegundo / 1e6) + ' millones/s';
  return numero(Math.round(intentosPorSegundo)) + '/s';
}

// ---------- Análisis de la contraseña ----------

function analizar(clave) {
  const caracteres = [...clave];
  const tipos = {
    minusculas: /[a-z]/.test(clave),
    mayusculas: /[A-Z]/.test(clave),
    numeros: /[0-9]/.test(clave),
    simbolos: /[ -\/:-@\[-`{-~]/.test(clave),
    otros: /[^\x20-\x7e]/.test(clave),
  };

  let alfabeto = '';
  if (tipos.minusculas) alfabeto += LETRAS_MINUSCULAS;
  if (tipos.mayusculas) alfabeto += LETRAS_MAYUSCULAS;
  if (tipos.numeros) alfabeto += NUMEROS;
  if (tipos.simbolos) alfabeto += SIMBOLOS;
  if (tipos.otros) {
    const raros = new Set(caracteres.filter((caracter) => /[^\x20-\x7e]/.test(caracter)));
    alfabeto += [...raros].join('');
  }

  const base = [...alfabeto].length;
  const largo = caracteres.length;
  const combinaciones = Math.pow(base, largo);
  const antesDeEsteLargo = base === 1 ? largo - 1 : (Math.pow(base, largo) - base) / (base - 1);
  const intentosEnDiccionario = posicionEnDiccionario(clave);

  return { caracteres, tipos, alfabeto, base, largo, combinaciones, antesDeEsteLargo, intentosEnDiccionario };
}

function posicionDeLaClaveEnFuerzaBruta(analisis) {
  const letras = [...analisis.alfabeto];
  let valor = 0;
  for (const caracter of analisis.caracteres) {
    valor = valor * analisis.base + letras.indexOf(caracter);
  }
  return analisis.antesDeEsteLargo + valor + 1;
}

function construirDiccionario() {
  if (listaDelDiccionario) {
    return listaDelDiccionario;
  }
  listaDelDiccionario = [];
  for (const palabra of diccionario) {
    const capitalizada = palabra.charAt(0).toUpperCase() + palabra.slice(1);
    const disfrazada = palabra.replace(/a/g, '4').replace(/e/g, '3').replace(/i/g, '1').replace(/o/g, '0').replace(/s/g, '5');
    const variantes = new Set();
    for (const forma of [palabra, capitalizada, disfrazada]) {
      for (const sufijo of sufijos) {
        variantes.add(forma + sufijo);
      }
    }
    for (const variante of variantes) {
      listaDelDiccionario.push({ palabra, variante });
    }
  }
  return listaDelDiccionario;
}

function posicionEnDiccionario(clave) {
  const posicion = construirDiccionario().findIndex((item) => item.variante === clave);
  return posicion === -1 ? null : posicion + 1;
}

const veredictos = [
  { hasta: 1, texto: 'Pésima', color: '#ff4d4d' },
  { hasta: 3600, texto: 'Muy débil', color: '#ff8a3d' },
  { hasta: 31_557_600, texto: 'Débil', color: '#f7d02c' },
  { hasta: 31_557_600 * 100, texto: 'Aceptable', color: '#b6e63c' },
  { hasta: 31_557_600 * 1e6, texto: 'Fuerte', color: '#3dff7a' },
  { hasta: Infinity, texto: 'Excelente', color: '#3dffd0' },
];

function pintarAnalisis(clave) {
  if (!clave) {
    $('veredicto').textContent = 'Esperando una contraseña';
    $('medidorRelleno').style.width = '0';
    document.body.style.setProperty('--acento', '#6c8cff');
    $('datoLargo').textContent = '0';
    $('datoLetras').textContent = '0';
    $('datoCombinaciones').textContent = '0';
    $('tiempoInternet').textContent = '-';
    $('tiempoPlaca').textContent = '-';
    $('notaDiccionario').textContent = '';
    document.querySelectorAll('#tipos span').forEach((etiqueta) => etiqueta.classList.remove('presente'));
    return null;
  }

  const analisis = analizar(clave);
  const intentosPromedio = analisis.combinaciones / 2;
  const intentosNecesarios = analisis.intentosEnDiccionario
    ? Math.min(intentosPromedio, analisis.intentosEnDiccionario)
    : intentosPromedio;
  const segundosInternet = intentosNecesarios / INTENTOS_POR_SEGUNDO_INTERNET;
  const segundosPlaca = intentosNecesarios / INTENTOS_POR_SEGUNDO_PLACA;
  const veredicto = veredictos.find((item) => segundosPlaca < item.hasta);

  $('veredicto').textContent = veredicto.texto;
  document.body.style.setProperty('--acento', veredicto.color);
  const porcentaje = ((Math.log10(Math.max(segundosPlaca, 1e-3)) + 3) / (Math.log10(31_557_600 * 1e6) + 3)) * 100;
  $('medidorRelleno').style.width = Math.max(4, Math.min(100, porcentaje)) + '%';

  $('datoLargo').textContent = plural(analisis.largo, 'carácter', 'caracteres');
  $('datoLetras').textContent = numero(analisis.base);
  $('datoCombinaciones').textContent = analisis.combinaciones < 1e15 ? numero(analisis.combinaciones) : analisis.combinaciones.toExponential(2).replace('e+', ' × 10^');
  $('tiempoInternet').textContent = formatearDuracion(segundosInternet);
  $('tiempoPlaca').textContent = formatearDuracion(segundosPlaca);
  $('notaDiccionario').textContent = analisis.intentosEnDiccionario
    ? 'Ojo: esta contraseña está en el diccionario de las más comunes. Un atacante la prueba en el intento número ' + numero(analisis.intentosEnDiccionario) + ', sin importar cuántas combinaciones tenga.'
    : 'No está en el diccionario de las contraseñas comunes que usa este laboratorio.';

  document.querySelectorAll('#tipos span').forEach((etiqueta) => {
    etiqueta.classList.toggle('presente', analisis.tipos[etiqueta.dataset.tipo]);
  });
  return analisis;
}

// ---------- Panel de código y variables ----------

function pintarCodigo() {
  $('codigo').innerHTML = codigos[pestanaDeCodigo]
    .map((linea, posicion) => {
      const [codigo, comentario] = linea.split('//');
      const resaltado = escapar(codigo).replace(/\b(function|for|let|const|if|return|of)\b/g, '<span class="clave">$1</span>');
      return '<span class="linea" data-linea="' + posicion + '">' + resaltado + (comentario ? '<span class="comentario">//' + escapar(comentario) + '</span>' : '') + '</span>';
    })
    .join('');

  document.querySelectorAll('[data-codigo]').forEach((boton) => {
    boton.setAttribute('aria-pressed', boton.dataset.codigo === pestanaDeCodigo);
  });
}

function resaltarLineas(...lineas) {
  document.querySelectorAll('.linea').forEach((elemento) => {
    elemento.classList.toggle('activa', lineas.includes(Number(elemento.dataset.linea)));
  });
}

function pintarVariables(filas) {
  $('variables').innerHTML = filas
    .map(([nombre, valor]) => '<tr><td>' + escapar(nombre) + '</td><td>' + escapar(valor) + '</td></tr>')
    .join('');
}

function claveEnPantalla(clave) {
  return $('botonMostrar').getAttribute('aria-pressed') === 'true' ? clave : '●'.repeat([...clave].length);
}

// ---------- Los dos ataques ----------

function crearAtaqueDeDiccionario(clave) {
  const lista = construirDiccionario();
  let posicion = 0;
  let intentos = 0;
  let encontrada = false;
  let actual = { palabra: '', variante: '' };

  return {
    total: lista.length,
    paso({ maxIntentos }) {
      for (let hecho = 0; hecho < maxIntentos && !encontrada && posicion < lista.length; hecho++) {
        actual = lista[posicion++];
        intentos++;
        encontrada = actual.variante === clave;
      }
    },
    estado() {
      return {
        intentos,
        encontrada,
        terminado: encontrada || posicion >= lista.length,
        texto: actual.variante || '_',
        variables: [
          ['intentos', numero(intentos)],
          ['palabra', JSON.stringify(actual.palabra)],
          ['variante', JSON.stringify(actual.variante)],
          ['variante === clave', String(encontrada)],
        ],
      };
    },
  };
}

function crearAtaqueDeFuerzaBruta(clave, analisis) {
  const letras = [...analisis.alfabeto];
  const base = letras.length;
  const objetivo = analisis.caracteres.map((caracter) => letras.indexOf(caracter));
  let largo = 1;
  let indices = [0];
  let intentos = 0;
  let encontrada = false;

  function coincide() {
    if (largo !== objetivo.length) {
      return false;
    }
    for (let posicion = 0; posicion < largo; posicion++) {
      if (indices[posicion] !== objetivo[posicion]) {
        return false;
      }
    }
    return true;
  }

  function avanzar() {
    let posicion = largo - 1;
    while (posicion >= 0) {
      indices[posicion]++;
      if (indices[posicion] < base) {
        return;
      }
      indices[posicion] = 0;
      posicion--;
    }
    largo++;
    indices = new Array(largo).fill(0);
  }

  return {
    total: posicionDeLaClaveEnFuerzaBruta(analisis),
    paso({ maxIntentos = Infinity, maxMs = Infinity }) {
      const inicio = performance.now();
      let hechos = 0;
      while (hechos < maxIntentos && !encontrada) {
        intentos++;
        hechos++;
        if (coincide()) {
          encontrada = true;
          break;
        }
        avanzar();
        if ((hechos & 4095) === 0 && performance.now() - inicio > maxMs) {
          break;
        }
      }
    },
    estado() {
      const intento = indices.map((indice) => letras[indice]).join('');
      return {
        intentos,
        encontrada,
        terminado: encontrada,
        texto: intento,
        variables: [
          ['intentos', numero(intentos)],
          ['largo', String(largo)],
          ['intento', JSON.stringify(intento)],
          ['intento === clave', String(encontrada)],
        ],
      };
    },
  };
}

function pintarAtaque(ataque, inicio) {
  const estado = ataque.estado();
  const segundos = (performance.now() - inicio) / 1000;

  $('intentoGrande').textContent = estado.texto;
  $('statIntentos').textContent = numero(estado.intentos);
  $('statVelocidad').textContent = segundos > 0.05 ? formatearVelocidad(estado.intentos / segundos) : '-';
  $('statTiempo').textContent = numero(segundos) + ' s';
  $('progresoRelleno').style.width = Math.min(100, (estado.intentos / ataque.total) * 100) + '%';
  pintarVariables(estado.variables);

  const registro = $('registro');
  const linea = document.createElement('li');
  linea.textContent = estado.texto;
  registro.append(linea);
  while (registro.children.length > 6) {
    registro.firstElementChild.remove();
  }
  return { estado, segundos };
}

function mostrarResultado(parrafos, clase) {
  const resultado = $('resultado');
  resultado.className = 'resultado ' + clase;
  resultado.innerHTML = parrafos.map((texto) => '<p>' + texto + '</p>').join('');
}

function terminarAtaque(tipo, ataque, analisis, estado, segundos, seCortoPorTiempo) {
  const intentosPorSegundo = estado.intentos / Math.max(segundos, 0.001);
  const intentosNecesarios = ataque.total;

  if (tipo === 'diccionario') {
    mostrarResultado(
      estado.encontrada
        ? [
            '¡Crackeada! Estaba en el diccionario: la encontré en el intento número <b>' + numero(estado.intentos) + '</b>.',
            'Tardé ' + numero(segundos) + ' s. Un atacante de verdad la prueba en un parpadeo. Moraleja: una palabra conocida con un número atrás no es una contraseña.',
          ]
        : [
            'No estaba en el diccionario: probé <b>' + numero(estado.intentos) + '</b> variantes y no apareció.',
            'Eso <b>no</b> quiere decir que sea fuerte. Falta probar con fuerza bruta, que no necesita adivinar palabras.',
          ],
      estado.encontrada ? 'cracked' : 'sobrevivio'
    );
  } else if (estado.encontrada) {
    mostrarResultado(
      [
        '¡Crackeada por fuerza bruta en <b>' + numero(estado.intentos) + '</b> intentos! Tardé ' + numero(segundos) + ' s en tu compu.',
        'Con una placa de video habría tardado ' + formatearDuracion(estado.intentos / INTENTOS_POR_SEGUNDO_PLACA) + '.',
      ],
      'cracked'
    );
  } else if (seCortoPorTiempo) {
    const restantes = intentosNecesarios - estado.intentos;
    mostrarResultado(
      [
        'Paré a los ' + numero(LIMITE_FUERZA_BRUTA_MS / 1000) + ' segundos: probé <b>' + numero(estado.intentos) + '</b> de los <b>' + numero(Math.round(intentosNecesarios)) + '</b> intentos que hacían falta. Y no la encontré.',
        'A esta velocidad (' + formatearVelocidad(intentosPorSegundo) + ') tu compu tardaría ' + formatearDuracion(restantes / intentosPorSegundo) + ' más. Con una placa de video, ' + formatearDuracion(restantes / INTENTOS_POR_SEGUNDO_PLACA) + '.',
      ],
      'sobrevivio'
    );
  }
  detenerAtaque(false);
  if (estado.encontrada) {
    resaltarLineas(6);
  }
}

function bloquearBotones(atacando) {
  const hayClave = $('clave').value.length > 0;
  $('botonDiccionario').disabled = atacando || !hayClave;
  $('botonFuerzaBruta').disabled = atacando || !hayClave;
  $('botonParar').disabled = !atacando;
}

function detenerAtaque(limpiarPantalla) {
  idDeAtaque++;
  cancelAnimationFrame(marcoDeAnimacion);
  bloquearBotones(false);
  resaltarLineas();
  if (limpiarPantalla) {
    $('resultado').className = 'resultado';
    $('resultado').innerHTML = '';
    $('intentoGrande').textContent = '_';
    $('registro').innerHTML = '';
    $('progresoRelleno').style.width = '0';
    $('statIntentos').textContent = '0';
    $('statVelocidad').textContent = '-';
    $('statTiempo').textContent = '0 s';
    pintarVariables([]);
  }
}

function iniciarAtaque(tipo) {
  const clave = $('clave').value;
  if (!clave) {
    return;
  }
  detenerAtaque(true);
  const miId = idDeAtaque;
  const analisis = analizar(clave);
  const ataque = tipo === 'diccionario' ? crearAtaqueDeDiccionario(clave) : crearAtaqueDeFuerzaBruta(clave, analisis);
  const inicio = performance.now();

  pestanaDeCodigo = tipo;
  pintarCodigo();
  bloquearBotones(true);

  if ($('camaraLenta').checked) {
    correrEnCamaraLenta(tipo, ataque, analisis, inicio, miId);
  } else {
    correrNormal(tipo, ataque, analisis, inicio, miId);
  }
}

function correrNormal(tipo, ataque, analisis, inicio, miId) {
  function cuadro() {
    if (miId !== idDeAtaque) {
      return;
    }
    ataque.paso(tipo === 'diccionario' ? { maxIntentos: 25 } : { maxMs: 12 });
    const { estado, segundos } = pintarAtaque(ataque, inicio);
    resaltarLineas(estado.encontrada ? 6 : 5);

    const sePasoDelTiempo = tipo === 'fuerza-bruta' && performance.now() - inicio >= LIMITE_FUERZA_BRUTA_MS;
    if (estado.terminado || sePasoDelTiempo) {
      terminarAtaque(tipo, ataque, analisis, estado, segundos, sePasoDelTiempo && !estado.encontrada);
      return;
    }
    marcoDeAnimacion = requestAnimationFrame(cuadro);
  }
  marcoDeAnimacion = requestAnimationFrame(cuadro);
}

async function correrEnCamaraLenta(tipo, ataque, analisis, inicio, miId) {
  const pausa = tipo === 'diccionario' ? 420 : 160;
  while (miId === idDeAtaque) {
    resaltarLineas(2);
    await esperar(pausa / 3);
    resaltarLineas(3);
    await esperar(pausa / 3);
    if (miId !== idDeAtaque) {
      return;
    }
    ataque.paso({ maxIntentos: 1 });
    const { estado, segundos } = pintarAtaque(ataque, inicio);
    resaltarLineas(4, 5);
    await esperar(pausa / 3);
    if (estado.encontrada) {
      resaltarLineas(6);
    }
    if (estado.terminado) {
      terminarAtaque(tipo, ataque, analisis, estado, segundos, false);
      return;
    }
  }
}

// ---------- Eventos ----------

function alCambiarLaClave() {
  detenerAtaque(true);
  pintarAnalisis($('clave').value);
  bloquearBotones(false);
}

$('clave').addEventListener('input', alCambiarLaClave);

$('botonMostrar').addEventListener('click', (evento) => {
  const boton = evento.currentTarget;
  const visible = boton.getAttribute('aria-pressed') === 'true';
  boton.setAttribute('aria-pressed', String(!visible));
  boton.textContent = visible ? 'Mostrar' : 'Ocultar';
  $('clave').type = visible ? 'password' : 'text';
});

$('botonParar').addEventListener('click', () => {
  detenerAtaque(false);
  mostrarResultado(['Frené el ataque. Podés volver a empezar cuando quieras.'], '');
});

document.querySelectorAll('[data-ataque]').forEach((boton) => {
  boton.addEventListener('click', () => iniciarAtaque(boton.dataset.ataque));
});

document.querySelectorAll('[data-codigo]').forEach((boton) => {
  boton.addEventListener('click', () => {
    pestanaDeCodigo = boton.dataset.codigo;
    pintarCodigo();
  });
});

$('ejemplos').innerHTML = ejemplos
  .map((ejemplo) => '<button type="button" data-ejemplo="' + escapar(ejemplo) + '">' + escapar(ejemplo) + '</button>')
  .join('');

$('ejemplos').addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-ejemplo]');
  if (boton) {
    $('clave').value = boton.dataset.ejemplo;
    alCambiarLaClave();
  }
});

pintarCodigo();
pintarAnalisis('');
bloquearBotones(false);
