'use strict'

var gCurrMeme 

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
  { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog'] },
]

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getImg(idx) {
  return gImgs.find((img) => img.id === idx)
}

function getMeme() {
  return gCurrMeme 
}

function setLineTxt(val) {
  const { lines,selectedLineIdx:idx} = gCurrMeme 
  lines[idx].txt = val 
}

function memeServiceSetImg(imgID) {  
  createMeme(imgID)
}

function createMeme(id){
  const meme = {
    selectedImgId: id,
    selectedLineIdx: 0, 
    lines: [{ txt: 'Add Text Here ', size: 30, color: 'black' }]
  }
   gCurrMeme = meme
}