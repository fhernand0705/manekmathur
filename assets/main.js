---
---

let burgerIcon = document.getElementById("menu-icon");

burgerIcon.addEventListener("click", function() {
  let overlay = document.getElementsByClassName("overlay")[0];
  let bars = document.getElementsByClassName("menu-bars")[0];

  burgerIcon.style.zIndex = "1";
  bars.classList.toggle("change");
  overlay.classList.toggle("active");
});
