const profileButton = document.getElementById("profile-button")
const profileCard = document.getElementById("profile-card")

const profileCardUsername = document.getElementById("profile-username")
const profileCardEmail = document.getElementById("profile-email")
const profileCardDateCreated = document.getElementById("profile-date-created")

const username = localStorage.getItem("username")
const email = localStorage.getItem("email")
const dateCreated = localStorage.getItem("dateCreated")

function capitalizeFirstLetter(val) {
  if (!val) return ""
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

if (profileButton) {
  profileButton.innerHTML = `<h1>${capitalizeFirstLetter(username)}</h1> <img src="/Assets/profile-icon.svg" alt="My profile" title="My profile">`
}

if (profileCardUsername) {
  profileCardUsername.innerHTML = `<strong>Name: </strong>${capitalizeFirstLetter(username)}`
}

if (profileCardEmail) {
  profileCardEmail.innerHTML = `<strong>Email: </strong>${email}`
}

if (profileCardDateCreated) {
  if (dateCreated && dateCreated !== "undefined") {
    profileCardDateCreated.innerHTML = `<strong>Date Created: </strong>${dateCreated}`
  } else {
    profileCardDateCreated.innerHTML = `<strong>Member since: </strong>Not available`
  }
}

if (profileButton && profileCard) {
  profileButton.addEventListener("click", (event) => {
    event.stopPropagation()

    if (profileCard.classList.contains("hide")) {
      profileCard.classList.replace("hide", "show")
    } else {
      profileCard.classList.replace("show", "hide")
    }
  })

  document.addEventListener("click", (event) => {
    if (!profileCard.contains(event.target) && !profileButton.contains(event.target)) {
      profileCard.classList.replace("show", "hide")
    }
  })
}

