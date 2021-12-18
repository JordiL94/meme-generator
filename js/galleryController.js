'use strict'

function renderGallery(tag = '') {
    var strHTMLs = '<ul class="gallery-items clean-list">';
    const imgs = getImgs(tag);
    imgs.forEach((img) => {
        strHTMLs += `<li onclick="onImgSelect(${img.id})">
                <img src="${img.url}">
            </li>`;
    });
    strHTMLs += '</ul>';
    document.querySelector('.gallery').innerHTML = strHTMLs;
}

function renderMemeGallery() {
    var strHTMLs = '<ul class="meme-items clean-list">';
    const memes = getStoredMemes();
    memes.forEach((meme) => {
        strHTMLs += `<li><img src="${meme}"></li>`;
    });
    strHTMLs += '</ul>';
    document.querySelector('.meme-gallery').innerHTML = strHTMLs;
}

function onImgSelect(elId) {
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.meme-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'grid';
    setImg(elId);
}

function onShowGallery() {
    document.querySelector('.main-content').style.display = 'inline';
    document.querySelector('.meme-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
}

function onShowMemes() {
    document.querySelector('.meme-content').style.display = 'inline';
    renderMemeGallery();
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
}

function onImageSearch(val) {
    renderGallery(val);
}