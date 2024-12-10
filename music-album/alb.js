function createContainerWithCards(imageNames) {
  const container = document.createElement("div");
  container.className = "container";

  imageNames.forEach((name) => {
    const card = document.createElement("div");
    card.className = "one";
    card.style.backgroundImage = `url(${name})`;
    card.setAttribute("data-tilt", "");
    card.setAttribute("data-tilt-glare", "");
    card.setAttribute("data-tilt-scale", "1.1");
    card.setAttribute("data-tilt-max-glare", "0.95");
    const randomRotation = Math.random() * 10 - 5; // Generate random rotation between -5deg to 5deg
    card.style.rotate = "0deg";
    setTimeout(() => {
      card.style.rotate = `${randomRotation}deg`;
    }, 600);
    container.appendChild(card);
  });

  return container;
}

const container1 = createContainerWithCards([
  "die.png",
  "bell.jpg",
  "cupid.jpg",
]);
document.body.appendChild(container1);

document.querySelectorAll(".one").forEach((card) => {
  card.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelectorAll(".one").forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.style.opacity = "0.3";
        otherCard.style.filter = "blur(80px)";
      } else {
        otherCard.style.zIndex = "2";
        otherCard.vanillaTilt.destroy(); // Destroy tilt effect
        otherCard.style.rotate = "0deg";
        card.setAttribute("data-tilt-scale", "1.4");
        VanillaTilt.init(card); // Re-initialize tilt effect
      }
    });
  });

  card.addEventListener("mouseleave", () => {
    document.querySelectorAll(".one").forEach((otherCard) => {
      otherCard.style.zIndex = "0";
      otherCard.style.opacity = "1";
      otherCard.style.filter = "none";
      otherCard.vanillaTilt.destroy(); // Destroy tilt effect
      otherCard.setAttribute("data-tilt-scale", "1.1");
      VanillaTilt.init(otherCard); // Re-initialize tilt effect
    });
  });

  card.addEventListener("mouseenter", () => {
    document.querySelectorAll(".one").forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.style.filter = "blur(0px)";
        otherCard.style.opacity = "1";
      } else {
        otherCard.style.zIndex = "2";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let scrollpos = sessionStorage.getItem("scrollpos");
  if (scrollpos) {
    window.scrollTo(0, scrollpos);
    sessionStorage.removeItem("scrollpos");
  }
});

window.onbeforeunload = function () {
  sessionStorage.setItem("scrollpos", window.scrollY);
};
