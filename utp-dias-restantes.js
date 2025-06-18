// ==UserScript==
// @name         Class UTP - Mostrar días restantes (Mejorado)
// @namespace    https://utp.edu.pe/
// @version      1.2
// @description  Reemplaza fecha por días restantes y colorea cartillas urgentes
// @match        https://class.utp.edu.pe/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function formatearTextoDias(dias) {
        if (dias === 0) return '⚠️ Vence hoy';
        if (dias === 1) return '⏰ Vence mañana';
        return `📆 Faltan ${dias} días`;
    }

    const interval = setInterval(() => {
        const cartillas = document.querySelectorAll('a[data-testid="card"]');

        if (cartillas.length === 0) return;

        cartillas.forEach(cartilla => {
            const fechaTextoEl = [...cartilla.querySelectorAll('p')]
                .find(p => p.textContent.trim().startsWith("Vence:"));
            console.log(fechaTextoEl);
            if (!fechaTextoEl) return;
            console.log(fechaTextoEl);

            const texto = fechaTextoEl.textContent.trim();
            const fechaMatch = texto.match(/(\d{2})\/(\d{2})\/(\d{4})/);

            if (!fechaMatch) return;

            const [_, dd, mm, yyyy] = fechaMatch;
            const fechaVenc = new Date(`${yyyy}-${mm}-${dd}T23:59:59`);
            console.log(fechaVenc);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            fechaVenc.setHours(0, 0, 0, 0);

            const diff = Math.floor((fechaVenc - hoy) / (1000 * 60 * 60 * 24));
            const nuevoTexto = formatearTextoDias(diff);

            // Reemplazar el texto original por el nuevo
            fechaTextoEl.textContent = nuevoTexto;

            // Aplicar estilos especiales si vence hoy
            if (diff === 0) {
                cartilla.style.backgroundColor = "#ffcccc";
                fechaTextoEl.style.fontWeight = "bold";
            } else if (diff === 1) {
                cartilla.style.backgroundColor = "#fff0b3";
                fechaTextoEl.style.fontWeight = "normal";
            } else if (diff < 0) {
                cartilla.style.backgroundColor = "#e0e0e0";
                fechaTextoEl.style.fontWeight = "normal";
            } else {
                fechaTextoEl.style.fontWeight = "normal";
            }

        });

    }, 1000);

})();
