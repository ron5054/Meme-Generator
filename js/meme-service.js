'use strict'

const STORAGE_KEY = 'MemesDB'
const gSavedMemes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            color: 'white',
            x: 250,
            y: 50,
        },
        {
            txt: '',
            size: 40,
            color: 'white',
            x: 250,
            y: 200,
        },
        {
            txt: '',
            size: 40,
            color: 'white',
            x: 250,
            y: 400,
        },
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(text, selectedLine) {
    gMeme.lines[selectedLine].txt = text
}

function setFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(fontSize) {
    gMeme.lines[gMeme.selectedLineIdx].size += fontSize
}

function addLine() {
    if (gMeme.lines.length >= 3) return
    const line = {
        txt: 'Your text here',
        size: 40,
        color: 'white',
        x: 250,
        y: 400
    }
    if (gMeme.lines.length === 2) line.y = 200
    gMeme.lines.push(line)
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
}

function moveLine(axis, num) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]

    if (axis === 'y') selectedLine.y += num
    else if (axis === 'x') selectedLine.x += num
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

function saveMeme() {
    const savedMeme = JSON.parse(JSON.stringify(gMeme))
    savedMeme.id = makeId()
    gSavedMemes.push(savedMeme)
    saveToLocalStorage(STORAGE_KEY, gSavedMemes)
}

function getMemeById(memeId) {
    const memeObj = gSavedMemes.find(meme => meme.id === memeId)
    return memeObj
}

function getSavedMemes() {
    return gSavedMemes
}

function editMeme(memeId) {
    const editedMeme = getMemeById(memeId)
    Object.assign(gMeme, editedMeme)
    setTimeout(renderMeme(), 4000)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function uploadImgToFacebook(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function setSelectedLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
    document.getElementById("text-input").value = gMeme.lines[lineIdx].txt
}

function removeSavedMeme(memeId) {
    const removedMemeIndex = gSavedMemes.findIndex(gMeme => gMeme.id === memeId)
    if (removedMemeIndex !== -1) gSavedMemes.splice(removedMemeIndex, 1)
    saveToLocalStorage(STORAGE_KEY, gSavedMemes)
}  