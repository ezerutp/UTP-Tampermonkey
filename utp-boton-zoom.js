// ==UserScript==
// @name         Class UTP - Botón Zoom para cada curso
// @namespace    https://utp.edu.pe/
// @version      1.2
// @description  Muestra un botón Zoom alineado a la derecha del nombre del docente
// @match        https://class.utp.edu.pe/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function agregarBotonZoom() {
    const tarjetas = document.querySelectorAll('[data-testid^="course-card-container"]');

    tarjetas.forEach((card) => {
      const url = card.getAttribute('href');
      if (!url || card.querySelector('.btn-zoom-utp')) return;

      const zoomUrl = url.replace('/learnv2', '/zoom');

      // Crear botón
      const zoomBtn = document.createElement('button');
      zoomBtn.innerText = 'Zoom';
      zoomBtn.className = 'btn-zoom-utp';
      zoomBtn.style.backgroundColor = '#007BFF';
      zoomBtn.style.color = '#fff';
      zoomBtn.style.border = 'none';
      zoomBtn.style.borderRadius = '6px';
      zoomBtn.style.padding = '6px 12px';
      zoomBtn.style.fontWeight = 'bold';
      zoomBtn.style.cursor = 'pointer';

      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = zoomUrl;
      });

      // Contenedor que tiene al docente
      const pie = card.querySelector('.px-xxlg.pb-md.flex.items-center.relative');
      const docente = pie?.querySelector('p');

      if (pie && docente) {
        // Crear contenedor para alinear nombre y botón
        const contenedorFlex = document.createElement('div');
        contenedorFlex.style.display = 'flex';
        contenedorFlex.style.justifyContent = 'space-between';
        contenedorFlex.style.alignItems = 'center';
        contenedorFlex.style.width = '100%';

        // Mover nombre del docente y botón dentro del nuevo contenedor
        docente.replaceWith(contenedorFlex);
        contenedorFlex.appendChild(docente);
        contenedorFlex.appendChild(zoomBtn);

        // Agregar el contenedor flex al pie
        pie.appendChild(contenedorFlex);
      }
    });
  }

  // Observer para navegación SPA
  const observer = new MutationObserver(() => {
    agregarBotonZoom();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  agregarBotonZoom();
})();
