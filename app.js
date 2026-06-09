let time = 3200;
let currentImageIndex = 0;
let images = document.querySelectorAll("#slider img");
let max = images.length;

/* SLIDER */
function nextImage() {
  const slider = document.querySelector("#slider");

  if (images.length === 0) return;

  images[currentImageIndex].classList.remove("selected");

  currentImageIndex++;

  if (currentImageIndex >= max) currentImageIndex = 0;

  images[currentImageIndex].classList.add("selected");

  if (slider) {
    slider.classList.remove("glitch");
    void slider.offsetWidth;
    slider.classList.add("glitch");
  }
}

function start() {
  if (images.length > 0) {
    setInterval(nextImage, time);
  }
}

window.addEventListener("load", start);

/* BOTÃO VOLTAR AO TOPO */
const backtoTop = document.querySelector(".back-to-top");
const iconeSeta = document.querySelector(".arrow-up");
const iconeRato = document.querySelector(".icone-poring");

if (backtoTop && iconeSeta && iconeRato) {
  backtoTop.onmouseover = () => {
    iconeSeta.style.opacity = 0;
    iconeRato.style.opacity = 1;
  };

  backtoTop.onmouseout = () => {
    iconeRato.style.opacity = 0;
    iconeSeta.style.opacity = 1;
  };
}

function backtoTopScrollReveal() {
  if (!backtoTop) return;

  if (scrollY > 900) {
    backtoTop.classList.add("show");
  } else {
    backtoTop.classList.remove("show");
  }
}

/* MENU MOBILE */
let btnMobile = document.querySelector("#btn-mobile");
let menuOptions = document.querySelector(".menu-options");
let menuOptionsItems = document.querySelectorAll(".menu-options > a");

if (btnMobile && menuOptions) {
  btnMobile.addEventListener("click", () => {
    menuOptions.classList.toggle("mobile-ativo");
  });

  btnMobile.addEventListener("touchstart", (event) => {
    event.preventDefault();
    menuOptions.classList.toggle("mobile-ativo");
  });
}

for (let itemMenu of menuOptionsItems) {
  itemMenu.addEventListener("click", () => {
    menuOptions.classList.remove("mobile-ativo");
  });
}

/* EFEITO 3D NOS CARDS */
const classCards = document.querySelectorAll(".class-card");

classCards.forEach((card) => {
  const img = card.querySelector("img");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    if (img) {
      img.style.transform = "scale(1.03)";
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    if (img) {
      img.style.transform = "scale(1)";
    }
  });
});

/* REVEAL ON SCROLL DA HOME */
function setupReveal() {
  document.querySelectorAll(".tittle").forEach((el) => el.classList.add("reveal"));
  document.querySelectorAll(".history-1 img").forEach((el) => el.classList.add("reveal-left"));
  document.querySelectorAll(".history-1 p").forEach((el) => el.classList.add("reveal-right"));
  document.querySelectorAll(".class-card").forEach((el) => el.classList.add("reveal"));
  document.querySelectorAll(".world-card").forEach((el) => el.classList.add("reveal"));
  document.querySelectorAll(".world-intro").forEach((el) => el.classList.add("reveal"));
  document.querySelectorAll("#slider").forEach((el) => el.classList.add("reveal"));
}

function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  const windowHeight = window.innerHeight;

  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 80) {
      el.classList.add("reveal-visible");
    }
  });
}

window.addEventListener("load", () => {
  setupReveal();
  revealOnScroll();
});

window.addEventListener("scroll", revealOnScroll);

/* PÉTALAS */
const petalsContainer = document.querySelector(".petals");

if (petalsContainer) {
  const petalCount = 50;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.classList.add("petal");

    const left = Math.random() * 120 - 10;
    const delay = Math.random() * 8;
    const duration = 8 + Math.random() * 10;
    const size = 8 + Math.random() * 20;

    petal.style.left = `${left}%`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 0.7}px`;

    petalsContainer.appendChild(petal);
  }
}

/* REVEAL DA PÁGINA DAS CLASSES */
function classPageReveal() {
  const reveals = document.querySelectorAll(".class-reveal, .class-reveal-left");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("class-reveal-visible");
    }
  });
}

window.addEventListener("load", classPageReveal);
window.addEventListener("scroll", classPageReveal);

/* TROCA DE SPRITE COM ANIMAÇÃO */
const spriteImage = document.querySelector("#classSprite");
const spriteButtons = document.querySelectorAll(".sprite-btn");

if (spriteImage && spriteButtons.length > 0) {
  spriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const newImage = button.dataset.img;

      if (spriteImage.src.includes(newImage.replace("../", ""))) return;

      spriteImage.classList.add("sprite-changing");

      setTimeout(() => {
        spriteImage.src = newImage;

        spriteImage.classList.remove("sprite-changing");
        spriteImage.classList.add("sprite-show");

        setTimeout(() => {
          spriteImage.classList.remove("sprite-show");
        }, 280);
      }, 180);

      spriteButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}