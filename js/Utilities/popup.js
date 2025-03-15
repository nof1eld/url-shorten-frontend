function showPopup(popupId) {
  document.getElementById(popupId).style.display = "block"
  document.getElementById("overlay").style.display = "block"
}

document.getElementById("overlay").addEventListener("click", () => {
  document.querySelectorAll(".popup").forEach((popup) => (popup.style.display = "none"))
  document.getElementById("overlay").style.display = "none"
})
document.getElementById("already-registered").addEventListener("click", () => {
  document.getElementById("register-popup").style.display = "none"
  document.getElementById("login-popup").style.display = "block"
})
document.getElementById("not-registered").addEventListener("click", () => {
  document.getElementById("login-popup").style.display = "none"
  document.getElementById("register-popup").style.display = "block"
})

