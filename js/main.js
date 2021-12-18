'use strict'

function init() {
    renderGallery();
    canvasInit();
    setStoredMemes();
    renderMemeGallery();
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.meme-content').style.display = 'none';
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}