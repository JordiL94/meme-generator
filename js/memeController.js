'use strict'

var gCanvas;
var gCtx;

function canvasInit() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
}

function renderMeme() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var img = new Image();
    img.src = getMeme();
    const meme = getMemeInfo();
    const lines = meme.lines;

    gCtx.beginPath();
    img.onload = () => {
        resizeCanvas(img.height, img.width);
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        lines.forEach((line, idx) => {
            drawText(line, idx);
        });
        drawTextBox(meme.slectedLineIdx);
    }
    gCtx.closePath();

    renderLineIndicator();
}

function drawText(line, idx) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = line.align;
    gCtx.font = `${line.size}px Impact`;
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = line.border;
    gCtx.setLineDash([]);
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
}

function drawTextBox(idx) {
    var y1 = (gCanvas.height / 2) - 25;
    var y2 = 50;
    if(!idx) {
        y1 = 25;
        y2 = 50;
    } else if (idx === 1) {
        y1 = gCanvas.height - 75;
        y2 = 50;
    }
    var x1 = gCanvas.width / 8;
    var x2 = x1 * 6;
    gCtx.rect(x1, y1, x2, y2);
    gCtx.strokeStyle = '#454545';
    gCtx.setLineDash([5, 15]);
    gCtx.stroke();
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

function resizeCanvas(height, width) {
    var elContainer = document.querySelector('.canvas-container');
    elContainer.style.maxWidth = width + 'px';
    const heightCalc = (height * elContainer.offsetWidth) / width;
    elContainer.style.height = heightCalc + 'px';
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
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

function onChangeBorder(val) {
    changeBorder(val);
    renderMeme();
}