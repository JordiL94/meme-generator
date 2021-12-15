'use strict'

var gCanvas;
var gCtx;

function canvasInit() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
}

function renderMeme() {
    var img = new Image();
    img.src = getMeme();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
    // TODO: add text on top of image
}
