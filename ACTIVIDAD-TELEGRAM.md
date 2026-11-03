# Actividad: que GitHub te avise por Telegram cuando llega un Pull Request

## Qué vamos a hacer

Cada vez que alguien abra un Pull Request en este repositorio, o que entre un commit nuevo a `main` (por ejemplo, al mergear un Pull Request), **te llega un mensaje a Telegram** con el título, quién lo hizo y el link.

Lo importante de esta actividad **no es el código**, es entender el **workflow**: GitHub puede ejecutar cosas solo, cuando pasa algo en tu repositorio. Hoy es un aviso. Mañana puede ser correr tests, publicar la página o revisar que no se haya roto nada.

**No tenés que escribir código.** El archivo del workflow ya viene en este Pull Request. Vos lo mergeás, le cargás dos datos y lo probás.

## Cómo funciona (la idea completa)

```
Alguien abre un Pull Request, o llega un commit a main
        │
        ▼
GitHub ve el evento "pull_request" o "push"
        │
        ▼
Ejecuta el workflow  .github/workflows/aviso-telegram.yml
        │
        ▼
El workflow le pide a Telegram: «mandá este mensaje a este chat»
        │
        ▼
Te suena el celular
```

Un workflow tiene tres partes. Abrí el archivo y buscalas:

| Parte | Qué responde | En nuestro archivo |
| --- | --- | --- |
| `on:` | **¿Cuándo corre?** | Cuando se abre un Pull Request (`pull_request`), cuando entra un commit a `main` (`push`), o cuando lo apretás a mano (`workflow_dispatch`) |
| `jobs:` | **¿Dónde corre?** | En una máquina de GitHub con Ubuntu (`runs-on: ubuntu-latest`). Vos no instalás nada |
| `steps:` | **¿Qué hace?** | Un solo paso: le habla a Telegram con `curl` |

## Paso a paso

### 1. Conseguí tu `chat_id`

El `chat_id` es la «dirección» de tu Telegram. Sin eso, el bot no sabe a quién escribirle.

1. En Telegram, buscá **@RawDataBot** y escribile cualquier cosa.
2. Te responde con un texto largo. Buscá la parte que dice `"chat": { "id": 123456789`.
3. Ese número es tu `chat_id`. Copialo.

### 2. Hablale al bot de avisos

Un bot **no puede escribirle a alguien que nunca le habló**. Buscá **@NOMBRE_DEL_BOT** en Telegram y apretá **Iniciar** (o escribile `/start`).

### 3. Mergeá este Pull Request

En GitHub apretá **Merge pull request** y después **Confirm merge**. Con eso el workflow queda en tu repositorio.

### 4. Cargá los datos secretos

Los workflows no llevan los datos sensibles escritos en el archivo, porque el archivo lo puede leer cualquiera. Se guardan aparte, como **Secrets**.

1. En tu repositorio: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. Creá estos dos:

| Name | Secret |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | El token del bot. Te lo pasa Mauro |
| `TELEGRAM_CHAT_ID` | El número que te dio RawDataBot |

Fijate que en `aviso-telegram.yml` aparecen como `${{ secrets.TELEGRAM_BOT_TOKEN }}`: el archivo **nombra** el secreto, pero nunca lo muestra.

## Probá esto

1. **Probalo a mano.** En tu repositorio entrá a la pestaña **Actions**, elegí **Aviso por Telegram** a la izquierda y apretá **Run workflow**. Te tiene que llegar un mensaje que dice «Prueba manual». Si no llega, mirá el punto de abajo.
2. **Mirá la ejecución.** En la misma pestaña **Actions** apareció una fila. Entrá y abrí el paso «Mandar el mensaje a Telegram». Ahí está el registro de todo lo que hizo la máquina.
3. **Rompelo a propósito.** Cambiá el valor de `TELEGRAM_CHAT_ID` por `123` y corré el workflow de nuevo. Mirá cómo aparece la **cruz roja** y qué error muestra. Volvé a poner el número bueno.
4. **El de verdad.** Creá una rama, cambiá cualquier cosa (por ejemplo una palabra del README), subila y abrí un Pull Request **desde esa rama, dentro de tu mismo repositorio**. Tiene que llegarte el aviso con el título y el link.
5. **Mirá un Pull Request de otra persona.** Pedile a tu compañero/a que abra uno en tu repositorio: vas a ver que el aviso dice quién lo abrió.
6. **Un commit a `main`.** Mergeá cualquier Pull Request, o editá un archivo directo en `main` desde GitHub. Te tiene que llegar «Nuevo commit en main de …» con el título del commit. Hacé dos o tres commits más y contá los mensajes: **uno por cada commit**.
7. **Mirá la diferencia.** Un Pull Request avisa cuando se **abre**, antes de que nadie lo acepte. Un commit a `main` avisa cuando el cambio **ya está adentro**. ¿Cuál te sirve más para enterarte a tiempo de algo que hay que revisar?

## Si no te llega

- ¿Le diste **Iniciar** al bot? Sin eso no puede escribirte.
- ¿El `chat_id` es solo el número, sin comillas ni espacios?
- ¿Los nombres de los secrets están **exactamente** como en la tabla? Las mayúsculas y el guion bajo importan.
- Abrí el paso fallido en **Actions**: Telegram contesta con el motivo del error.

## Cosas para pensar

- **¿Por qué un Pull Request que viene de un fork no dispara el aviso?** GitHub no les entrega los secrets a los workflows de gente de afuera, porque cualquiera podría escribir un workflow que los robe. Es una protección, no un error.
- **¿Qué pasaría si pegáramos el token directo en el archivo `.yml`?** Quedaría en el historial de git para siempre, aunque después lo borres. Por eso se usan los Secrets.
- Si un token se filtra, **se revoca y se genera uno nuevo**. No se intenta esconder.

## Cambios chiquitos (opcionales)

1. **Otro texto del mensaje.** En `aviso-telegram.yml` buscá `Nuevo Pull Request de` y escribí lo que quieras.
2. **Avisar también cuando se mergea.** Debajo de `on:` agregá un evento `push` con `branches: [main]` y probalo con un commit.
3. **Avisar a otra persona.** Creá un segundo secret `TELEGRAM_CHAT_ID_2` y duplicá el paso. Cada uno manda a su chat.
