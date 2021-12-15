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
    document.querySelector('.gallery').style.display = 'none';
    setImg(elId);
}