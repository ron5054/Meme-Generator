'use strict'


function onInit() {
    renderGallery()
    onInitEditor()
}

function renderGallery() {
    strHTMLs = ''
    const images = getImages()
    var strHTMLs = images.map(image => `
    <img src="/img/${image.id}.jpg" alt="" onclick="onSetImg(${image.id})">`)

    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')

}

function onSetImg(imageId) {
    setImg(imageId)
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.meme-generator').classList.remove('hide')
    resizeCanvas()
    renderMeme()
}

function onShowGallery() {
    document.querySelector('.gallery-container').classList.remove('hide')
    document.querySelector('.meme-generator').classList.add('hide')
}

