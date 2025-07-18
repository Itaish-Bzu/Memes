'use strict'

let gCurrMeme

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
  { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog'] },
  { id: 3, url: 'img/3.jpg', keywords: ['funny', 'dog'] },
  { id: 4, url: 'img/4.jpg', keywords: ['funny', 'dog'] },
  { id: 5, url: 'img/5.jpg', keywords: ['funny', 'dog'] },
  { id: 6, url: 'img/6.jpg', keywords: ['funny', 'dog'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny', 'dog'] },
  { id: 8, url: 'img/8.jpg', keywords: ['funny', 'dog'] },
  { id: 9, url: 'img/9.jpg', keywords: ['funny', 'dog'] },
  { id: 10, url: 'img/10.jpg', keywords: ['funny', 'dog'] },
  { id: 11, url: 'img/11.jpg', keywords: ['funny', 'dog'] },
  { id: 12, url: 'img/12.jpg', keywords: ['funny', 'dog'] },
  { id: 13, url: 'img/13.jpg', keywords: ['funny', 'dog'] },
  { id: 14, url: 'img/14.jpg', keywords: ['funny', 'dog'] },
  { id: 15, url: 'img/15.jpg', keywords: ['funny', 'dog'] },
  { id: 16, url: 'img/16.jpg', keywords: ['funny', 'dog'] },
  { id: 17, url: 'img/17.jpg', keywords: ['funny', 'dog'] },
  { id: 18, url: 'img/18.jpg', keywords: ['funny', 'dog'] },
]

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getImg(idx) {
  return gImgs.find((img) => img.id === idx)
}

function getMeme() {
  return gCurrMeme
}

function setLineTxt(val) {
  const { lines, selectedLineIdx: idx } = gCurrMeme
  console.log(idx)
  lines[idx].txt = val
}

function memeServiceSetImg(imgID) {
  createMeme(imgID)
}

function ChangColor(color) {
  const idx = gCurrMeme.selectedLineIdx
  gCurrMeme.lines[idx].color = color
}

function increase(val) {
  const { selectedLineIdx: idx } = gCurrMeme
  gCurrMeme.lines[idx].size += val
}

function addTxt() {
  const line = { txt: 'Add Text Here ', size: 30, color: 'black' }
  gCurrMeme.selectedLineIdx++
  gCurrMeme.lines.push(line)
}

function switchLine() {
  const { lines } = gCurrMeme
  const lastIdx = lines.length - 1
  gCurrMeme.selectedLineIdx--

  if (gCurrMeme.selectedLineIdx < 0) gCurrMeme.selectedLineIdx = lastIdx
}

function getLine() {
  return gCurrMeme.lines[gCurrMeme.selectedLineIdx]
}

function createMeme(id) {
  const meme = {
    selectedImgId: id,
    selectedLineIdx: 0,
    lines: [
      { txt: 'Add Text Here ', size: 30, color: 'black', alignment: 'left' },
    ],
  }
  gCurrMeme = meme
}

function getByIdx(currX) {
  const { lines } = gCurrMeme
  console.log(lines)
  const idx = lines.findIndex((line) => line.x === currX)
  return idx
}

function getAlign(position) {
  const { lines, selectedLineIdx: idx } = getMeme()
  lines[idx].alignment = position
}

function fontChange(val){  
   const { lines, selectedLineIdx: idx } = getMeme()
  lines[idx].font = val
}

function deleted(){
  const { lines, selectedLineIdx: idx } = getMeme()
  lines.splice(idx,1)
}

