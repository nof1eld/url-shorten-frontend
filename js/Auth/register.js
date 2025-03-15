const registerForm = document.getElementById("register-form")

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const name = registerForm.querySelector('input[name="name"]').value
  const email = registerForm.querySelector('input[name="email"]').value
  const password = registerForm.querySelector('input[name="password"]').value

  try {
    const url = "https://www.shorten-url-api.infobrains.club/api/public/auth/register"

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const jsonResponse = await result.json()

    if (result.status === 500) {
      alert("Internal server error")
    } else if (result.status === 409) {
      alert("Email already exists")
    } else if (result.status === 400) {
      alert(jsonResponse.error.details)
    } else if (result.status === 201) {
      const token = jsonResponse.data.accessToken
      const username = jsonResponse.data.user.name
      const email = jsonResponse.data.user.email
      const date = new Date(jsonResponse.data.user.createdAt).toLocaleString()

      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("email", email)
      localStorage.setItem("dateCreated", date)

      window.location.href = "/pages/shorten.html"
    }
  } catch (error) {
    console.error("Registration error:", error)
    alert("Failed to register. Please try again.")
  }
})

