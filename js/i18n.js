'use strict'

var gCurrLang = 'en'

const gTrans = {
    gallery: {
        en: 'Gallery',
        he: 'גלריה',
    },
    savedmemes: {
        en: 'Saved',
        he: 'שמורים',
    },
    addline: {
        en: 'Add Line',
        he: 'הוסף שורה',
    },
    switchline: {
        en: 'Switch Line',
        he: 'החלף שורה',
    },
    clearframe: {
        en: 'Remove frame before download',
        he: 'הסר מסגרת לפני הורדה',
    },
    download: {
        en: 'Download',
        he: 'הורדה',
    },
    savememe: {
        en: 'Save Meme',
        he: 'שמור מימ',
    },
    share: {
        en: 'Share on Facebook',
        he: 'שתף בפייסבוק',
    },
    input: {
        en: 'Write Something',
        he: 'כתוב משהו',
    },
    color: {
        en: 'Color',
        he: 'צבע',
    },
    nosaves: {
        en: `No saved Meme's`,
        he: 'אין ממים שמורים',
    }
}


function getTrans(transKey) {
    // get from gTrans
    var transMap = gTrans[transKey]
    // if key is unknown return 'UNKNOWN'
    if (!transMap) return 'UNKNOWN'
    var transTxt = transMap[gCurrLang]
    // If translation not found - use english
    if (!transTxt) transTxt = transMap.en
    return transTxt
}


function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const transTxt = getTrans(transKey)

        // support placeholder
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function setLang(lang) {
    gCurrLang = lang
}