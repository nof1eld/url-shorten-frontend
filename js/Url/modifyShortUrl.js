function modifyShortUrl(event) {
  const button = event.currentTarget
  const urlId = button.getAttribute("url-id")
  const token = localStorage.getItem("token")

  if (!urlId) {
    console.error("No URL ID found")
    return
  }

  const modal = document.getElementById("modify-url-modal")
  const closeBtn = modal.querySelector(".close")
  const saveBtn = document.getElementById("save-url-btn")
  const cancelBtn = document.getElementById("cancel-url-btn")
  const urlInput = document.getElementById("new-url-input")

  modal.style.display = "block"

  const closeModal = () => {
    modal.style.display = "none"
    urlInput.value = ""
  }

  closeBtn.onclick = closeModal
  cancelBtn.onclick = closeModal

  window.onclick = (event) => {
    if (event.target === modal) {
      closeModal()
    }
  }

  saveBtn.onclick = async () => {
    const protocol = document.getElementById("protocol-input").value
    const urlPath = document.getElementById("new-url-input").value

    if (!urlPath) {
      alert("Please enter a URL")
      return
    }

    const newUrl = protocol + urlPath

    try {
      const shortenUrl = `https://www.shorten-url-api.infobrains.club/api/private/urls/${urlId}`
      const response = await fetch(shortenUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: newUrl }),
      })

      if (response.status === 200) {
        alert("URL modified successfully")
        window.location.href = "/pages/shorten.html"
      } else if (response.status === 400) {
        alert("Validation error")
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
      console.error("Error modifying URL:", error)
      alert("Failed to modify URL")
    }

    closeModal()
  }
}

