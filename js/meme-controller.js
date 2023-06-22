'use strict'
let gElCanvas
let gCtx
let gUploadedImg = null

function onInitEditor() {
    gElCanvas = document.querySelector('.canvas-el')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderMeme()
}


function renderMeme() {
    setFocusToInput()
    const meme = getMeme()

    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {

        if (gUploadedImg) gCtx.drawImage(gUploadedImg, 0, 0, gElCanvas.width, gElCanvas.height)
        else gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)


        meme.lines.forEach((line, idx) => {
            const fontFamily = 'Impact'
            const fontSize = line.size
            gCtx.font = `${fontSize}px ${fontFamily}`
            gCtx.lineWidth = 2
            gCtx.strokeStyle = 'black'
            gCtx.textAlign = 'center' // line.align
            gCtx.fillStyle = line.color
            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)

            if (idx === meme.selectedLineIdx) {
                // Draw frame around the selected line
                const frameWidth = gElCanvas.width - 20
                const frameHeight = fontSize + 10
                const frameX = gElCanvas.width / 2
                const frameY = line.y - fontSize

                gCtx.beginPath()
                gCtx.rect(frameX - frameWidth / 2, frameY, frameWidth, frameHeight)
                gCtx.strokeStyle = 'grey'
                gCtx.lineWidth = 2
                gCtx.stroke()
            }

        })

    }
}

function onImgInput(ev) {
    loadImageFromInput(ev, function (img) {
        gUploadedImg = img
        renderMeme()
    })
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


function clearFrameFromCanvas() {
    const meme = getMeme()
    meme.selectedLineIdx = -1
    renderMeme()
}

// function onDownloadImg(elLink) {
//     clearFrameFromCanvas()
//     setTimeout((downloadImg(elLink)), 4000);
// }


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent

}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}



function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetFontColor(color) {
    setFontColor(color)
    renderMeme()
}

function onSetFontSize(fontSize) {
    setFontSize(fontSize)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
    onSwitchLine()
}

function onSwitchLine() {
    const meme = getMeme()
    switchLine()
    let selectedLine = meme.selectedLineIdx
    document.getElementById("text-input").value = meme.lines[selectedLine].txt
    renderMeme()
}

function onhandleInput() {
    const meme = getMeme()
    const text = document.getElementById("text-input").value
    const selectedLine = meme.selectedLineIdx
    setLineTxt(text, selectedLine)
    renderMeme()
}

function setFocusToInput() {
    if (window.innerWidth < 780) {
        return; // Returns early if screen width is less than 780 pixels
    }
    var input = document.getElementById("text-input")
    input.focus()
}

function onMoveLine(axis, num) {
    moveLine(axis, num)
    renderMeme()
}