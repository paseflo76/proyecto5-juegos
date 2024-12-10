import './button.css'

export function createButton(text, onClick, className = '') {
  const button = document.createElement('button')
  button.textContent = text
  button.className = className

  if (typeof onClick === 'function') {
    button.addEventListener('click', onClick)
  }

  return button
}
