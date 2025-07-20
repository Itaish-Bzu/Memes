'use strict'

let gCanvas
let gCtx
let gisRemoveMode = false

let gSetCircleDrag = false
let gPrevPos

function onInit() {
  gCanvas = document.querySelector('.canvas')
  gCtx = gCanvas.getContext('2d')
  renderGallery()
  renderMeme()
  window.addEventListener('resize', resizeCanvas)
}

function renderMeme() {
  if (!getMeme()) return
  const { selectedImgId: memeId, lines } = getMeme()
  const { url } = getImg(memeId)
  let img = urlToImg(url)

  img.onload = () => {
    gCanvas.height = (img.naturalHeight / img.naturalWidth) * gCanvas.width
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

    lines.forEach((line) => {
      const { txt, color, size, txtAlign, font } = line
      drawText(txt, color, size, line.x, line.y, txtAlign, font)
    })
    if (!gisRemoveMode) renderRect()
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

function drawText(txt, color, size, x, y, txtAlign, font = 'ariel') {
  gCtx.beginPath()
  gCtx.lineWidth = 1
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${font}`
  gCtx.fontWeight = `bold`
  gCtx.textAlign = txtAlign
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
  gisRemoveMode = true
  renderMeme()
  const dataUrl = gCanvas.toDataURL()

  elLink.href = dataUrl
  gisRemoveMode = false

  gisRemoveMode = true
}

function onChangColor(color) {
  ChangColor(color)
  renderMeme()
}

function onchangeFontSize(val) {
  changeSize(+val)
  renderMeme()
}

function onAddTxt() {
  addTxt()
  renderMeme()
}

function onSwitch() {
  switchLine()
  renderMeme()
}

function drawRect(x, y, width, height) {
  gCtx.beginPath()
  gCtx.lineWidth = 3
  gCtx.strokeStyle = 'white'
  gCtx.rect(x, y, width, height)
  gCtx.stroke()
}

function renderRect() {
  const line = getLine()
  if (!line) return
  let x = line.x
  const align = line.txtAlign
  const space = 10
  const width = gCtx.measureText(line.txt).width

  if (align === 'center') {
    x -= width / 2
  } else if (align === 'right') x -= width

  drawRect(x, line.y - line.size, width, line.size + space)
}

function onPosition(diff) {
  changPosition(+diff)

  renderMeme()
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

function onSave() {
  gisRemoveMode = true
  renderMeme()
  savingMeme()
  gisRemoveMode = false
}

function onUploadToFB() {
  const canvasData = gCanvas.toDataURL('image/jpeg')
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    )
  }
  uploadImg(canvasData, onSuccess)
}


function getEvPos(ev) {
  const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function onDown(ev) {
  const pos = getEvPos(ev)

  if (!isTxtClicked(pos)) return

  const clickedTxt = isTxtClicked(pos)
  const idx = getByIdx(clickedTxt.y)
  const meme = getMeme()
  meme.selectedLineIdx = idx
  document.querySelector('.canvas-editor').querySelector('[name=text]').value = clickedTxt.txt



  setTxtDrag(true)
  gPrevPos = pos

}

function onMove(ev) {
  const { isDrag } = getMeme()
  if (!isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gPrevPos.x
  const dy = pos.y - gPrevPos.y
  moveTxt(dx, dy)

  gPrevPos = pos

  renderMeme()
}

function onUp() {
  setTxtDrag(false)
}
