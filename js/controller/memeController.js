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
  if (!getMeme())return
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

    renderRect()
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

function drawText(txt, color, size, x, y, txtAlign , font = 'ariel') {
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
}

function drawRect(x, y, width, height,  ) {
  gCtx.beginPath()
  gCtx.lineWidth = 3
  gCtx.strokeStyle = 'white'
  gCtx.rect(x, y, width, height)
  gCtx.stroke()
}

function renderRect() {
  const line = getLine()
   if(!line)return
  let x = line.x
  const align = line.txtAlign
  const space = 10
  const width = gCtx.measureText(line.txt).width  

 if (align ==='center'){
    x -= width/2
 }else if(align ==='right')
  x -= width
  
  drawRect(x, line.y - line.size, width, line.size + space)
}

function onTextEdit(ev) {
  const { offsetX, offsetY } = ev   

  const clickedTxt =  isTxtClicked({x:offsetX,y:offsetY})

  // console.log(clickedTxt);
  if (clickedTxt) {
    
    const idx = getByIdx(clickedTxt.y)
     
    const meme = getMeme()
    meme.selectedLineIdx = idx
    document.querySelector('.canvas-editor').querySelector("[name=text]").
    value = clickedTxt.txt
     renderMeme()
     
  } else return
}

function onPosition(diff){
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
  savingMeme()
}

function onUploadToFB() {
  
    const canvasData = gCanvas.toDataURL('image/jpeg') 
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    uploadImg(canvasData, onSuccess)
}


