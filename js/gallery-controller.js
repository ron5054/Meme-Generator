'use strict'


function onInit() {
    renderGallery()
    onInitEditor()
}

function renderGallery() {
    var strHTMLs = ''
    const images = getImages()

    strHTMLs = images.map(image => `
    <img src="img/${image.id}.jpg" alt="" onclick="onSetImg(${image.id})">`)

    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')

}

function onSetImg(imageId) {
    gUploadedImg = null
    setImg(imageId)
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.meme-generator').classList.remove('hide')
    resizeCanvas()
    renderMeme()
}

function onShowGallery() {
    document.querySelector('.gallery-container').classList.remove('hide')
    document.querySelector('.meme-generator').classList.add('hide')
    document.querySelector('.saved-container').classList.add('hide')
}

function onEditMeme(memeId) {
    editMeme(memeId)
    document.querySelector('.meme-generator').classList.remove('hide')
    document.querySelector('.saved-container').classList.add('hide')
}


function onNightMode() {
    document.querySelector('.canvas-bg').classList.toggle('hide')

}


function renderSavedMemes() {

    const savedMemes = getSavedMemes()
    var strHTMLs = ''

    strHTMLs = savedMemes.map(meme => `
    <img src="img/${meme.selectedImgId}.jpg" alt="" onclick="onEditMeme('${meme.id}')">`)

    document.querySelector('.saved-container').innerHTML = strHTMLs.join('')

    if (!savedMemes.length) document.querySelector('.saved-container').innerText = 'No saves yet'
    document.querySelector('.saved-container').classList.remove('hide')
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.meme-generator').classList.add('hide')
}
