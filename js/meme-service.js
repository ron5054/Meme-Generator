'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            x: 150,
            y: 150
        },
        {
            txt: 'I sometimes eat Falafel2',
            size: 20,
            color: 'red',
            x: 150,
            y: 300
        }
    ]
}


function getMeme() {
    return gMeme
}