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
    const txt = getLineTxt();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(txt);
    }
    // TODO: add text on top of image
}

function drawText(txt) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.font = '3rem Impact';
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 2;
    gCtx.fillText(txt, 250, 50);
    gCtx.strokeText(txt, 250, 50);
    gCtx.fill();
    gCtx.stroke();
}

function onChangeText(elVal) {
    setLineTxt(elVal, 0);
}

function onSetFont(val) {
    return;
    // TODO: finish func
}