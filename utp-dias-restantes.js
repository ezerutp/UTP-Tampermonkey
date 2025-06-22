// ==UserScript==
// @name         Class UTP - Mostrar días restantes (Mejorado)
// @namespace    https://utp.edu.pe/
// @version      1.3
// @description  Reemplaza fecha por días restantes y colorea cartillas urgentes
// @match        https://class.utp.edu.pe/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function formatearTextoDias(dias, fechaOriginal) {
        const fechaFormateada = `${fechaOriginal.toLocaleDateString('es-PE')} ${fechaOriginal.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
        if (dias === 0) return `⚠️ Vence hoy (${fechaFormateada})`;
        if (dias === 1) return `⏰ Vence mañana (${fechaFormateada})`;
        return `📆 Faltan ${dias} días (${fechaFormateada})`;
    }

    const interval = setInterval(() => {
        const cartillas = document.querySelectorAll('a[data-testid="card"]');
        if (cartillas.length === 0) return;

        cartillas.forEach(cartilla => {
            const pElements = cartilla.querySelectorAll('p');
            let fechaTextoEl = null;
            let fechaTexto = '';

            for (const p of pElements) {
                const texto = p.textContent.trim();
                if (texto.startsWith("Vence:")) {
                    fechaTextoEl = p;
                    fechaTexto = texto;
                    break;
                }
            }

            if (!fechaTextoEl) return;

            const fechaMatch = fechaTexto.match(/(\d{2})\/(\d{2})\/(\d{4}) a las\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i);
            if (!fechaMatch) return;

            let [_, dd, mm, yyyy, hh, min, meridiano] = fechaMatch;
            hh = parseInt(hh, 10);
            if (meridiano.toUpperCase() === 'PM' && hh !== 12) {
                hh += 12;
            }
            if (meridiano.toUpperCase() === 'AM' && hh === 12) {
                hh = 0;
            }

            const fechaVenc = new Date(`${yyyy}-${mm}-${dd}T${String(hh).padStart(2, '0')}:${min}:00`);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            const fechaComparar = new Date(fechaVenc);
            fechaComparar.setHours(0, 0, 0, 0);
            const diff = Math.floor((fechaComparar - hoy) / (1000 * 60 * 60 * 24));

            const nuevoTexto = formatearTextoDias(diff, fechaVenc);
            fechaTextoEl.textContent = nuevoTexto;

            // Colores según urgencia
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