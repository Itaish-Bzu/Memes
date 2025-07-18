'use strict'



function onShowGallery(){
  document.querySelector('.gallery').style.display = 'block'
  const elEditor = document.querySelector('.editor')
  elEditor.style.display = 'none'
   toggleMenu()
}


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

function onRandom(){
    const elGallery =document.querySelector('.gallery')
  if(elGallery.style.display === 'none') return
 const imgID = getRandomIntInclusive(1, gImgs.length)
 onImgSelect(imgID)
 toggleMenu()
}


