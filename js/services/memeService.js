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
  const { lines, selectedLineIdx: idx } = gCurrMeme
  console.log(idx);
  lines[idx].txt = val
}

function memeServiceSetImg(imgID) {
  createMeme(imgID)
}

function ChangColor(color) {
  const { selectedLineIdx: idx } = gCurrMeme
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
    lines: [{ txt: 'Add Text Here ', size: 30, color: 'black' }],
  }
  gCurrMeme = meme
}

function getByIdx(currX) {
  const { lines } = gCurrMeme
  console.log(lines)
  const idx = lines.findIndex((line) => line.x === currX)
  return idx
}
