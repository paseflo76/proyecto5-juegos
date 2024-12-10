import { loadPage } from '../../../main'
import { createButton } from '../button/button'
import './three.css'

export function createThreeComponent() {
  const threeContainer = document.createElement('section')
  threeContainer.id = 'three'

  let turno = 'X'
  let tablero = Array(9).fill(null)
  let puntuacionX = parseInt(localStorage.getItem('threeX')) || 0
  let puntuacionO = parseInt(localStorage.getItem('threeO')) || 0

  const titulo = document.createElement('h2')
  titulo.textContent = 'Tres en Raya'

  const puntuaciones = document.createElement('div')
  puntuaciones.id = 'puntuaciones'
  puntuaciones.innerHTML = `
    <p>X: ${puntuacionX}</p>
    <p>O: ${puntuacionO}</p>
  `

  const tableroHTML = document.createElement('div')
  tableroHTML.id = 'tablero'

  const mensaje = document.createElement('p')
  mensaje.id = 'mensaje'
  mensaje.textContent = 'Turno de X'

  const actualizarPuntuaciones = () => {
    localStorage.setItem('threeX', puntuacionX)
    localStorage.setItem('threeO', puntuacionO)
    puntuaciones.innerHTML = `
      <p>X: ${puntuacionX}</p>
      <p>O: ${puntuacionO}</p>
    `
  }

  const comprobarGanador = () => {
    const combinacionesGanadoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (const combinacion of combinacionesGanadoras) {
      const [a, b, c] = combinacion
      if (
        tablero[a] &&
        tablero[a] === tablero[b] &&
        tablero[a] === tablero[c]
      ) {
        return tablero[a]
      }
    }

    // Detectar empate: si no hay celdas vacías y no hay ganador
    if (tablero.every((celda) => celda !== null)) {
      return 'Empate'
    }

    return null
  }

  const manejarClick = (index, celda) => {
    // Ignorar clics si la celda ya tiene un valor o si el juego terminó
    if (tablero[index] || comprobarGanador()) return

    tablero[index] = turno
    celda.textContent = turno

    const resultado = comprobarGanador()
    if (resultado) {
      if (resultado === 'Empate') {
        mensaje.textContent = '¡Es un empate!'
      } else {
        mensaje.textContent = `¡Ganador: ${resultado}!`
        if (resultado === 'X') puntuacionX++
        if (resultado === 'O') puntuacionO++
        actualizarPuntuaciones()
      }
      return
    }

    turno = turno === 'X' ? 'O' : 'X'
    mensaje.textContent = `Turno de ${turno}`
  }

  tablero.forEach((_, index) => {
    const celda = document.createElement('div')
    celda.className = 'celda'
    celda.addEventListener('click', () => manejarClick(index, celda))
    tableroHTML.appendChild(celda)
  })

  const reiniciarJuego = () => {
    tablero.fill(null)
    Array.from(tableroHTML.children).forEach(
      (celda) => (celda.textContent = '')
    )
    mensaje.textContent = 'Turno de X'
    turno = 'X'
  }
  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'buttonThree'
  // Crear el botón reutilizable para reiniciar
  const botonReiniciar = createButton(
    'Reiniciar',
    reiniciarJuego,
    'boton-reiniciar'
  )

  const backButton = createButton(
    'Volver al Menú',
    () => loadPage(), // Redirige al menú principal
    'back-button'
  )

  // Añadir los elementos al contenedor
  threeContainer.appendChild(titulo)
  threeContainer.appendChild(puntuaciones)
  threeContainer.appendChild(tableroHTML)
  threeContainer.appendChild(mensaje)
  threeContainer.appendChild(buttonContainer)
  buttonContainer.appendChild(botonReiniciar)
  buttonContainer.appendChild(backButton)

  return threeContainer
}
