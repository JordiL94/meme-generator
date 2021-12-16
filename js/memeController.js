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
    renderLineIndicator();
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
    setLineTxt(elVal);
    renderMeme();
}

function onSetFont(val) {
    return;
    // TODO: finish func
}

function onChangeFontSize(val) {
    changeFontSize(val);
    renderMeme();
}

function onChangeColor(val) {
    changeColor(val);
    renderMeme();
}

function onChangeAlign(val) {
    changeAlign(val);
    renderMeme();
}

function onAddLine() {
    addLine();
    renderMeme();
}

function onChangeLine() {
    changeLine();
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    renderMeme();
}

function renderLineIndicator() {
    const totalLines = getTotalLines();
    const currLineInd = document.querySelector('.current-line'); 
    const totalLinesInd = document.querySelector('.total-lines'); 
    if(totalLines === 0) {
        currLineInd.style.display = 'none';
        totalLinesInd.style.display = 'none';
        return;
    }
    currLineInd.style.display = 'inline';
    totalLinesInd.style.display = 'inline';
    
    const currLine = getCurrLine();
    currLineInd.innerText = (currLine + 1);
    totalLinesInd.innerText = '/' + totalLines;
}