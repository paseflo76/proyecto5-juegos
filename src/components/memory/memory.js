import { loadPage } from '../../../main'
import { createButton } from '../button/button'
import './memory.css'

// Función para crear el componente Memory
export function createMemoryComponent() {
  const memoryContainer = document.createElement('section')
  memoryContainer.id = 'memory'

  const cartasContainer = document.createElement('div')
  cartasContainer.className = 'cartas-container'

  const arrayCartasOriginal = [
    { id: 1, color: 'red' },
    { id: 2, color: 'orange' },
    { id: 3, color: 'blue' },
    { id: 4, color: 'pink' },
    { id: 5, color: 'black' },
    { id: 6, color: 'green' },
    { id: 7, color: 'red' },
    { id: 8, color: 'orange' },
    { id: 9, color: 'blue' },
    { id: 10, color: 'pink' },
    { id: 11, color: 'black' },
    { id: 12, color: 'green' }
  ]

  let arrayCartas = [...arrayCartasOriginal]

  // Variables globales
  let contador = 0
  let carta1
  let carta2
  let puntuacion = parseInt(localStorage.getItem('memoryScore')) || 0
  let bloqueado = false // Bandera para bloquear clics durante la verificación

  // Elementos del DOM
  const puntuacionHTML = document.createElement('h3')
  puntuacionHTML.textContent = `Puntuación: ${puntuacion}`

  // Crear botón de reinicio utilizando el componente `createButton`
  const reiniciarJuego = () => {
    puntuacion = 0
    actualizarPuntuacion()
    cartasContainer.innerHTML = ''
    arrayCartas = [...arrayCartasOriginal]
    arrayCartas.sort(() => Math.random() - Math.random())
    crearCartas()
  }
  const containerButton = document.createElement('div')
  containerButton.className = 'buttons-memory'

  const botonReiniciar = createButton(
    'Reiniciar',
    reiniciarJuego,
    'boton-reiniciar'
  )
  const backButton = createButton(
    'Volver al Menú',
    () => loadPage(),
    'back-button'
  )

  memoryContainer.appendChild(puntuacionHTML)
  memoryContainer.appendChild(cartasContainer)
  memoryContainer.appendChild(containerButton)
  containerButton.appendChild(botonReiniciar)
  containerButton.appendChild(backButton)

  const actualizarPuntuacion = () => {
    localStorage.setItem('memoryScore', puntuacion)
    puntuacionHTML.textContent = `Puntuación: ${puntuacion}`
  }

  const resetearValores = () => {
    contador = 0
    carta1 = undefined
    carta2 = undefined
    bloqueado = false
  }

  const resetearCarta = (cartaGenerica) => {
    cartaGenerica.nodoHTML.style.backgroundColor = '#4d0038'
    cartaGenerica.nodoHTML.style.backgroundImage =
      'url(https://www.transparenttextures.com/patterns/crissxcross.png)'
    cartaGenerica.nodoHTML.classList.remove('bloqueada')
  }

  const bloquearCarta = (cartaGenerica) => {
    cartaGenerica.nodoHTML.classList.add('bloqueada') // Clase para indicar que está acertada
  }

  const comprobar = () => {
    if (carta1.datosCarta.color === carta2.datosCarta.color) {
      puntuacion++
      actualizarPuntuacion()
      bloquearCarta(carta1)
      bloquearCarta(carta2)
      resetearValores()
    } else {
      puntuacion--
      actualizarPuntuacion()
      setTimeout(() => {
        resetearCarta(carta1)
        resetearCarta(carta2)
        resetearValores()
      }, 1000)
    }
  }

  const seleccionar = (divCartaNodoHTML, datosDeCadaCarta) => {
    if (bloqueado || divCartaNodoHTML.classList.contains('bloqueada')) {
      // No hacer nada si está bloqueado o ya está acertada
      return
    }

    if (contador < 2) {
      contador++
      divCartaNodoHTML.style.backgroundColor = datosDeCadaCarta.color
      divCartaNodoHTML.style.backgroundImage = 'none'
    }

    if (contador === 1) {
      carta1 = { nodoHTML: divCartaNodoHTML, datosCarta: datosDeCadaCarta }
    } else if (contador === 2) {
      carta2 = { nodoHTML: divCartaNodoHTML, datosCarta: datosDeCadaCarta }
      bloqueado = true // Bloquear clics hasta que se procese la comparación
      comprobar()
    }
  }

  const crearCartas = () => {
    arrayCartas.forEach((datosDeCadaCarta) => {
      const divCartaNodoHTML = document.createElement('div')
      divCartaNodoHTML.className = 'carta'
      divCartaNodoHTML.addEventListener('click', () =>
        seleccionar(divCartaNodoHTML, datosDeCadaCarta)
      )
      cartasContainer.appendChild(divCartaNodoHTML)
    })
  }

  // Barajar y crear las cartas inicialmente
  arrayCartas.sort(() => Math.random() - Math.random())
  crearCartas()

  return memoryContainer
}
