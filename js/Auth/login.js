const loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const email = loginForm.querySelector('input[name="email"]').value
  const password = loginForm.querySelector('input[name="password"]').value

  try {
    const url = "https://www.shorten-url-api.infobrains.club/api/public/auth/login"
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const jsonResponse = await result.json()

    if (result.status === 500) {
      alert("Internal server error")
    } else if (result.status === 400) {
      alert(jsonResponse.error.details)
    } else if (result.status === 200) {
      const token = jsonResponse.data.accessToken
      const username = jsonResponse.data.user.name
      const email = jsonResponse.data.user.email
      const date = jsonResponse.data.user.createdAt

      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("email", email)
      localStorage.setItem("dateCreated", date)

      window.location.href = "/pages/shorten.html"
    }
  } catch (error) {
    console.error("Login error:", error)
    alert("Failed to login. Please try again.")
  }
})

