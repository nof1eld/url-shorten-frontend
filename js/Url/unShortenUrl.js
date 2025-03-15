const unshortenForm = document.getElementById("unshorten-form")
const unshortenResult = document.getElementById("unshorten-result")

unshortenForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const shortUrl = unshortenForm.querySelector('input[name="shortUrl"]')?.value
  if (!shortUrl) {
    alert("Please enter a short URL")
    return
  }

  // Extract the ID from the short URL
  const urlParts = shortUrl.split("/")
  const urlId = urlParts[urlParts.length - 1]

  if (!urlId) {
    alert("Invalid short URL format")
    return
  }

  const token = localStorage.getItem("token")

  const unshortenApiUrl = `https://www.shorten-url-api.infobrains.club/api/private/urls/${urlId}`

  try {
    const response = await fetch(unshortenApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const jsonResponse = await response.json()

    if (response.status === 500) {
      alert("Internal server error")
    } else if (response.status === 401) {
      alert("Unauthorized")
      localStorage.removeItem("token")
      window.location.href = "/index.html"
    } else if (response.status === 404) {
      alert("URL not found")
    } else if (response.status === 200) {
      const originalUrl = jsonResponse.data.originalUrl
      unshortenResult.innerHTML = `<a href="${originalUrl}" target="_blank">${originalUrl}</a>`
    }
  } catch (error) {
    console.error("Error unshortening URL:", error)
    alert("Failed to unshorten URL")
  }
})

