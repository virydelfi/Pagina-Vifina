# Actividad: que te avisen si tu página se cae

## Qué vamos a hacer

Tu página está publicada en internet: <https://virydelfi.github.io/Pagina-Vifina/>. Pero ¿cómo te enterás si un día **deja de funcionar**? Si nadie la mira, nadie se entera.

Hoy vas a registrarte en un servicio que **entra a tu página cada pocos minutos** y, si no responde, **te manda un mail**.

```
UptimeRobot  ── «¿estás ahí?» cada 5 minutos ──▶  tu página
     │
     └── si no contesta bien ──▶ mail a pasantes@balanzashook.com.ar
```

**No hay código en esta actividad.** Es una tarea de configuración, y es exactamente lo que hace un equipo de sistemas con los servicios de una empresa.

## Diferencia con la actividad del hombre muerto

Fijate en el sentido de la flecha, que es lo que cambia:

| | Hombre muerto | UptimeRobot |
| --- | --- | --- |
| **Quién empieza** | Tu proyecto avisa «sigo vivo» | El servicio va a preguntar «¿estás vivo?» |
| **Sirve para** | Tareas que corren solas, sin página | Páginas y servicios que alguien visita |
| **Si algo se rompe** | Deja de llegar el aviso | La respuesta es un error o no llega |

Los equipos serios usan las dos.

## Paso a paso

### 1. Registrate en UptimeRobot

1. Entrá a [uptimerobot.com](https://uptimerobot.com) y creá una cuenta gratis con tu mail.
2. Confirmá el mail que te manda UptimeRobot.

### 2. Creá un monitor

Un *monitor* es una vigilancia sobre una dirección. Apretá **Add New Monitor** (o **+ New monitor**) y completá:

| Campo | Valor |
| --- | --- |
| **Monitor Type** | `HTTP(s)` |
| **Friendly Name** | `Pagina-Vifina` |
| **URL** | `https://virydelfi.github.io/Pagina-Vifina/` |
| **Monitoring Interval** | `5 minutes` (es lo más frecuente que permite el plan gratis) |

### 3. Configurá el aviso por mail

En el mismo formulario, en **Alert Contacts** (o **Notify**), agregá un contacto nuevo de tipo **E-mail** con esta dirección:

```
pasantes@balanzashook.com.ar
```

UptimeRobot manda un mail de **confirmación** a esa dirección. Hasta que alguien aprete el link, el contacto no funciona. Abrí ese buzón y confirmalo. Después marcá ese contacto en el monitor y guardá.

Si la interfaz cambió de lugar algún botón, no importa: buscá «crear monitor», «HTTP», «URL» y «alertas por mail».

## Probá esto

1. **Mirá el estado.** Pasados unos minutos, el monitor aparece en verde con el tiempo de respuesta. Anotá cuántos milisegundos tarda tu página.
2. **Provocá una caída falsa, sin romper nada.** Creá un **segundo monitor** con la URL `https://virydelfi.github.io/Pagina-Vifina/esta-pagina-no-existe`. Esa dirección da error 404. En 5 minutos el monitor se pone en rojo (*Down*) y tiene que llegar el mail.
3. **Leé el mail.** Fijate qué datos trae: qué monitor, desde cuándo, cuál fue el error.
4. **Mirá el 404 vos mismo.** Abrí esa URL en el navegador. Es la misma respuesta que vio UptimeRobot.
5. **Borrá el monitor de prueba**, para que no siga mandando mails.

## Cosas para pensar

- **¿Qué pasa si el monitor vigila `index.html` y alguien rompe la sección del quiz?** La página principal sigue respondiendo bien y UptimeRobot dice «todo OK». Un monitor solo detecta lo que mira. ¿Qué otras direcciones convendría vigilar?
- **¿Por qué el mail va a un buzón compartido (`pasantes@…`) y no al de una sola persona?** Pensá qué pasa si esa persona está de vacaciones el día que se cae.
- **¿Cuánto tardás en enterarte de una caída?** Con un intervalo de 5 minutos, hasta 5 minutos después. ¿Cuándo valdría la pena pagar para que sea cada 1 minuto?

## Cambios chiquitos (opcionales)

1. **Vigilar otra página.** Agregá un monitor para `…/juego-preguntas/` o para `…/equipo-pokemon/`.
2. **Una página de estado pública.** UptimeRobot permite crear una página que muestra si todo anda. Probala con tus monitores.
3. **Avisar por Telegram.** Agregá Telegram como contacto de alerta, así te llega al celular.
