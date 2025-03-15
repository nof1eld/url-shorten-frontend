function copyShortUrl(event) {
  const button = event.currentTarget
  const urlId = button.getAttribute("url-id")

  if (!urlId) {
    console.error("No URL found to copy")
    return
  }

  navigator.clipboard
    .writeText(urlId)
    .then(() => {
      button.innerHTML = `<img src="/Assets/copy-icon-done.svg" alt="Copied">`
      setTimeout(() => {
        button.innerHTML = `<img src="/Assets/copy-icon.svg" alt="Copy">`
      }
      , 1300)
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err)
    })
}

