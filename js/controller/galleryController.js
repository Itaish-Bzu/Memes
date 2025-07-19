'use strict'

let gFilter = ''

function onShowGallery() {
  toggleVisibility('editor')
  toggleVisibility('gallery')
  toggleMenu()
}

function renderGallery() {
  const imgs = getImgs(gFilter) 

  const strHTML = imgs.map((img) => {
    return `<img src="${img.url}" onclick="onImgSelect(${img.id})" data-keys= ${img.keywords} >`
  })

  document.querySelector('.gallery-photo').innerHTML = strHTML.join('')
}

function onImgSelect(imgID) {
  memeServiceSetImg(+imgID)

  toggleVisibility('editor')

  toggleVisibility('gallery')
  renderMeme()
}

function onRandom() {
  const elGallery = document.querySelector('.gallery')
  if (elGallery.style.display === 'none') return
  const imgID = getRandomIntInclusive(1, gImgs.length)
  onImgSelect(imgID)
  toggleMenu()
}

function onChoseFilter(val) {
  gFilter = val
  renderGallery()
}

// function onMemes(){
// const imgs = saveMeme()
//     const strHTML = imgs.map((img) => {
//     return `<img src="${img.url}" onclick="onImgSelect(${img.id})" data-keys= ${img.keywords} >`
//   })

//   // document.querySelector('.gallery').style.display = 'none'
//   // const elEditor = document.querySelector('.editor')
//   // elEditor.style.display = 'none'
// // const elSaved =  document.querySelector('.saved-imgs').style.display = 'block'
// document.querySelector('.saved-imgs').innerHTML = strHTML.join('')
// toggleVisibility('saved-imgs')

// }

function toggleVisibility(element) {
  document.querySelector(`.${element}`).classList.toggle('hide')
}
