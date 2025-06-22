// ==UserScript==
// @name         Class UTP - Ocultar banners completamente
// @namespace    https://utp.edu.pe/
// @version      1.2
// @description  Elimina el carrusel de banners + contenedores vacíos
// @match        https://class.utp.edu.pe/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function eliminarContenedorBanner() {
        const bannerInterno = document.querySelector('[data-testid="on-boarding-list-course"]');
        if (bannerInterno) {
            let contenedor = bannerInterno;
            for (let i = 0; i < 2; i++) {
                if (contenedor?.parentElement) {
                    contenedor = contenedor.parentElement;
                }
            }

            if (contenedor && contenedor.remove) {
                contenedor.remove();
            }
        }
    }

    window.addEventListener('load', () => {
        setTimeout(eliminarContenedorBanner, 1000);
    });

    const observer = new MutationObserver(eliminarContenedorBanner);
    observer.observe(document.body, { childList: true, subtree: true });
})();
