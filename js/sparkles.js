document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sparkle-container")
  const types = ["star", "glitter", "moon"]
  const colors = ["gold", "silver", "purple", "pink"]

  // Crear brillitos iniciales
  createInitialSparkles()

  // Crear brillitos periódicamente
  setInterval(createSparkle, 300)

  // Crear brillitos al mover el mouse
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.9) {
      createSparkleAtPosition(e.clientX, e.clientY)
    }
  })

  function createInitialSparkles() {
    // Crear 20 brillitos iniciales
    for (let i = 0; i < 20; i++) {
      createSparkle()
    }

    // Crear 10 brillitos fijos que parpadean
    for (let i = 0; i < 10; i++) {
      createTwinklingSparkle()
    }
  }

  function createSparkle() {
    const sparkle = document.createElement("div")
    const type = types[Math.floor(Math.random() * types.length)]
    const color = colors[Math.floor(Math.random() * colors.length)]

    sparkle.className = `sparkle ${type} ${color}`

    // Posición aleatoria en la parte superior
    const posX = Math.random() * window.innerWidth

    sparkle.style.left = `${posX}px`
    sparkle.style.top = "-20px"

    // Tamaño aleatorio
    const size = 5 + Math.random() * 15
    sparkle.style.width = `${size}px`
    sparkle.style.height = `${size}px`

    // Velocidad aleatoria
    const duration = 3 + Math.random() * 7
    sparkle.style.animation = `fall ${duration}s linear forwards`

    container.appendChild(sparkle)

    // Eliminar después de la animación
    setTimeout(() => {
      sparkle.remove()
    }, duration * 1000)
  }

  function createSparkleAtPosition(x, y) {
    const sparkle = document.createElement("div")
    const type = types[Math.floor(Math.random() * types.length)]
    const color = colors[Math.floor(Math.random() * colors.length)]

    sparkle.className = `sparkle ${type} ${color}`

    // Posición donde ocurrió el evento
    sparkle.style.left = `${x}px`
    sparkle.style.top = `${y}px`

    // Tamaño aleatorio
    const size = 5 + Math.random() * 10
    sparkle.style.width = `${size}px`
    sparkle.style.height = `${size}px`

    // Animación más corta
    const duration = 2 + Math.random() * 3
    sparkle.style.animation = `fall ${duration}s linear forwards`

    container.appendChild(sparkle)

    // Eliminar después de la animación
    setTimeout(() => {
      sparkle.remove()
    }, duration * 1000)
  }

  function createTwinklingSparkle() {
    const sparkle = document.createElement("div")
    const type = "star"
    const color = colors[Math.floor(Math.random() * colors.length)]

    sparkle.className = `sparkle ${type} ${color} twinkling`

    // Posición aleatoria en toda la pantalla
    const posX = Math.random() * window.innerWidth
    const posY = Math.random() * window.innerHeight

    sparkle.style.left = `${posX}px`
    sparkle.style.top = `${posY}px`

    // Tamaño aleatorio
    const size = 3 + Math.random() * 8
    sparkle.style.width = `${size}px`
    sparkle.style.height = `${size}px`

    // Opacidad inicial
    sparkle.style.opacity = Math.random()

    container.appendChild(sparkle)
  }
})
