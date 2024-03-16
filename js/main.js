// Navigation Bar
const navBtn = document.querySelector("#nav-btn")
const nav = document.querySelector("nav")
const navLinks = document.querySelector(".nav-links")
const navLink = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")

const homeSlidePrv = document.querySelector("#hc-prv")
const homeSlideNxt = document.querySelector("#hc-nxt")

const homeSlider = document.querySelector("#homeSlider")
const homeSlides = document.querySelectorAll(".hc-slide").length

const serviceSlider = document.querySelector("#sc-slider")
const serviceSlides = document.querySelectorAll(".service-card").length
const servicePrv = document.querySelector("#sc-prv")
const serviceNxt = document.querySelector("#sc-nxt")

navBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

let currentHS = 0

homeSlidePrv.addEventListener("click", hsPrv)
homeSlideNxt.addEventListener("click", hsNxt)

let homeSliderTimer = setInterval(hsNxt, 5000)

function homeSliderTimerReset() {
  clearInterval(homeSliderTimer)
  homeSliderTimer = setInterval(hsNxt, 5000)
}
function hsPrv() {
  homeSliderTimerReset()
  if (currentHS > 0) {
    currentHS -= 1
  } else {
    currentHS = homeSlides - 1
  }
  homeSlider.style.transform = `translateX(-${currentHS * 100}%)`
}

function hsNxt() {
  homeSliderTimerReset()
  if (currentHS < homeSlides - 1) {
    currentHS += 1
  } else {
    currentHS = 0
  }
  homeSlider.style.transform = `translateX(-${currentHS * 100}%)`
}

// Nav Observer
const navOptions = { threshold: 0.92 }
const navLinksOptions = { threshold: 0.65 }

// home btns

const navObserver = new IntersectionObserver(function (items) {
  items.forEach((item) => {
    if (item.target.id === "home") {
      if (!item.isIntersecting) {
        nav.classList.add("active")
      } else {
        nav.classList.remove("active")
      }
    }
  })
}, navOptions)

const navLinksObserver = new IntersectionObserver(function (items) {
  items.forEach((item) => {
    if (item.isIntersecting) {
      navLink.forEach((link) => {
        if (item.target.id === link.dataset.nav) {
          link.classList.add("active")
        } else {
          link.classList.remove("active")
        }
      })
    }
  })
}, navLinksOptions)

sections.forEach((section) => {
  navLinksObserver.observe(section)
  navObserver.observe(section)
})

// Services Carousel

let scCount = 0
let scWidth = 0

scWidthCheck()
addEventListener("resize", scWidthCheck)

const scLimit = (serviceSlides - 100 / scWidth) * scWidth

serviceNxt.addEventListener("click", function () {
  if (scCount * scWidth < scLimit) {
    scCount++
    serviceSlider.style.transform = `translateX(-${scCount * scWidth}vw)`
    servicePrv.style.transform = "translate(0%, -50%)"
  }
  if (scCount * scWidth >= scLimit) {
    serviceNxt.style.transform = "translate(100%, -50%)"
  }
})

servicePrv.addEventListener("click", function () {
  if (scCount * scWidth > 0) {
    scCount--
    serviceSlider.style.transform = `translateX(-${scCount * scWidth}vw)`
    serviceNxt.style.transform = "translate(0%, -50%)"
  }
  if (scCount <= 0) {
    servicePrv.style.transform = "translate(-100%, -50%)"
  }
})

function scWidthCheck() {
  servicePrv.style.transform = "translate(-100%, -50%)"

  if (innerWidth > 1024) {
    serviceSlider.style.transform = `translateX(0vw)`
    scCount = 0
    scWidth = 25
  } else if (innerWidth > 768) {
    serviceSlider.style.transform = `translateX(0vw)`
    scCount = 0
    scWidth = 33.33
  } else if (innerWidth > 475) {
    serviceSlider.style.transform = `translateX(0vw)`
    scCount = 0
    scWidth = 50
  } else {
    serviceSlider.style.transform = `translateX(0vw)`
    scCount = 0
    scWidth = 100
  }
}
