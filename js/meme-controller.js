'use strict'
let gElCanvas
let gCtx
let gUploadedImg = null
//////////////////////////////////////
let gIsDragging = false
let gDragStartPos
let gLineOffset
////////////////////////////////////

function onInitEditor() {
    gElCanvas = document.querySelector('.canvas-el')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderMeme()
    gElCanvas.addEventListener('mousedown', onLineDragStart)
    gElCanvas.addEventListener('mousemove', onLineDrag)
    gElCanvas.addEventListener('mouseup', onLineDragEnd)

}

function renderMeme() {
    setFocusToInput()
    const meme = getMeme()

    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {

        if (gUploadedImg) gCtx.drawImage(gUploadedImg, 0, 0, gElCanvas.width, gElCanvas.height)
        else gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        measureTextBox()

        meme.lines.forEach((line, idx) => {
            const fontFamily = 'impact,arial'
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
                const frameWidth = meme.lines[meme.selectedLineIdx].width
                const frameHeight = fontSize + 10
                const frameX = line.x
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

function measureTextBox() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    if (meme.selectedLineIdx === -1) return //fixes bug with clearFrameFromCanvas()
    const textMeasures = gCtx.measureText(selectedLine.txt)
    selectedLine.width = textMeasures.width + 20
    selectedLine.height = selectedLine.size
}

function onImgInput(ev) {
    loadImageFromInput(ev, (img) => {
        gUploadedImg = img
        renderMeme()
    })
}

function clearFrameFromCanvas() {
    const meme = getMeme()
    meme.selectedLineIdx = -1
    renderMeme()
}

// function onDownloadImg(elLink) {
//     clearFrameFromCanvas()
//     setTimeout(() => {
//         downloadImg(elLink)
//     }, 2000)
// }

function downloadImg(elLink) {
    clearFrameFromCanvas()
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
    if (meme.lines.length === 1) return alert('Add line first')
    switchLine()
    let selectedLine = meme.selectedLineIdx
    document.getElementById("text-input").value = meme.lines[selectedLine].txt
    document.getElementById("color-input").value = meme.lines[selectedLine].color
    renderMeme()
}

function onhandleInput() {
    const meme = getMeme()
    const text = document.getElementById("text-input").value
    const selectedLine = meme.selectedLineIdx
    if (meme.selectedLineIdx === -1) return alert('Add line first')
    setLineTxt(text, selectedLine)
    renderMeme()
}

function setFocusToInput() {
    if (window.innerWidth < 780) return // Returns early if screen width is less than 780 pixels

    var input = document.getElementById("text-input")
    input.focus()
}

function onMoveLine(axis, num) {
    moveLine(axis, num)
    renderMeme()
}

function onSaveMeme() {
    let saveButton = document.querySelector(".save-btn")
    saveButton.innerText = "Saved Meme"
    saveButton.classList.add("s-btn")

    setTimeout(function () {
        saveButton.innerText = "Save Meme"
        saveButton.classList.remove("s-btn")
    }, 1200)
    saveMeme()
}

function onUploadImgToFacebook() {
    clearFrameFromCanvas()
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    uploadImgToFacebook(imgDataUrl, onSuccess)
}

function onClickOnLine(ev) {

    const meme = getMeme()
    const axisX = ev.offsetX
    const axisY = ev.offsetY

    for (var i = 0; i < meme.lines.length; i++) {
        const line = meme.lines[i]
        if (axisX > (line.x - (line.width / 2)) && axisX < (line.x + (line.width / 2)) && axisY > (line.y - line.height) && axisY < (line.y + 15)) {
            setSelectedLine(i)
            renderMeme()
        }
    }
}

/////////////////////////drag and drop/////////////////////////////

function onLineDragStart(ev) {
    document.querySelector('.canvas-el').style.cursor = 'grab'
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

    if (
        ev.offsetX > selectedLine.x - selectedLine.width / 2 &&
        ev.offsetX < selectedLine.x + selectedLine.width / 2 &&
        ev.offsetY > selectedLine.y - selectedLine.height &&
        ev.offsetY < selectedLine.y
    ) {
        gIsDragging = true
        gDragStartPos = { x: ev.offsetX, y: ev.offsetY }
        gLineOffset = {
            x: gDragStartPos.x - selectedLine.x,
            y: gDragStartPos.y - selectedLine.y,
        }
    }

}

function onLineDrag(ev) {
    if (gIsDragging) {
        document.querySelector('.canvas-el').style.cursor = 'grabbing'
        const meme = getMeme()
        const selectedLine = meme.lines[meme.selectedLineIdx]
        const newX = ev.offsetX - gLineOffset.x
        const newY = ev.offsetY - gLineOffset.y

        selectedLine.x = newX
        selectedLine.y = newY

        renderMeme()
    }
}

function onLineDragEnd() {
    gIsDragging = false
    document.querySelector('.canvas-el').style.cursor = 'grab'
}

function onRemoveSavedMeme(memeId) {
    removeSavedMeme(memeId)
    renderSavedMemes()
}