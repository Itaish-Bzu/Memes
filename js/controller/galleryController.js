'use strict'

let gFilter = ''

function onShowGallery() {
  show('gallery')
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
  renderMeme()
  show('editor')
}

function onRandom() {

  const imgID = getRandomIntInclusive(1, gImgs.length)
  onImgSelect(imgID)

}

function onChoseFilter(val) {
  gFilter = val
  renderGallery('gallery')
}

function onMemes() {
  const imgs = saveMeme()
  let strHTML = imgs.map((img) => {
    return `<img src="${img.url}" onclick="onGetImg(${img.id})" data-keys= ${img.keywords} >`
  })
   const elContainer = document.querySelector('.saved-imgs')
  if (imgs){
    elContainer.innerHTML = strHTML.join('')
  }else{
     elContainer.innerText ='No saved Images'
  }
 show('saved-imgs')
}

function onGetImg(imgID){
  findMeme(imgID)
  renderMeme()
  show('editor')
}

function toggleMenu() {
  let elBody = document.querySelector('body')
  elBody.classList.toggle('menu-open')
}

function show(name) {
  const classLists = ['saved-imgs', 'editor', 'gallery']
  const filteredList = classLists.filter((classList) => {
    return classList !== name
  })
  filteredList.forEach((item) => {
    document.querySelector(`.${item}`).classList.add('hide')
  })

  document.querySelector(`.${name}`).classList.remove('hide')
}
