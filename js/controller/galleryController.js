'use strict'

let gFilter = ''
let gImgIdx = 18

function onShowGallery() {
  show('gallery')
}

function renderGallery() {
  const imgs = getImgs(gFilter)
  const upLoad =`	<input  class="btn" onchange="onImgInput(event)" type="file" accept=".jpg, .jpeg, .png, .webp" 	class="file-input btn" id="file-input" name="image"/>`

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

}

function onChoseFilter(val) {
  gFilter = val
  renderGallery('gallery')
}

function onMemes() {
  const imgs = saveMeme()
  const elContainer = document.querySelector('.saved-imgs')
  
  if(!imgs) {
    elContainer.innerText ='No saved Images'
  }else{
    let strHTML = imgs.map((img) => {
      return `<img src="${img.url}" onclick="onGetImg(${img.id})" data-keys= ${img.keywords} >`
    })

    elContainer.innerHTML = strHTML.join('')
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


function onImgInput(ev) {
    loadImageFromInput(ev,  createImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
            onImageReady(img)
        }
    }

    reader.readAsDataURL(ev.target.files[0])

}

function createImg(){
  const upImg = 
  {id:gImgIdx++,
     url: 'img/19.jpg',
      keywords: ['happy', 'dog']}

      gImgs.push(upImg)
      renderGallery()
}