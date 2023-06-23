'use strict'
const savedMemes = []
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 30,
            color: 'white',
            x: 250,
            y: 50,
        },
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(text, selectedLine) {
    const meme = getMeme()
    meme.lines[selectedLine].txt = text

}

function setFontColor(color) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = color
}

function setFontSize(fontSize) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].size += fontSize

    // if (meme.lines[gSelectedLine].size < 10 || meme.lines[gSelectedLine].size > 48) return
}

function addLine() {
    const meme = getMeme()
    if (meme.lines.length >= 2) return
    const line = {
        txt: '',
        size: 30,
        color: 'white',
        x: 250,
        y: 400
    }
    meme.lines.push(line)
    console.log(meme.lines)
}

function switchLine() {
    const meme = getMeme()
    meme.selectedLineIdx = meme.selectedLineIdx === 0 ? 1 : 0
    console.log(meme.selectedLineIdx)
}

function moveLine(axis, num) {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

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
    const meme = getMeme()
    savedMemes.push(meme)
    console.log(savedMemes);
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
    const meme = getMeme()
    meme.selectedLineIdx = lineIdx
    document.getElementById("text-input").value = meme.lines[lineIdx].txt
}

