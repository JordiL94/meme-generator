'use strict'

function renderGallery() {
    var strHTMLs = '<ul class="gallery-items clean-list">';
    const imgs = getImgs();
    imgs.forEach((img) => {
        strHTMLs += `<li onclick="onImgSelect(${img.id})">
                <img src="${img.url}">
            </li>`;
    });
    strHTMLs += '</ul>';
    document.querySelector('.gallery').innerHTML = strHTMLs;
}

function onImgSelect(elId) {
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'grid';
    setImg(elId);
}

function onShowGallery() {
    document.querySelector('.main-content').style.display = 'inline';
    document.querySelector('.editor').style.display = 'none';
}