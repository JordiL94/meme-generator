'use strict'

function init() {
    document.querySelector('.editor').style.display = 'none';
    renderGallery();
    canvasInit();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}