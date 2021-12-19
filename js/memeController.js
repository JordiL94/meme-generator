'use strict'

var gCanvas;
var gCtx;
var gIsSaving = false;

function canvasInit() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
}

function renderMeme() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    var img = new Image();
    renderEmojis();
    renderLineIndicator();
    img.src = getMeme();
    if(img.src === null) return;
    const meme = getMemeInfo();
    const lines = meme.lines;

    gCtx.beginPath();
    img.onload = () => {
        resizeCanvas(img.height, img.width);
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        lines.forEach((line, idx) => {
            drawText(line, idx);
        });
        if(!gIsSaving) drawTextBox(meme.slectedLineIdx);
    }
    gCtx.closePath();

}

function drawText(line, idx) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = line.align;
    gCtx.font = `${line.size}px ${line.font}`;
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

function renderEmojis() {
    var strHTMLs = '<ul class="clean-list">';
    const emojis = getEmojis();
    emojis.forEach((emoji) => {
        strHTMLs += `<li onclick="onChooseEmoji(${emoji.id})">${emoji.txt}</li>`;
    });
    strHTMLs += '</ul>';
    document.querySelector('.emoji-chooser').innerHTML = strHTMLs;
}


function onChangeText(elVal) {
    setLineTxt(elVal);
    renderMeme();
}

function onSetFont(val) {
    changeFont(val);
    renderMeme();
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

function onChooseEmoji (elId) {
    setEmoji(elId);
    renderMeme();
}

function onSaveToStorage() {
    gIsSaving = true;
    renderMeme();
    if(confirm('Are you sure you want to save this meme?')) {
        setTimeout(() => {
            const imgContent = gCanvas.toDataURL('image/jpeg');
            saveMemeLocally(imgContent);
            gIsSaving = false;
            onShowMemes();
        }, 500);
    }
}

function onSaveToFB() {
    gIsSaving = true;
    renderMeme();
    setTimeout(uploadImg, 500);
}

function uploadImg() {
    gIsSaving = false;
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader();

    reader.onload = (event) => {
        var img = new Image();
        img.onload = onImageReady.bind(null, img);
        img.src = event.target.result;
        newImg(img.src);
        renderMeme();
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function downloadCanvas(elLink) {
    gIsSaving = true;
    renderMeme();
    if(confirm('Are you sure you want to download this meme?')) {
        setTimeout(() => {
            const data = gCanvas.toDataURL();
            elLink.href = data;
            elLink.download = 'my-img.jpg';
            gIsSaving = false;
            renderMeme();
        }, 500);
    }
}

function onShare() {
    gIsSaving = true;
    renderMeme();
    setTimeout(() => {
        const data = gCanvas.toDataURL();
        share(data);
        gIsSaving = false;
        renderMeme();
    }, 500);
}

async function share(data) {
    const base64url = data;
    const blob = await (await fetch(base64url)).blob();
    const file = new File([blob], 'fileName.png', { type: blob.type });
    navigator.share({
      title: 'MemeGeneartor!',
      text: 'Check out this meme!',
      files: [file],
    })
}
