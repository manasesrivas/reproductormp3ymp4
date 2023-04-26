const audio = document.getElementById("audio")
const nameH = document.getElementById("name")
const select = document.getElementById("select")
const playImg = document.getElementById("play")
const after = document.getElementById("after")
const next = document.getElementById("next")
const disco = document.querySelector(".disco")


// index de la lista
let value = 0

// nombres de las canciones disponibles
let lista = ["las mañanitas.mp3","blutu.mp3","ciudad esmeralda.mp3","celular.mp3","La Vaca Lola.mp3"]



// valores iniciales con el que comenzará el reproductor

audio.src = "./music/" + lista[value]
nameH.textContent = name(lista[value])
// select.value = name(lista[value])



// funcion para quitar .mp3 de el nombre de la cancion

function name(name){
    return name.split('.').shift()
}


// registra el evento cuando se cambie la musica en la playlist
// select.addEventListener("change", () => {
//     audio.src = "./music/"+select.value+".mp3"
//     nameH.textContent = select.value
//     playImg.src = "./css/images/pause.svg"

//     audio.play()
// })

//funcion para controlar el giro del disco o imagen y el boton de play

const playlist = document.querySelectorAll(".playList")
const columns = document.querySelector(".columns")

const section = document.querySelector(".container")
playlist.forEach(boton => {
    boton.addEventListener("click", () =>{
        columns.classList.toggle("trasladar")
})
})



window.addEventListener("load", () =>{
    section.classList.add("mostrarSection")
})



// boton para cambiar a la anterior cancion

after.addEventListener("click", () => {
    value -= 1
    if(value == -1){
        value = 4
    }
    audio.src = "./music/" + lista[value]
    nameH.textContent = name(lista[value])
    disco.classList.add("girar")
    
    // select.value = name(lista[value])

    playImg.src = "./css/images/pause.svg"

    audio.play()
})

// boton para pausar y play a la cancion

playImg.addEventListener("click", () =>{
    if(audio.paused || audio.ended){
        playImg.src = "./css/images/pause.svg"
        disco.classList.toggle("girar")
        audio.play()
    }
    else{
        playImg.src = "./css/images/play.svg"
        disco.classList.toggle("girar")
        audio.pause()
    }
})

// boton para cambiar a la siguiente cancion

next.addEventListener("click", () =>{
    value += 1
    if(value == 5){
        value = 0
    }
    audio.src = "./music/" + lista[value]
    nameH.textContent = name(lista[value])
    // select.value = name(lista[value])

    playImg.src = "./css/images/pause.svg"
    disco.classList.add("girar")
    audio.play()
})
    


audio.addEventListener("timeupdate", (e) =>{
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    let progressBar = document.querySelector(".barra")
    progressBar.style.width = progressWidth+"%"

    audio.addEventListener("loadeddata", ()=>{
        let audioDuration = audio.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if(totalSec < 10){
            totalSec = "0"+totalSec
        }
        let musicDuration = document.querySelector(".duracion")
        musicDuration.innerText = totalMin + ":" + totalSec
    })

    let currrentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)

    if(currentSec < 10){
        currentSec = "0" + currentSec
    }
    let musicCurrentTime = document.querySelector(".current")
    musicCurrentTime.innerText = currrentMin+":"+currentSec 
})

const progressArea = document.querySelector(".barraArea")

//registra el evente en que parte se hizo click para mover la barra hacia el punto en el que se hizo click
progressArea.addEventListener("click", (e) =>{
    playImg.src = "./css/images/pause.svg"
    disco.classList.add("girar")

    let progressWidthVal = progressArea.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = audio.duration

    audio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration
    //comienza reproducir
    audio.play()
})



