'use strict'
let gElCanvas
let gCtx

function onInitEditor() {
    gElCanvas = document.querySelector('.canvas-el')
    console.log(gElCanvas);
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
        //draw the img on canvas
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        let selectedLine = meme.lines[meme.selectedLineIdx]

        meme.lines.forEach((line, idx) => {
            const fontFamily = 'Impact'
            const fontSize = line.size
            gCtx.font = `${fontSize}px ${fontFamily}`
            gCtx.lineWidth = 2
            gCtx.strokeStyle = 'black'
            gCtx.textAlign = 'center' // line.align
            gCtx.fillStyle = line.color
            // const topTextX = gElCanvas.width / 2
            // const topTextY = fontSize + 10
            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)

            if (idx === meme.selectedLineIdx) {
                // Draw frame around the selected line
                const frameWidth = gElCanvas.width - 20;
                const frameHeight = fontSize + 10;
                const frameX = gElCanvas.width / 2;
                const frameY = line.y - fontSize;

                gCtx.beginPath();
                gCtx.rect(frameX - frameWidth / 2, frameY, frameWidth, frameHeight);
                gCtx.strokeStyle = 'red';
                gCtx.lineWidth = 2;
                gCtx.stroke();
            }

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
    console.log(selectedLine);
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
