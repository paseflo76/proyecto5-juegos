import { createButton } from './src/components/button/button'
import { createFooter } from './src/components/footer/footer'
import { createHangedComponent } from './src/components/hanged/hanged'
import { createMemoryComponent } from './src/components/memory/memory'
import { createThreeComponent } from './src/components/three/three'
import './style.css'

// Obtener el contenedor principal
const app = document.querySelector('#app')

// Función para limpiar el contenido del contenedor
const clearAppContent = () => {
  app.innerHTML = '' // Limpia el contenido existente
}
const myH1 = document.createElement('h1')
myH1.textContent = 'Elige un juego'

// Función para crear las tarjetas iniciales
const createCards = () => {
  const container = document.createElement('div')

  container.className = 'card-container'

  const games = [
    {
      title: 'Memory',
      description: 'Pon a prueba tu memoria',
      key: 'memory',
      img: './assets/naipe.png' // Ruta relativa a la imagen
    },
    {
      title: 'Tres en Raya',
      description: 'El clásico juego de estrategia',
      key: 'three',
      img: './assets/tres-en-raya.png' // Ruta relativa a la imagen
    },
    {
      title: 'Ahorcado',
      description: 'Adivina la palabra antes de que sea tarde',
      key: 'hanged',
      img: './assets/juego-del-ahorcado.png' // Ruta relativa a la imagen
    }
  ]

  games.forEach((game) => {
    const card = document.createElement('div')
    card.className = 'card'

    const img = document.createElement('img')
    img.src = game.img // Asignar la URL de la imagen desde assets
    img.alt = game.title // Texto alternativo para accesibilidad
    img.className = 'card-image'

    const title = document.createElement('h3')
    title.textContent = game.title

    const description = document.createElement('p')
    description.textContent = game.description

    const button = createButton(
      'Jugar',
      () => loadPage(game.key),
      'play-button'
    )
    app.appendChild(myH1)
    card.appendChild(img) // Agregar la imagen
    card.appendChild(title)
    card.appendChild(description)
    card.appendChild(button)
    container.appendChild(card)
  })

  return container
}

// Función para cargar el contenido de la página seleccionada
export const loadPage = (page) => {
  clearAppContent() // Limpia el contenido anterior
  const footer = createFooter()

  if (!page) {
    app.appendChild(createCards()) // Muestra las tarjetas iniciales
  } else {
    switch (page) {
      case 'memory':
        const memoryGame = createMemoryComponent()
        app.appendChild(memoryGame)
        break
      case 'three':
        const threeGame = createThreeComponent()
        app.appendChild(threeGame)
        break
      case 'hanged':
        const hangedGame = createHangedComponent()
        app.appendChild(hangedGame)
        break
    }
  }

  app.appendChild(footer)
}

// Inicializar la aplicación
loadPage() // Muestra las tarjetas iniciales al cargar
