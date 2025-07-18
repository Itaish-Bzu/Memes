'use strict'

let gCanvas
let gCtx

function onInit() {
  gCanvas = document.querySelector('.canvas')
  gCtx = gCanvas.getContext('2d')
  renderGallery()
  window.addEventListener('resize', resizeCanvas)
 
}

function renderMeme() {
  const { selectedImgId: memeId, lines } = getMeme()
  const { url } = getImg(memeId)
  let img = urlToImg(url)

  img.onload = () => {
    gCanvas.height = (img.naturalHeight / img.naturalWidth) * gCanvas.width
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

    const space = 30
    lines.forEach((line, idx) => {
      line.x = idx * space
      line.y = (idx + 1) * space
      const { txt, color, size, alignment, font } = line
      drawText(txt, color, size, line.x, line.y, alignment, font)
    })
  }
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gCanvas.width = elContainer.clientWidth
  renderMeme()
}

function urlToImg(url) {
  const img = new Image()
  img.src = url
  return img
}

function drawText(txt, color, size, x, y, alignment = 'left', font = 'ariel') {
  gCtx.beginPath()
  gCtx.lineWidth = 1
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${font}`
  gCtx.fontWeight = `bold`
  gCtx.textAlign = alignment
  gCtx.textBaseline = 'alphabetic'

  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}

function onSetLineTxt(val) {
  if (!val) val = 'Add Text Here'
  setLineTxt(val)
  renderMeme()
}

function onDownland(elLink) {
  const dataUrl = gCanvas.toDataURL()
  elLink.href = dataUrl
}

function onChangColor(color) {
  ChangColor(color)
  renderMeme()
}

function onIncrease(val) {
  increase(+val)
  renderMeme()
}

function onAddTxt() {
  addTxt()
  renderMeme()
}

function onSwitch() {
  switchLine()
  renderMeme()
  setTimeout(renderRect, 200)
}

function drawRect(x, y, width, height) {
  gCtx.beginPath()
  gCtx.lineWidth = 3
  gCtx.strokeStyle = 'black'
  gCtx.rect(x, y, width, height)
  gCtx.stroke()
}

function renderRect() {
  const line = getLine()
  
  const width = gCtx.measureText(line.txt).width
  drawRect(line.x, line.y - 30, width, line.size + 5)
}

function onTextEdit(ev) {
  const { offsetX, offsetY } = ev
  const { lines } = getMeme()
  const clickedTxt = lines.find((line) => {
    const width = gCtx.measureText(line.txt).width
    return (
      offsetX >= line.x &&
      offsetX <= line.x + width &&
      offsetY >= line.x &&
      offsetY <= line.y
    )
  })

  if (clickedTxt) {
    const idx = getByIdx(clickedTxt.x)
    const meme = getMeme()
    meme.selectedLineIdx = idx
  } else return
}

function toggleMenu() {
  let elBody = document.querySelector('body')
  elBody.classList.toggle('menu-open')

  if (elBody.classList.contains('menu-open')) {
    document.querySelector('.btn-toggle').innerText = 'x'
  } else {
    document.querySelector('.btn-toggle').innerText = '☰'
  }
}

function onAlignment(position) {
  getAlign(position)
  renderMeme()
}

function onFontChange(val) {
  fontChange(val)
  renderMeme()
}

function onDeleted() {
  deleted()
  renderMeme()
}
