'use strict'

function renderGallery(tag = '') {
    var strHTMLs = `<ul class="gallery-items clean-list"> 
            <li class="add-image" onclick="onImgSelect()"><i class="fas fa-plus"></i>
            </li>`;
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

function onImgSelect(elId = 0) {
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.meme-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'grid';
    document.querySelector('.user-msg').innerText = '';
    document.querySelector('.share-container').innerText = '';
    if(elId === 0) document.querySelector('.file-input').style.display = 'block';
    setImg(elId);
}

function onShowGallery() {
    document.querySelector('.main-content').style.display = 'inline';
    document.querySelector('.meme-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.file-input').style.display = 'none';
}

function onShowMemes() {
    document.querySelector('.meme-content').style.display = 'inline';
    renderMemeGallery();
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.file-input').style.display = 'none';
}

function onImageSearch(val) {
    renderGallery(val);
}