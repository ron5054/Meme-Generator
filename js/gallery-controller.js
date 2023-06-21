'use strict'


function onInit() {
    renderGallery()
    // initCanvas()
    onInitEditor()
}

function renderGallery() {
    strHTMLs = ''
    const images = getImages()
    var strHTMLs = images.map(image => `
    <img src="/img/${image.id}.jpg" alt="">`)

    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')

}