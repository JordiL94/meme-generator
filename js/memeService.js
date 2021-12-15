'use strict'

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}];
var gMeme = {
    selectedImgId: 5,
    slectedLineIdx: 0,
    lines : [
        {
            txt: 'Input Text',
            size: 20,
            align: 'left',
            color: 'black'
        }
    ]
};

function getMeme() {
    const imgId = gMeme.selectedImgId;
    const memeImg = gImgs.filter(img => {
        return img.id === imgId;
    })
    return memeImg[0].url;
}

function setLineTxt(elTxt, idx) {
    gMeme.lines[idx].txt = elTxt;
    renderMeme();
}

function setImg(id) {
    gMeme.selectedImgId = id;
    renderMeme();
} 

function getImgs() {
    return gImgs;
}