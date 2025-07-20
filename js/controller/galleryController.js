'use strict'

let gFilter = ''


function onShowGallery() {
  show('gallery')
 if(document.querySelector('body').classList.contains('menu-open')) toggleMenu()
}

function renderGallery() {
  const imgs = getImgs(gFilter)
  const upLoad = `	<input  class="btn" onchange="onImgInput(event)" type="file" accept=".jpg, .jpeg, .png, .webp" 	class="file-input btn" id="file-input" name="image"/>`

  const strHTML = imgs.map((img) => {
    return `<img src="${img.url}" onclick="onImgSelect(${img.id})" data-keys= ${img.keywords} >`
  })

  document.querySelector('.gallery-photo').innerHTML = upLoad + strHTML.join('')
}

function onImgSelect(imgID) {
  memeServiceSetImg(+imgID)
  renderMeme()
  show('editor')
}

function onRandom() {
  const imgID = getRandomIntInclusive(1, gImgs.length)
  onImgSelect(imgID)
if(document.querySelector('body').classList.contains('menu-open')) toggleMenu()
}

function onChoseFilter(val) {
  gFilter = val
  renderGallery('gallery')
}

function onSaveMemes() {
  const imgs = getSaveMeme()
  const elContainer = document.querySelector('.saved-imgs')

  if (!imgs) {
    elContainer.innerText = 'No saved Images'
  } else {
    let strHTML = imgs.map((img) => {
      return `<img src="${img.url}" onclick="onGetImg(${img.id})" data-keys= ${img.keywords} >
      <button onclick="onDeleteMeme(${img.id})">Delete<button>`
    })

    elContainer.innerHTML = strHTML.join('')
  }
  show('saved-imgs')
  if(document.querySelector('body').classList.contains('menu-open')) toggleMenu()
}
function onDeleteMeme(id) {
  deleteMeme(id)
  onSaveMemes()
}

function onGetImg(imgID) {
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

function onImgInput(ev) {
  loadImageFromInput(ev, createImg)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  let idx = gImgs.length

  reader.onload = (event) => {
    const img = new Image()
    img.src = event.target.result

    img.onload = () => {
      onImageReady(img)
    }
  }

  reader.readAsDataURL(ev.target.files[0])
}

function createImg(img) {
  let idx = gImgs.length
  const uploadImg = { id: ++idx, url: img.src, keywords: ['happy', 'dog'] }

  gImgs.push(uploadImg)
  saveToStorage(IMAGES, gImgs)
  renderGallery()
}

