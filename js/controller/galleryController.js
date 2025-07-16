'use strict'

renderGallery()


function renderGallery() {
const imgs = gImgs
  const strHTML = imgs.map(img =>{
    return `<img src="${img.url}" onclick="onImgSelect(${img.id})" data-keys= ${img.keywords} >`})

  document.querySelector('.gallery-photo').innerHTML = strHTML.join('')
}

function onImgSelect(imgID) {    
memeServiceSetImg(+imgID)
  const elEditor = document.querySelector('.editor')
  elEditor.style.display = 'block'
  document.querySelector('.gallery').style.display = 'none'
   renderMeme()
}


