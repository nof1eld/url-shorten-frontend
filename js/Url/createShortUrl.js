const shortenForm = document.getElementById("shorten-form")
const shortenResult = document.getElementById("shorten-result")

shortenForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const protocol = shortenForm.querySelector("#protocol-input").value
  const urlInput = shortenForm.querySelector('input[name="url"]').value

  if (!urlInput) {
    alert("Please enter a URL")
    return
  }

  const hasTLD = urlInput.match(/\.[a-z]{2,}$/i)
  if (!hasTLD) {
    alert("Please enter a valid URL with a domain extension (e.g. .com, .org, .net)")
    return
  }

  const hasProtocol = urlInput.match(/^(http|https):\/\//)
  const fullUrl = hasProtocol ? urlInput : `${protocol}${urlInput}`
  const token = localStorage.getItem("token")

  try {
    const shortenUrl = "https://www.shorten-url-api.infobrains.club/api/private/urls"

    const response = await fetch(shortenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url: fullUrl }),
    })

    const jsonResponse = await response.json()

    if (response.status === 500) {
      alert("Internal server error")
    } else if (response.status === 401) {
      alert("Unauthorized")
      localStorage.removeItem("token")
      window.location.href = "/index.html"
    } else if (response.status === 400) {
      alert(jsonResponse.error.details)
    } else if (response.status === 201) {
      const shortUrl = jsonResponse.data.shortUrl
      shortenResult.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`
      getShortUrls()
    }
  } catch (error) {
    console.error("Error creating short URL:", error)
    alert("Failed to create short URL")
  }
})

