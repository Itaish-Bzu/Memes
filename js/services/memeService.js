'use strict'
const MEMES = 'memesDB'

let gCurrMeme
let gIdx = 1
let gMems = []

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'president'] },
  { id: 2, url: 'img/2.jpg', keywords: ['happy', 'dog'] },
  { id: 3, url: 'img/3.jpg', keywords: ['happy', 'dog'] },
  { id: 4, url: 'img/4.jpg', keywords: ['happy', 'cat'] },
  { id: 5, url: 'img/5.jpg', keywords: ['funny', 'boy'] },
  { id: 6, url: 'img/6.jpg', keywords: ['sarcastic', 'men'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny', 'boy'] },
  { id: 8, url: 'img/8.jpg', keywords: ['funny', 'men'] },
  { id: 9, url: 'img/9.jpg', keywords: ['funny', 'boy'] },
  { id: 10, url: 'img/10.jpg', keywords: ['happy', 'president'] },
  { id: 11, url: 'img/11.jpg', keywords: ['sarcastic', 'kiss'] },
  { id: 12, url: 'img/12.jpg', keywords: ['crazy', 'men'] },
  { id: 13, url: 'img/13.jpg', keywords: ['sarcastic', 'men'] },
  { id: 14, url: 'img/14.jpg', keywords: ['crazy', 'men'] },
  { id: 15, url: 'img/15.jpg', keywords: ['sad', 'men'] },
  { id: 16, url: 'img/16.jpg', keywords: ['funny', 'men'] },
  { id: 17, url: 'img/17.jpg', keywords: ['crazy', 'president'] },
  { id: 18, url: 'img/18.jpg', keywords: ['sad', 'movie'] },
]

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

function increase(val) {
  const line = getLine()
  line.size += val
}


function addTxt() {

  const line = {
    txt: 'Add Text Here ',
    size: 30,
    color: 'black',
    txtAlign: 'left',
    x: gCanvas.width / 4,
    y: gIdx  * 40,

  }
  gIdx++
  gCurrMeme.selectedLineIdx++
  gCurrMeme.lines.push(line)
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
  line.txtAlign = position
   


}

function fontChange(val) {
  const line = getLine()
  line.font = val
}

function deleted() {
  const { lines, selectedLineIdx: idx } = getMeme()
  lines.splice(idx, 1)
  gCurrMeme.selectedLineIdx--
}

function changPosition(diff){
   if (!diff)return
    const line = getLine()
    line.y += diff
  }

function getLine() {
  return gCurrMeme.lines[gCurrMeme.selectedLineIdx]
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
        x: gCanvas.width / 4 ,
        y: gIdx * 40,
      },
    ],
  }
  gIdx++
  gCurrMeme = meme
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

function saveMeme() {
  const memes = loadFromStorage(MEMES) 
  if (!memes) return
  const imgs = []

  memes.forEach((meme) => {
    const img = getImg(meme.selectedImgId)
    imgs.push(img)
  })

  return imgs
}

function findMeme(id){
  const memes = loadFromStorage(MEMES)
  const meme = memes.find(meme=> meme.selectedImgId === id)
   
   gCurrMeme = meme
}

function isTxtClicked(pos){

  const { lines } = getMeme()
  const clickedTxt = lines.find((line) => {
    const width = gCtx.measureText(line.txt).width
    return ( 
      
      pos.x >= line.x &&  pos.x <= line.x + width 
      && pos.y >= line.y-50 && pos.y <= line.y
      
    )
  })
  return clickedTxt
}