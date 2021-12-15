'use strict'

function renderGallery() {
    var strHTMLs = '<ul class="gallery-items">';
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
    setImg(elId);
}