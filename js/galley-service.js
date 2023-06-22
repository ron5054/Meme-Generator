'use strict'
const gImgs = []

function getImages() {
    var images = gImgs
    return images
}
_createImages()
function _createImages() {
    const images = getImages()
    for (let i = 0; i < 18; i++) {
        const id = (i + 1)
        const img = {
            id,
            url: `img/${id}.jpg`,
            keywords: []
        }
        images.push(img)
    }
    console.log(gImgs)
}

function setImg(imageId) {
    const meme = getMeme()
    meme.selectedImgId = imageId
    renderMeme()
}