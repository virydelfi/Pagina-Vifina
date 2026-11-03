# Actividad: la alarma del hombre muerto

## Qué vamos a hacer

Una alarma normal te avisa cuando **algo falla**. Pero hay cosas que, cuando se rompen, **no avisan nada**: se quedan en silencio. Un servidor que se apagó no manda un mensaje diciendo «me apagué».

La **alarma del hombre muerto** (*dead man's switch*) funciona al revés: algo tiene que avisar **cada tanto que sigue vivo**. Si deja de avisar, suena la alarma.

El nombre viene de los trenes: el conductor tiene que mantener apretado un pedal. Si se desmaya y lo suelta, el tren frena solo.

Hoy vas a armar la tuya:

```
GitHub Actions  ──── «sigo vivo» cada 5 minutos ────▶  healthchecks.io
                                                            │
                                  si pasan 10 minutos sin recibir nada
                                                            ▼
                                                    te manda un mail
```

**No tenés que escribir código.** El workflow ya viene en este Pull Request. Lo que tenés que hacer es crear la cuenta, configurar la alarma y probarla.

## Para qué se usa en la vida real

Mauro usa una para vigilar tareas programadas de los servidores de Hook. Si una de esas tareas deja de correr o el servidor se cae, **nadie se entera** salvo que exista una alarma como esta.

## Paso a paso

### 1. Creá tu cuenta en healthchecks.io

1. Entrá a [healthchecks.io](https://healthchecks.io) y apretá **Sign Up**. Es gratis.
2. Usá tu propio mail.

### 2. Creá el check

Un *check* es una alarma. Apretá **Add Check** y configurá:

| Campo | Valor |
| --- | --- |
| **Name** | `Mi repositorio` |
| **Period** | `10 minutes` |
| **Grace Time** | `10 minutes` |

- **Period** es cada cuánto **esperamos** el aviso de «sigo vivo».
- **Grace Time** es cuánta paciencia tenemos antes de gritar.

Fijate que el workflow manda un ping cada **5** minutos, pero el Period es de **10**. Eso es a propósito: GitHub a veces se atrasa unos minutos, y no queremos una falsa alarma.

### 3. Copiá la URL del ping

Arriba del check aparece una dirección parecida a `https://hc-ping.com/…` con un montón de letras y números. Esa URL es **un secreto**: cualquiera que la conozca puede decirle a tu alarma que estás vivo. Copiala.

### 4. Mergeá este Pull Request

En GitHub apretá **Merge pull request** y después **Confirm merge**.

### 5. Guardá la URL como Secret

1. En tu repositorio: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. **Name**: `HEALTHCHECK_URL`. **Secret**: la URL que copiaste.

## Probá esto

1. **Mandá el primer ping a mano.** En la pestaña **Actions** elegí **Hombre muerto** y apretá **Run workflow**. Volvé a healthchecks.io: el check pasó de gris a **verde** (*Up*).
2. **Esperá el ping automático.** Dentro de unos 5 a 10 minutos, aparece una ejecución nueva en **Actions** que nadie apretó. Mirá en healthchecks.io cómo se actualiza *Last Ping*.
3. **Matá al conductor.** En **Actions**, a la izquierda, elegí **Hombre muerto**, apretá los tres puntos y **Disable workflow**. Ahora nadie manda pings.
4. **Esperá la alarma.** A los 10 minutos del último ping, el check pasa a *Late* y a los 10 más a **rojo** (*Down*), y te llega un **mail**. Fijate que nada falló: lo que pasó es que **dejó de llegar** algo.
5. **Resucitalo.** Volvé a activar el workflow (**Enable workflow**) y mirá cómo el check vuelve a verde.

Mientras esperás, abrí el archivo `.github/workflows/hombre-muerto.yml`. Es el workflow más corto que vas a ver: un solo comando.

## Cosas para pensar

- **¿Qué diferencia hay entre esta alarma y la de «avisame si falla»?** Pensá qué pasa si se apaga la luz del servidor.
- **¿Por qué `cron: "*/5 * * * *"` y no «cada 1 minuto»?** GitHub no ejecuta nada más seguido que cada 5 minutos, y en horas pico puede atrasarse.
- **¿Qué cosas de tu vida o tu trabajo tendrían que «avisar que siguen vivas»?** Un respaldo, una sincronización, una balanza que reporta todos los días.
- Si no hay actividad en un repositorio durante 60 días, GitHub **desactiva solo** los workflows programados. Esa es la alarma del hombre muerto del propio GitHub.

## Cambios chiquitos (opcionales)

1. **Otro mail o canal.** En healthchecks.io entrá a **Integrations** y agregá Telegram. Así la alarma te llega al celular.
2. **Otro nombre.** Cambiá el nombre del check por algo que te diga qué vigila.
3. **Más paciencia.** Cambiá **Grace Time** a `1 hour` y pensá en qué casos conviene.
