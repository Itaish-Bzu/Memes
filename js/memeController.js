'use strict'

let gCanvas
let gCtx

function onInit() {
  gCanvas = document.querySelector('.canvas')
  gCtx = gCanvas.getContext('2d')
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  renderMeme()
}

function renderMeme() {
  const { selectedImgId: memeId, selectedLineIdx: lineIdx, lines } = getMeme()
  const { id, url, keyWords } = getImg(memeId)
  let img = urlToImg(url)
  const { txt, color, size } = lines[lineIdx]

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    drawText(txt, color, size, lineIdx)
  }
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

function drawText(txt, color, size, idx) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'white'
  gCtx.fillStyle = `${color}`
  gCtx.font = `${size}px Arial`
  gCtx.fontWeight = `bold`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'alphabetic'

  if (idx === 0) {
    gCtx.fillText(txt, 300, size)
    gCtx.strokeText(txt, 300, size)
  } else if (idx === 1) {
    gCtx.fillText(txt, 100, gCanvas.height - size * 2)
    gCtx.strokeText(txt, 100, gCanvas.height - size * 2)
  } else {
    gCtx.fillText(txt, 100, gCanvas.height / 2)
    gCtx.strokeText(txt, 100, gCanvas.height / 2)
  }
}

function onSetLineTxt(val) {
  setLineTxt(val)
  renderMeme()
}
