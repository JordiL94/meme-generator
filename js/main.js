'use strict'

function init() {
    renderGallery();
    canvasInit();
    setStoredMemes();
    renderMemeGallery();
    renderFirstTagLinks();
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.meme-content').style.display = 'none';
    document.querySelector('.gallery-sect').classList.add('active');
}

function someFunc() {}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}