async function deleteShortUrl(event) {
  const button = event.currentTarget
  const urlId = button.getAttribute("url-id")
  const token = localStorage.getItem("token")

  if (!urlId) {
    console.error("No URL ID found")
    return
  }

  if (!confirm("Are you sure you want to delete this URL?")) {
    return
  }

  try {
    const shortenUrl = `https://www.shorten-url-api.infobrains.club/api/private/urls/${urlId}`

    const response = await fetch(shortenUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      alert("URL deleted successfully")
      window.location.href = "/pages/shorten.html"
    } else if (response.status === 401) {
      alert("Unauthorized")
      localStorage.removeItem("token")
      window.location.href = "/index.html"
    } else if (response.status === 500) {
      alert("Internal server error")
    } else if (response.status === 404) {
      alert("URL not found")
    }
  } catch (error) {
    console.error("Error deleting URL:", error)
    alert("Failed to delete URL")
  }
}

