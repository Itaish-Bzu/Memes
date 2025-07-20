'use strict'
const MEMES = 'memesDB'
const IMAGES = 'imagesDB'

let gCurrMeme
let gImgs
let gIdx = 1
let gMems = []


_createImgs()
saveToStorage(IMAGES, gImgs)


var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getImg(idx) {
  return gImgs.find((img) => img.id === idx)
}

function getMeme() {
  return gCurrMeme
}

function setLineTxt(val) {
  const line = getLine()
  line.txt = val
}

function memeServiceSetImg(imgID) {
  createMeme(imgID)
}

function ChangColor(color) {
  const line = getLine()
  line.color = color
}

function changeSize(val) {
  const line = getLine()
  line.size += val
}

function addTxt() {
const{lines}= gCurrMeme
let idx = lines.length
  const line = {
    txt: 'Add Text Here ',
    size: 30,
    color: 'black',
    txtAlign: 'left',
    x: gCanvas.width / 4,
    y: ++idx* 40,
  }
  gCurrMeme.lines.push(line)
  gCurrMeme.selectedLineIdx++
}

function switchLine() {
  const { lines } = gCurrMeme
  const lastIdx = lines.length - 1
  gCurrMeme.selectedLineIdx--

  if (gCurrMeme.selectedLineIdx < 0) gCurrMeme.selectedLineIdx = lastIdx
}

function getByIdx(currX) {
  const { lines } = gCurrMeme
  const idx = lines.findIndex((line) => line.y === currX)
  return idx
}

function getAlign(position) {
  const line = getLine()
  if (position === 'right'){
    line.x = gCanvas.width / 2
  }else if (position === 'left'){
    line.x = gCanvas.width /gCanvas.width
  }else{
    line.x = gCanvas.width / 4
  }
}

function fontChange(val) {
  const line = getLine()
  line.font = val
}

function deleted() {
  const { lines, selectedLineIdx: idx } = getMeme()
  if (lines.length === 1) return
  lines.splice(idx, 1)
  gCurrMeme.selectedLineIdx--
}

function changPosition(diff) {
  if (!diff) return
  const line = getLine()
  line.y += diff
}

function getLine() {
  return gCurrMeme.lines[gCurrMeme.selectedLineIdx]
}

function savingMeme() {
  gMems.push(gCurrMeme)
  saveToStorage(MEMES, gMems)
}

function getImgs(filter) {
  if (!filter) gImgs
  let imgs = gImgs.slice()

  if (filter) {
    const regexTxt = new RegExp(filter, 'i')
    imgs = imgs.filter((img) => regexTxt.test(img.keywords))
  }

  return imgs
}


function getSaveMeme() {
  const memes = loadFromStorage(MEMES)
  if (!memes) return false
  const imgs = []

  memes.forEach((meme) => {
    const img = getImg(meme.selectedImgId)
    imgs.push(img)
  })

  return imgs
}

 function deleteMeme(id){
    const memes = loadFromStorage(MEMES)
      const memeIdx = memes.findIndex((meme) => meme.selectedImgId === id)
      gMems.splice(memeIdx, 1)
      saveToStorage(MEMES,  gMems)
 }

function findMeme(id) {
  const memes = loadFromStorage(MEMES)
  const meme = memes.find((meme) => meme.selectedImgId === id)

  gCurrMeme = meme
}

function isTxtClicked(pos) {
  const { lines } = getMeme()
  const clickedTxt = lines.find((line) => {
    const width = gCtx.measureText(line.txt).width
    return (
      pos.x >= line.x &&
      pos.x <= line.x + width &&
      pos.y >= line.y - 50 &&
      pos.y <= line.y
    )
  })
  return clickedTxt
}



function moveTxt(dx, dy){
  const line = getLine()
      line.x += dx
    line.y += dy
}

 function setTxtDrag(isDrag){
  gCurrMeme.isDrag = isDrag
 }

function createMeme(id) {
  const meme = {
    selectedImgId: id,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'Add Text Here ',
        size: 30,
        color: 'black',
        txtAlign: 'left',
        x: gCanvas.width / 4,
        y: 40,
      },
    ],
  }
  gCurrMeme = meme
}


function _createImgs() {
  gImgs = []
  for (var i = 0; i < 18; i++) {
    const img = createImg()
    gImgs.push(img)
  }
}

function createImg() {
  const img = {
    id: gIdx,
    url: `img/${gIdx}.jpg`,
    keywords: [_createKeyword()],
  }
  gIdx++
  return img
}

function _createKeyword() {
  const keywords = ['funny', 'funny', 'sarcastic', 'crazy', 'sad']
  const idx = getRandomIntInclusive(0, keywords.length)
  return keywords[idx]
}
