'use strict'

let gCanvas
let gCtx

function onInit() {
  gCanvas = document.querySelector('.canvas')
  gCtx = gCanvas.getContext('2d')
  resizeCanvas()
  renderMeme()
}

function renderMeme() {
  const { selectedImgId: memeId, selectedLineIdx: lineIdx, lines } = getMeme()
  const { id, url, keyWords } = getImg(memeId)
  let img = urlToImg(url)
  renderImg(img)
  console.log(lines[lineIdx])

  const { txt, color } = lines[lineIdx]
  renderTxt(txt, color)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gCanvas.width = elContainer.clientWidth - 40
}

function urlToImg(url) {
  const img = new Image()
  img.src = url
  return img
}

function renderImg(img) {
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  }
}

function renderTxt(txt, color) {
  gCtx.illStyle = color
  gCtx.fillText(txt, 100, 100)
}

function onSetLineTxt(val) {
  setLineTxt(val)
}
