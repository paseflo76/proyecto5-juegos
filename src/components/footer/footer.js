import './footer.css'

export function createFooter() {
  const containeFooter = document.createElement('footer')
  containeFooter.id = 'footer'

  const p = document.createElement('p')
  p.textContent = 'Creado por Pablo Serrano 2024'

  containeFooter.appendChild(p)
  return containeFooter
}
