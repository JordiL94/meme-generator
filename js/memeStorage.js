'use strict'

function checkInStorage(key) {
    return localStorage.getItem(key);
}

function saveToStorage(key, val) {
    const json = JSON.stringify(val);
    localStorage.setItem(key, json);
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key);
    const val = JSON.parse(json);
    return val;
}