import { loadPage } from '../../../main'
import { createButton } from '../button/button'
import './hanged.css'

// Función para eliminar los acentos de las letras
const eliminarAcentos = (texto) => {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function createHangedComponent() {
  const palabras = [
    'Argentina',
    'Australia',
    'Noruega',
    'Finlandia',
    'Japón',
    'España',
    'Portugal',
    'Chile',
    'Italia',
    'Alemania',
    'León',
    'Jirafa',
    'Elefante',
    'Tigre',
    'Cebra',
    'Canguro',
    'Pinguino',
    'Tortuga',
    'Búho',
    'Serpiente',
    'Sombrero',
    'Cámara',
    'Silla',
    'Taza',
    'Lámpara',
    'Mochila',
    'Libro',
    'Cuaderno',
    'Reloj',
    'Bicicleta'
  ]

  let palabraSecreta =
    palabras[Math.floor(Math.random() * palabras.length)].toUpperCase()
  let letrasAdivinadas = Array(palabraSecreta.length).fill('_')
  let intentos = 6
  let letrasIncorrectas = []

  const hangedContainer = document.createElement('section')
  hangedContainer.id = 'hanged'

  const contenidoContainer = document.createElement('div')
  contenidoContainer.id = 'contenido'

  const titulo = document.createElement('h2')
  titulo.textContent = 'Juego del Ahorcado'

  const palabraHTML = document.createElement('p')
  palabraHTML.textContent = letrasAdivinadas.join(' ')

  const intentosHTML = document.createElement('p')
  intentosHTML.textContent = `Intentos restantes: ${intentos}`

  const letrasIncorrectasHTML = document.createElement('p')
  letrasIncorrectasHTML.textContent = `Letras incorrectas: ${letrasIncorrectas.join(
    ', '
  )}`

  const mensaje = document.createElement('p')
  mensaje.id = 'mensaje'
  mensaje.textContent = 'Adivina la palabra'

  const figuraAhorcado = document.createElement('div')
  figuraAhorcado.id = 'figura-ahorcado'

  const actualizarFigura = () => {
    figuraAhorcado.innerHTML = ''
    const partes = [
      'cabeza',
      'cuerpo',
      'brazo-izquierdo',
      'brazo-derecho',
      'pierna-izquierda',
      'pierna-derecha'
    ]
    const maxPartes = 6 - intentos

    for (let i = 0; i < maxPartes; i++) {
      const parte = document.createElement('div')
      parte.className = `parte ${partes[i]}`
      figuraAhorcado.appendChild(parte)
    }
  }

  const manejarLetra = (letra) => {
    if (letrasIncorrectas.includes(letra) || letrasAdivinadas.includes(letra))
      return

    const palabraSinAcentos = eliminarAcentos(palabraSecreta)
    const letraSinAcentos = eliminarAcentos(letra)

    if (palabraSinAcentos.includes(letraSinAcentos)) {
      palabraSecreta.split('').forEach((char, index) => {
        if (eliminarAcentos(char) === letraSinAcentos) {
          letrasAdivinadas[index] = palabraSecreta[index]
        }
      })
    } else {
      intentos--
      letrasIncorrectas.push(letra)
      actualizarFigura()
    }

    palabraHTML.textContent = letrasAdivinadas.join(' ')
    intentosHTML.textContent = `Intentos restantes: ${intentos}`
    letrasIncorrectasHTML.textContent = `Letras incorrectas: ${letrasIncorrectas.join(
      ', '
    )}`

    if (letrasAdivinadas.join('') === palabraSecreta) {
      mensaje.textContent = '¡Has ganado!'
    } else if (intentos === 0) {
      mensaje.textContent = `¡Has perdido! La palabra era ${palabraSecreta}`
    }
  }

  const botonesContainer = document.createElement('div')
  botonesContainer.id = 'botones'

  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letra) => {
    const boton = createButton(letra, () => manejarLetra(letra), 'tecla')
    botonesContainer.appendChild(boton)
  })

  const reiniciarJuego = () => {
    palabraSecreta =
      palabras[Math.floor(Math.random() * palabras.length)].toUpperCase()
    letrasAdivinadas = Array(palabraSecreta.length).fill('_')
    intentos = 6
    letrasIncorrectas = []
    palabraHTML.textContent = letrasAdivinadas.join(' ')
    intentosHTML.textContent = `Intentos restantes: ${intentos}`
    letrasIncorrectasHTML.textContent = `Letras incorrectas: ${letrasIncorrectas.join(
      ', '
    )}`
    mensaje.textContent = 'Adivina la palabra'
    figuraAhorcado.innerHTML = ''
  }
  const botonsHanged = document.createElement('div')
  botonsHanged.className = 'hangedBoton'

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

  contenidoContainer.appendChild(titulo)
  contenidoContainer.appendChild(palabraHTML)
  contenidoContainer.appendChild(intentosHTML)
  contenidoContainer.appendChild(letrasIncorrectasHTML)
  contenidoContainer.appendChild(mensaje)
  contenidoContainer.appendChild(figuraAhorcado)
  contenidoContainer.appendChild(botonsHanged)
  hangedContainer.appendChild(contenidoContainer)
  hangedContainer.appendChild(botonesContainer)
  botonsHanged.appendChild(botonReiniciar)
  botonsHanged.appendChild(backButton)

  return hangedContainer
}
