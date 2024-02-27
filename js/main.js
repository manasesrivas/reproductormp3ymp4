const audios = [
    {
        titulo: 'Tiene espinas el rosal',
        cancion: 'tiene-espinas-el-rosal.mp3',
        poster: 'tiene-espinas-el-rosal.jpg',
        cantante: 'Grupo cañaveral'
    },
    {
        titulo: 'Labios compartidos',
        cancion: 'Labios-compartidos.mp3',
        poster: 'Labios-compartidos.jpg',
        cantante: 'Mana'
    },
    {
        titulo: 'Como te voy a olvidar',
        cancion: 'como-te-voy-a-olvidar.mp3',
        poster: 'como-te-voy-a-olvidar.jpg',
        cantante: 'Angeles azules'
    },
    {
        titulo: 'Me gustas tu',
        cancion: 'me-gustas-tu.mp3',
        poster: 'me-gustas-tu.jpg',
        cantante: 'manu chao'
    },
    {
        titulo: 'Her majesty',
        cancion: 'her-majesty.mp3',
        poster: 'her-majesty.jpg',
        cantante: 'the beatles'

    },
    {
        titulo: 'Mockinbird',
        cancion: 'mockinbird.mp3',
        poster: 'mockinbird.jpg',
        cantante: 'Eminem'
    },
    {
        titulo: 'La costa del silencio',
        cancion: 'la-costa-del-silencio.mp3',
        poster: 'la-costa-del-silencio.jpg',
        cantante: 'Mago de oz'
    },
    {
        titulo: 'Abrazos que curan',
        cancion: 'abrazos-que-curan.mp3',
        poster: 'abrazos-que-curan.jpg',
        cantante: 'Mago de oz'
    },
    {
        titulo: 'Psicososial',
        cancion: 'psicosocial.mp3',
        poster: 'psicosocial.jpg',
        cantante: 'sliknot'
    },

]


const audio = document.getElementById('audio');
const play = document.querySelector('.play');
const poster = document.querySelector('.poster-img')
const containerButton = document.querySelector('.column')
const title = document.querySelector('.title')
const author = document.querySelector('.author')
const widgets = document.querySelector('.widgets')
const modal = document.querySelector('.modal')

const dates = document.querySelector('.container-data-audio')


const background = document.querySelector('.overlay')

const height = poster.clientHeight
const width = poster.clientWidth

let indice = 0
let indiceAnterior = indice

let repeat = false
let randomMusicState = false
let quitarReprodudir =  true

const repeatTag = document.querySelector('#repeat')
const shuffleTag = document.querySelector('#shuffle')


// FUNCIONES INICIO

const timeUpdate = (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration 
    let progressWidth = (currentTime / duration) * 100
    let progressBar = document.querySelector('.range-audio')
    progressBar.style.width = `${progressWidth}%`
    
    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)

    if(currentSec < 10){
        currentSec = `0${currentSec}`
    }
    let musicCurrentTime = document.querySelector('.current')
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`
}


const playAudio = ()  => {
    if(audio.paused || audio.ended){
        play.src = './img/pause.svg'
        audio.play()
        quitarReprodudir = false
    }
    else{
        play.src = './img/play.svg'
        audio.pause()
        quitarReprodudir = true
    }
    playingNow()
}

const loadData = () => {
    let audioDuration  = audio.duration
    let totalMin = Math.floor(audioDuration / 60)
    let totalSec = Math.floor(audioDuration % 60)
    if(totalSec < 10){
        totalSec = `0${totalSec}`
    }
    let musicDuration = document.querySelector('.duration')
    musicDuration.innerText = `${totalMin}:${totalSec}`
}


const playingNow = () => {
    document.querySelectorAll('.sound').forEach(sound => {
        let durationTag = sound.querySelector('.duration-play-list')
        if(parseInt(sound.getAttribute('data-index')) === indice) {
            sound.classList.add('playing')
            if(quitarReprodudir){
                durationTag.innerText = durationTag.getAttribute('data-duration')
            }
            else{
                durationTag.innerText = 'REPRODUCIENDO'
            }
        }
        else{
            sound.className = 'sound'
            durationTag.innerText = durationTag.getAttribute('data-duration')
        }
    })
}

const start = (cancion, starting) => {
    indiceAnterior = cancion
    audio.src = `./audio/${audios[cancion].cancion}`
    poster.classList.toggle('rotateImg')
    poster.src = `./img/${audios[cancion].poster}`
    title.innerText = audios[cancion].titulo.split('.mp3').shift()
    author.innerText = audios[cancion].cantante
    dates.classList.add('changePosition')
    background.style = `
    background: url("./img/${audios[cancion].poster}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    `
    let progressBar = document.querySelector('.range-audio')
    progressBar.style.width = '0%'
    playingNow()
    
    if(starting){
        audio.play()
        play.src = `./img/pause.svg`
    }  
    setTimeout(()=> {
        dates.classList.remove('changePosition')
    }, 100)
}



const clicked = (element) => {
    indice = parseInt(element.getAttribute('data-index'))
    quitarReprodudir = false
    start(indice, true)
}


// FUNCIONES FIN

window.addEventListener('load', () => {
    document.querySelectorAll('.illustration').forEach(function(element, indi) {
        setTimeout(function() {
            element.classList.add('normal')
        }, indi * 300); // Retraso en milisegundos basado en el índice
    })
    start(indice, false)
})


poster.addEventListener('mousemove', (event) => {
    const {layerX, layerY} = event
    const yRotation = ((layerX - width / 2) / width) * 20
    const xRotation = ((layerY - height / 2) / height) * 20

    const string = `
    perspective(500px)
    scale(1.1)
    rotateX(${xRotation}deg)
    rotateY(${yRotation}deg)
    `

    poster.style.transform = string
    
})

poster.addEventListener('mouseout', () => {
    poster.style.transform = `
    perspective(500px)
    scale(1)
    rotateX(0)
    rotateY(0)`
})



audio.addEventListener('ended', () => {
    if(repeat){
        audio.currentTime = 0
        audio.play()
    }
    else if(randomMusicState){
        let ranIndex = Math.floor((Math.random() * (audios.length-1)) + 1)

        while(ranIndex === indice){
            ranIndex = Math.floor((Math.random() * (audios.length-1)) + 1)
        }

        indice = ranIndex
        start(indice, true)
    }
    else{
        if(indice >= 0 && indice < audios.length-1){
            indice++
            start(indice, true)
        }
    }

})

containerButton.addEventListener('click', (e) => {
    if(e.target.matches('img.button-controls')){
        switch(e.target.getAttribute('data-action')){
            case 'previous':
                indice--
                (indice < 0) ? indice=0: start(indice, !(audio.paused || audio.ended))
                break
            case 'play':
                playAudio();
                break;
            case 'next':
                indice++
                (indice > audios.length-1) ? indice=audios.length-1: start(indice, !(audio.paused || audio.ended))
                break
            case 'repeat':
                randomMusicState = false
                shuffleTag.src =  './img/shuffle.svg'
                repeat = !repeat
                if(repeat) e.target.src = './img/repeat.svg'
                else e.target.src = './img/noRepeat.svg'
                
                break;
            case 'random':
                repeat = false
                repeatTag.src =  './img/noRepeat.svg'
                randomMusicState = !randomMusicState
                if(randomMusicState) e.target.src = './img/shuffleOn.svg'
                else e.target.src = './img/shuffle.svg'
                break;
            case 'playList':
                // widgets.classList.add('quitar')
                modal.classList.add('mostrar')
                break
            case 'quitarModal':
        }
    }
})

const x = document.querySelector('.x').addEventListener('click', () => {
    modal.classList.remove('mostrar')
})







audio.addEventListener('timeupdate', (e) => {
    timeUpdate(e)
    audio.addEventListener('loadeddata', loadData)

})

const progressArea = document.querySelector('.area-range-audio')

progressArea.addEventListener('click', (e) => {
    let progressWidthVal = progressArea.clientWidth
    let clickedOffSetX = e.offsetX
    let soundDuration = audio.duration

    audio.currentTime = (clickedOffSetX / progressWidthVal) * soundDuration
})



const modalContainer = document.querySelector('.modal-container')

for(let index = 0; index < audios.length; index++) {
    let element = `                            
        <div class="sound" data-index="${index}" onClick="clicked(this)">
            <div class="img-title-play-list">
                <img src="./img/${audios[index].poster}" alt="" class="img-play-list">
                <div>
                    <p class="title-play-list">${audios[index].titulo}</p>
                    <p class="author-play-list">${audios[index].cantante}</p>
                </div>
            </div> 
            <audio class="${audios[index].cancion.split('.mp3').shift()}" src="./audio/${audios[index].cancion}"></audio>
            <p class="duration-play-list" id="${audios[index].cancion.split('.mp3').shift()}"></p>
    </div>`
    modalContainer.insertAdjacentHTML('beforeend', element)

    let pTag = document.querySelector(`#${audios[index].cancion.split('.mp3').shift()}`)
    let audioDur = document.querySelector(`.${audios[index].cancion.split('.mp3').shift()}`)
    
    audioDur.addEventListener('loadeddata', () =>{
        let audioDuration  = audioDur.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if(totalSec < 10){
            totalSec = `0${totalSec}`
        }
        pTag.innerText = `${totalMin}:${totalSec}`
        pTag.setAttribute('data-duration', `${totalMin}:${totalSec}`)
    })
}


