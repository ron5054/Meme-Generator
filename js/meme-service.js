'use strict'
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 30,
            color: 'white',
            x: 250,
            y: 50
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
        y: 450
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

