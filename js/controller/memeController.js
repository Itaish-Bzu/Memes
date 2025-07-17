'use strict'

let gCanvas
let gCtx

function onInit() {
  gCanvas = document.querySelector('.canvas')
  gCtx = gCanvas.getContext('2d')

  window.addEventListener('resize', resizeCanvas)
  // renderMeme()
}

function renderMeme() {
  const { selectedImgId: memeId, selectedLineIdx: lineIdx, lines } = getMeme()
  const { url } = getImg(memeId)
  let img = urlToImg(url)
  const { txt, color, size } = lines[lineIdx]

  img.onload = () => {
    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
     gCanvas.height = (img.naturalHeight / img.naturalWidth) * gCanvas.width
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    const space = 30
    lines.forEach((line, idx) => {
      line.x = idx * space
      line.y = (idx + 1) * space
      drawText(txt, color, size, line.x, line.y)
    }) 
  }
  // resizeCanvas()

}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gCanvas.width = elContainer.clientWidth
}

function urlToImg(url) {
  const img = new Image()
  img.src = url
  return img
}

function drawText(txt, color, size, x, y) {
  gCtx.beginPath()
  gCtx.lineWidth = 1
  gCtx.strokeStyle = 'white'
  gCtx.fillStyle = color
  gCtx.font = `${size}px Arial`
  gCtx.fontWeight = `bold`
  gCtx.textAlign = 'left'
  gCtx.textBaseline = 'alphabetic'

  gCtx.fillText(txt, x, y)
  gCtx.strokeText(txt, x, y)
}

function onSetLineTxt(val) {
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
  
  setTimeout(renderRect, 200);
}

function drawRect(x, y, width, height){
  gCtx.beginPath()
  gCtx.lineWidth = 3
  gCtx.strokeStyle = 'black'
  gCtx.rect(x, y, width, height)
  gCtx.stroke()
  
}

function renderRect(){
const line = getLine() 
const width = gCtx.measureText(line.txt).width
drawRect(line.x,line.y-30, width, line.size + 5)
}

function onTextEdit(ev){
  const { offsetX, offsetY } = ev
   console.log(offsetX, offsetY );
   
  const {lines} = getMeme()
  const clickedTxt = lines.find(line => {
        const width = gCtx.measureText(line.txt).width
        // DONE: Find the only clicked star
        return (
            offsetX >= line.x && offsetX <= line.x + width &&
            offsetY >= line.x && offsetY <= line.y
        )
    })
    console.log(clickedTxt);
    console.log(clickedTxt.x);
    
     const idx = getByIdx(clickedTxt.x)
     console.log(idx);
     
     
     if (clickedTxt){
    const meme = getMeme()
    meme.selectedLineIdx = idx
    }else return

}