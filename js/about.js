// Image loading animation
function animateOnScroll() {
  const elements = document.querySelectorAll(".image-container, .text-content")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}


  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const header = document.querySelector(".header")
    const nav = document.querySelector(".nav")
    const authButtons = document.querySelector(".auth-buttons")
    const dropdown = document.querySelector(".dropdown")

    if (!header.contains(event.target)) {
      nav.classList.remove("active")
      authButtons.classList.remove("active")
      dropdown.classList.remove("active")
    }
  })

  // Close mobile menu when window is resized to desktop
  window.addEventListener("resize", () => {
    const nav = document.querySelector(".nav")
    const authButtons = document.querySelector(".auth-buttons")
    const dropdown = document.querySelector(".dropdown")

    if (window.innerWidth >= 800) {
      nav.classList.remove("active")
      authButtons.classList.remove("active")
      dropdown.classList.remove("active")
    }
  })


window.addEventListener("resize", () => {
  console.log("Window resized")
})

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    console.log("Escape key pressed")

    // Close mobile menu on escape
    const nav = document.querySelector(".nav")
    const authButtons = document.querySelector(".auth-buttons")
    const dropdown = document.querySelector(".dropdown")

    nav.classList.remove("active")
    authButtons.classList.remove("active")
    dropdown.classList.remove("active")
  }
})

