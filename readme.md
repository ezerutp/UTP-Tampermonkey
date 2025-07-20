# Scripts Tampermonkey para Class UTP

Este repositorio contiene 5 scripts de Tampermonkey diseñados para mejorar la experiencia en la plataforma [Class UTP](https://class.utp.edu.pe/).

## Scripts

### 1. Mostrar días restantes en actividades

**Archivo:** [`utp-dias-restantes.js`](utp-dias-restantes.js)

- Reemplaza la fecha de vencimiento de cada actividad por un mensaje indicando cuántos días faltan y muestra la fecha y hora exacta de vencimiento.
- Colorea las cartillas según la urgencia:
  - **Rojo claro:** Vence hoy.
  - **Amarillo claro:** Vence mañana.
  - **Gris:** Actividad vencida.
- El texto cambia dinámicamente e incluye la fecha:
  - `⚠️ Vence hoy (dd/mm/aaaa hh:mm AM/PM)`
  - `⏰ Vence mañana (dd/mm/aaaa hh:mm AM/PM)`
  - `📆 Faltan X días (dd/mm/aaaa hh:mm AM/PM)`

### 2. Modal con tareas vencidas

**Archivo:** [`utp-modal-tareas-vencidas.js`](utp-modal-tareas-vencidas.js)

- Agrega un botón en la cabecera para ver todas las actividades vencidas en un modal.
- Las actividades vencidas se muestran en una ventana emergente, separadas del resto.
- Permite cerrar el modal haciendo clic fuera de él.

### 3. Modal con actividades no calificadas

**Archivo** [`utp-modal-nocalificadas.js`](utp-modal-nocalificadas.js)
- Muestra un botón en la cabecera para visualizar todas las actividades que son de caracter no calificadas.
- Las actividades no calificadas se presentan en un modal separado, facilitando su revisión.
- Permite cerrar el modal haciendo clic fuera de él.

### 4. Ocultar banners completamente

**Archivo:** [`utp-remover-banner.js`](utp-remover-banner.js)

- Elimina el carrusel de banners de la página principal de Class UTP.
- También elimina los contenedores vacíos que quedan tras quitar el banner.
- Funciona automáticamente al cargar la página y ante cambios dinámicos.

## 5. Boton de Zoom en la cartilla del curso

**Archivo:** [`utp-boton-zoom.js`](utp-boton-zoom.js)

- Añade un botón de Zoom en la cartilla de cada curso para ingresar directamente al contenido.
- Permite acceder rápidamente a la sala de Zoom asociada al curso desde la cartilla principal.
- Facilita la navegación y ahorra tiempo al evitar pasos intermedios.


## Instalación

> ⚠️ **Aviso importante:**  
> Para que los scripts funcionen correctamente, asegúrate de que Tampermonkey esté activado en **modo desarrollador**. Esto permite cargar y ejecutar scripts personalizados sin restricciones.

1. Instala la extensión [Tampermonkey](https://www.tampermonkey.net/) en tu navegador.
2. Haz clic en "Crear un nuevo script" y pega el contenido de cada archivo según el script que desees usar.
3. Guarda los cambios y recarga la página de [Class UTP](https://class.utp.edu.pe/).

## Screenshots

### Vista general de las mejoras aplicadas

![Screenshot 1](screenshot/ScreenShot%20Tool%20-20250720110109.png)
*Vista principal de Class UTP con los scripts activados mostrando días restantes y colores de urgencia. Interfaz limpia sin banners y con todas las mejoras aplicadas*

![Screenshot 2](screenshot/ScreenShot%20Tool%20-20250720110136.png)
*Modal de actividades con calificadas*

![Screenshot 3](screenshot/ScreenShot%20Tool%20-20250720110155.png)
*Modal de actividades vencidas*


## Notas

- Todos los scripts están diseñados para funcionar en la URL `https://class.utp.edu.pe/*`.
- Puedes usar los tres scripts al mismo tiempo para una mejor experiencia.

---

Desarrollado para uso personal y educativo.

## 🧠 Autor

Desarrollado por **Ezer Vidarte**  
Ingeniero de Sistemas | UTP 🇵🇪  
[GitHub](https://github.com/ezerutp)