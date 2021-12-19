'use strict'

function renderGallery(tag = '') {
    var strHTMLs = `<ul class="gallery-items clean-list"> 
            <li class="add-image" onclick="onImgSelect()"><i class="fas fa-plus"></i>
            </li>`;
    const imgs = getImgs(tag);
    imgs.forEach((img) => {
        strHTMLs += `<li onclick="onImgSelect(${img.id})">
                <img src="${img.url}">
            </li>`;
    });
    strHTMLs += '</ul>';
    document.querySelector('.gallery').innerHTML = strHTMLs;
}

function renderMemeGallery() {
    var strHTMLs = '<ul class="meme-items clean-list">';
    const memes = getStoredMemes();
    memes.forEach((meme) => {
        strHTMLs += `<li><img src="${meme}"></li>`;
    });
    strHTMLs += '</ul>';
    document.querySelector('.meme-gallery').innerHTML = strHTMLs;
}

function onImgSelect(imgId = 0) {
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.meme-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'grid';
    document.querySelector('.user-msg').innerText = '';
    document.querySelector('.share-container').innerText = '';
    document.querySelector('.gallery-sect').classList.remove('active');
    if(imgId === 0) document.querySelector('.file-input').style.display = 'block';
    setImg(imgId);
}

function onShowGallery() {
    document.querySelector('.main-content').style.display = 'inline';
    document.querySelector('.meme-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.file-input').style.display = 'none';
    document.querySelector('.gallery-sect').classList.add('active');
    document.querySelector('.memes-sect').classList.remove('active');
    document.querySelector('.about-sect').classList.remove('active');
    renderGallery();
    renderFirstTagLinks();
}

function onShowMemes() {
    document.querySelector('.meme-content').style.display = 'inline';
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.file-input').style.display = 'none';
    document.querySelector('.memes-sect').classList.add('active');
    document.querySelector('.gallery-sect').classList.remove('active');
    document.querySelector('.about-sect').classList.remove('active');
    renderMemeGallery();
}

function onImageSearch(val) {
    renderGallery(val);
}

function renderTagLinks() {
    const tags = getTags();
    var strHTML = `<ul class="tag-list clean-list">`
    tags.forEach(tag => {
        strHTML += `<li onclick="onImageSearch('${tag.tag}'); 
            onSearchHit('${tag.tag}', 'long')" style="font-size: 
            ${(14 + tag.hits)}px">${tag.tag}</li>`;
    });
    strHTML += '</ul>';
    document.querySelector('.tag-links').innerHTML = strHTML;
    document.querySelector('.search-bar').style.margin = '4.5rem 1.25rem';
}

function renderFirstTagLinks() {
    const tags = getTags();
    var strHTML = `<ul class="tag-list clean-list">`;
    for(var i = 0; i < 5; i++) {
        strHTML += `<li onclick="onImageSearch('${tags[i].tag}');
            onSearchHit('${tags[i].tag}', 'short')" style="font-size: 
            ${(14 + tags[i].hits)}px">${tags[i].tag}</li>`;
    }
    strHTML += '<li onclick="renderTagLinks()">More...</li></ul>';
    document.querySelector('.tag-links').innerHTML = strHTML;
    document.querySelector('.search-bar').style.margin = '1.875rem 1.25rem';
}

function onSearchHit(val, list = 'short') {
    increaseHit(val);
    if(list === 'long') renderTagLinks();
    else renderFirstTagLinks();
}