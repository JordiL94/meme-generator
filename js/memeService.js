'use strict'

var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics']},
    {id: 2, url: 'img/2.jpg', keywords: ['cute', 'animals']},
    {id: 3, url: 'img/3.jpg', keywords: ['kids', 'animals']},
    {id: 4, url: 'img/4.jpg', keywords: ['cute', 'animals']},
    {id: 5, url: 'img/5.jpg', keywords: ['funny', 'kids']},
    {id: 6, url: 'img/6.jpg', keywords: ['funny', 'conspiracy']},
    {id: 7, url: 'img/7.jpg', keywords: ['funny', 'kids']},
    {id: 8, url: 'img/8.jpg', keywords: ['general', 'movies']},
    {id: 9, url: 'img/9.jpg', keywords: ['funny', 'kids']},
    {id: 10, url: 'img/10.jpg', keywords: ['funny', 'politics']},
    {id: 11, url: 'img/11.jpg', keywords: ['funny', 'sports']},
    {id: 12, url: 'img/12.jpg', keywords: ['conspiracy', 'television']},
    {id: 13, url: 'img/13.jpg', keywords: ['movies', 'funny']},
    {id: 14, url: 'img/14.jpg', keywords: ['movies', 'confused']},
    {id: 15, url: 'img/15.jpg', keywords: ['movies', 'quote']},
    {id: 16, url: 'img/16.jpg', keywords: ['sad', 'television']},
    {id: 17, url: 'img/17.jpg', keywords: ['funny', 'politics']},
    {id: 18, url: 'img/18.jpg', keywords: ['funny', 'movies']}
];

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

function getLineTxt() {
    const lines = gMeme.lines.map(line => {
        return line.txt;
    })
    return lines;
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