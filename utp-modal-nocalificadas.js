// ==UserScript==
// @name         Class UTP - Modal con tareas no calificadas
// @namespace    https://utp.edu.pe/
// @version      1.0
// @description  Muestra un modal con las actividades no calificadas
// @match        https://class.utp.edu.pe/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const interval = setInterval(() => {
        const cartillas = document.querySelectorAll('a[data-testid="card"]');
        if (cartillas.length === 0) return;

        const header = document.querySelector('span[data-testid="header"]');
        if (!header || document.getElementById('btn-nocal')) return;

        // Crear botón
        const boton = document.createElement('button');
        boton.id = 'btn-nocal';
        boton.innerText = ' No calificadas 😊';
        boton.style.marginLeft = '12px';
        boton.style.padding = '6px 10px';
        boton.style.fontSize = '14px';
        boton.style.backgroundColor = '#ffffff';
        boton.style.border = '1px solid #ccc';
        boton.style.borderRadius = '6px';
        boton.style.cursor = 'pointer';
        boton.style.color = '#444';
        boton.style.display = 'inline-block';

        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'modal-nocal-overlay';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100vw';
        modalOverlay.style.height = '100vh';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modalOverlay.style.display = 'none';
        modalOverlay.style.zIndex = '1000';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';

        const modal = document.createElement('div');
        modal.id = 'modal-nocal';
        modal.style.overflowY = 'scroll';
        modal.style.scrollbarWidth = 'none';
        modal.style.msOverflowStyle = 'none';
        modal.style.overflow = 'hidden auto';
        modal.style.webkitOverflowScrolling = 'touch';

        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '12px';
        modal.style.width = '90%';
        modal.style.maxWidth = '700px';
        modal.style.margin = 'auto';
        modal.style.maxHeight = '80vh';
        modal.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        modal.style.position = 'relative';

        const listaNoCalificadas = document.createElement('div');
        listaNoCalificadas.id = 'lista-no-calificadas';
        listaNoCalificadas.style.display = 'flex';
        listaNoCalificadas.style.flexDirection = 'column';
        listaNoCalificadas.style.gap = '12px';
        listaNoCalificadas.style.width = '100%';

        modal.appendChild(listaNoCalificadas);
        modalOverlay.appendChild(modal);

        document.body.appendChild(modalOverlay);

        boton.onclick = () => {
            modalOverlay.style.display = 'flex';
        };

        header.appendChild(boton);

        // Mover cartillas no calificadas al modal
        cartillas.forEach(cartilla => {
            const noCalificada = [...cartilla.querySelectorAll("p")]
                .find(p => {
                    const txt = p.textContent.trim().toLowerCase();
                    return txt.endsWith("no calificado") || txt.endsWith("no calificada");
                });

            if (noCalificada && !cartilla.dataset.enModal) {
                listaNoCalificadas.appendChild(cartilla);
                cartilla.dataset.enModal = "true";
                cartilla.style.opacity = "0.8";
                cartilla.style.border = "1px solid #eee";
                cartilla.style.padding = "10px";
                cartilla.style.borderRadius = "8px";
                cartilla.style.width = '100%';
                cartilla.style.boxSizing = 'border-box';
            }
        });

        // También puedes cerrar clickeando fuera
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) modalOverlay.style.display = 'none';
        });

    }, 1000);
})();
