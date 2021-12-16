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
    const lines = getLine();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        lines.forEach((line, idx) => {
            drawText(line, idx);
        });
    }
    // TODO: add text on top of image
}

function drawText(line, idx) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = line.align;
    gCtx.font = `${line.size}px Impact`;
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 2;
    if(!idx) {
        gCtx.fillText(line.txt, (gCanvas.width / 2), 50);
        gCtx.strokeText(line.txt, (gCanvas.width / 2), 50);
    } else if(idx === 1) {
        gCtx.fillText(line.txt, (gCanvas.width / 2), (gCanvas.height - 50));
        gCtx.strokeText(line.txt, (gCanvas.width / 2), (gCanvas.height - 50));
    } else {
        gCtx.fillText(line.txt, (gCanvas.width / 2), (gCanvas.height / 2));
        gCtx.strokeText(line.txt, (gCanvas.width / 2), (gCanvas.height / 2));
    }
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