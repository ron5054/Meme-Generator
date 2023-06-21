'use strict'
let gElCanvas
let gCtx
const topTextInput = document.getElementById('top-text')


// function initCanvas() {
//     gElCanvas = document.querySelector('.canvas-container')
//     gCtx = gElCanvas.getContext('2d')
//     resizeCanvas()
// }

function onInitEditor() {
    gElCanvas = document.querySelector('.canvas-container')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const elImg = new Image() // Create a new html img element
    elImg.src = `img/${meme.selectedImgId}.jpg` // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const fontSize = meme.lines[0].size
        const fontFamily = 'Impact'
        gCtx.font = `${fontSize}px ${fontFamily}`
        gCtx.fillStyle = meme.lines[0].color
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2
        gCtx.textAlign = 'center'

        meme.lines.forEach((line, idx) => {
            const topTextX = gElCanvas.width / 2
            const topTextY = fontSize + 10
            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)
            console.log(line, idx)
        })

    }
}


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

///////////////////////////////////////////////////////////////
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function drawImg2() {
    const elImg = new Image() // Create a new html img element
    elImg.src = 'img/1.jpg' // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetFontColor(color) {
    setFontColor(color)
}

function onSetFontSize(fontSize) {
    setFontSize(fontSize)
}

function onAddLine() {
    addLine()
}

function onSwitchLine() {
    switchLine()
}

