'use strict'

var gStoredMemes;

var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['movies', 'girl']},
    {id: 2, url: 'img/2.jpg', keywords: ['politics', 'funny']},
    {id: 3, url: 'img/3.jpg', keywords: ['cute', 'animals']},
    {id: 4, url: 'img/4.jpg', keywords: ['kids', 'animals']},
    {id: 5, url: 'img/5.jpg', keywords: ['success', 'kids']},
    {id: 6, url: 'img/6.jpg', keywords: ['animals', 'cute']},
    {id: 7, url: 'img/7.jpg', keywords: ['TV', 'conspiracy']},
    {id: 8, url: 'img/8.jpg', keywords: ['movies', 'funny']},
    {id: 9, url: 'img/9.jpg', keywords: ['funny', 'kids']},
    {id: 10, url: 'img/10.jpg', keywords: ['funny', 'movies']},
    {id: 11, url: 'img/11.jpg', keywords: ['dance', 'kids']},
    {id: 12, url: 'img/12.jpg', keywords: ['TV', 'pointing']},
    {id: 13, url: 'img/13.jpg', keywords: ['politics', 'funny']},
    {id: 14, url: 'img/14.jpg', keywords: ['kids', 'cute']},
    {id: 15, url: 'img/15.jpg', keywords: ['animals', 'funny']},
    {id: 16, url: 'img/16.jpg', keywords: ['laughing', 'politics']},
    {id: 17, url: 'img/17.jpg', keywords: ['sports', 'funny']},
    {id: 18, url: 'img/18.jpg', keywords: ['success', 'movies']},
    {id: 19, url: 'img/19.jpg', keywords: ['TV', 'pointing']},
    {id: 20, url: 'img/20.jpg', keywords: ['conspiracy', 'movies']},
    {id: 21, url: 'img/21.jpg', keywords: ['doubt', 'movies']},
    {id: 22, url: 'img/22.jpg', keywords: ['TV', 'yelling']},
    {id: 23, url: 'img/23.jpg', keywords: ['TV', 'crying']},
    {id: 24, url: 'img/24.jpg', keywords: ['politics', 'pointing']},
    {id: 25, url: 'img/25.jpg', keywords: ['pointing', 'movies']}
];

var gImgTracker = 25;

var gTags = [
    {tag: 'animals', hits: 1},
    {tag: 'conspiracy', hits: 3},
    {tag: 'crying', hits: 8},
    {tag: 'cute', hits: 5},
    {tag: 'dance', hits: 2},
    {tag: 'doubt', hits: 2},
    {tag: 'movies', hits: 3},
    {tag: 'funny', hits: 4},
    {tag: 'girl', hits: 7},
    {tag: 'kids', hits: 5},
    {tag: 'laughing', hits: 9},
    {tag: 'pointing', hits: 2},
    {tag: 'politics', hits: 1},
    {tag: 'sports', hits: 3},
    {tag: 'success', hits: 4},
    {tag: 'TV', hits: 4},
    {tag: 'yelling', hits: 3}
];

var gMeme = {
    selectedImgId: 5,
    slectedLineIdx: 0,
    lines : [
        {
            txt: 'Input Text',
            size: 40,
            align: 'center',
            color: 'white',
            border: '#121212',
            font: 'Impact',
            type: 'text'
        }
    ]
};

var gEmojis = [
    {id: 1, txt: '🤣'}, 
    {id: 2, txt: '😋'}, 
    {id: 3, txt: '😉'}, 
    {id: 4, txt: '😍'}, 
    {id: 5, txt: '😅'}, 
    {id: 6, txt: '😴'}, 
    {id: 7, txt: '😨'}, 
    {id: 8, txt: '😭'}, 
    {id: 9, txt: '🤢'}, 
    {id: 10, txt: '🤬'}, 
    {id: 11, txt: '😱'}, 
    {id: 12, txt: '😷'}
];

function getMeme() {
    if(gMeme.selectedImgId === 0) return;
    const imgId = gMeme.selectedImgId;
    const memeImg = gImgs.filter(img => {
        return img.id === imgId;
    })
    return memeImg[0].url;
}

function setStoredMemes() {
    gStoredMemes = (checkInStorage('memes') === null) ? [] : loadFromStorage('memes');
}

function getStoredMemes() {
    return gStoredMemes;
}

function getMemeInfo() {
    return gMeme;
}

function setLineTxt(elTxt) {
    const lineIdx = gMeme.slectedLineIdx;
    if(gMeme.lines[lineIdx].type === 'emoji') return;
    gMeme.lines[lineIdx].txt = elTxt;
}

function setImg(id = 0) {
    gMeme.selectedImgId = id;
    renderMeme();
} 

function getImgs(tag) {
    if(tag === '') return gImgs;
    const searchedImgs = gImgs.filter(img => {
        return img.keywords.some(keyword => {
            if(keyword === tag) onSearchHit(tag);
            return keyword.includes(tag);
        })
    })
    return searchedImgs;
}

function changeFontSize(val) {
    const lineIdx = gMeme.slectedLineIdx;
    if(val && gMeme.lines[lineIdx].size <= 90) {
        gMeme.lines[lineIdx].size += 2;
    } else if (gMeme.lines[lineIdx].size >= 20) {
        gMeme.lines[lineIdx].size -=2;
    }
}

function changeAlign(val) {
    const lineIdx = gMeme.slectedLineIdx;
    if(!val) gMeme.lines[lineIdx].align = 'right'; 
    else if(val === 1) gMeme.lines[lineIdx].align = 'center'; 
    else gMeme.lines[lineIdx].align = 'left'; 
}

function changeColor(val) {
    const lineIdx = gMeme.slectedLineIdx;
    gMeme.lines[lineIdx].color = val;
}

function changeFont(val) {
    const lineIdx = gMeme.slectedLineIdx;
    gMeme.lines[lineIdx].font = val;
}

function addLine() {
    const newLine = _createLine();
    gMeme.lines.push(newLine);
}

function changeLine() {
    const availableLines = gMeme.lines.length;
    if(gMeme.slectedLineIdx === (availableLines - 1)) {
        gMeme.slectedLineIdx = 0;
        return;
    } 
    gMeme.slectedLineIdx++;
}

function deleteLine() {
    if(!gMeme.lines.length) return;
    const lineIdx = gMeme.slectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
    if(lineIdx === 0) return;
    gMeme.slectedLineIdx--;
}

function getCurrLine() {
    return gMeme.slectedLineIdx;
}

function getTotalLines() {
    return gMeme.lines.length;
}

function changeBorder(val) {
    const lineIdx = gMeme.slectedLineIdx;
    gMeme.lines[lineIdx].border = val;
}

function getEmojis() {
    return gEmojis;
}

function setEmoji(id) {
    const chosenEmoji = gEmojis.filter(emoji =>{
        return emoji.id === id;
    })
    const newEmoji = _createLine(chosenEmoji[0].txt, 'none', 'none', 'emoji');
    gMeme.lines.push(newEmoji);
}

function saveMemeLocally(meme) {
    gStoredMemes.push(meme);
    saveToStorage('memes', gStoredMemes);
}

function newImg(url) {
    gImgTracker += 1;
    const newImg = {id: gImgTracker, url: url, keywords: []};
    gImgs.push(newImg);
    gMeme.selectedImgId = gImgTracker;
}

function getTags() {
    return gTags;
}

function increaseHit(val) {
    gTags.map(tag => {
        if(tag.tag === val && tag.hits < 41) tag.hits++;
    });
}

function _createLine(txt = 'Inout Text', color = 'white', border = '#121212', type = 'text') {
    const newLine = {
        txt: txt,
        size: 40,
        align: 'center',
        color: color,
        border: border,
        type: type
    };
    return newLine;
}