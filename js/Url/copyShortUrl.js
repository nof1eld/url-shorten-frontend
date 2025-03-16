function copyShortUrl(event) {
  const button = event.currentTarget;
  const urlToCopy = button.getAttribute("url-id");

  if (!urlToCopy) {
    console.error("No URL found to copy");
    return
  }

  navigator.clipboard
    .writeText(urlToCopy)
    .then(() => {
      button.innerHTML = `<img src="/Assets/copy-icon-done.svg" alt="Copied">`
      setTimeout(() => {
        button.innerHTML = ` <img src="/Assets/copy-icon.svg" alt="Copy">  Copy`
      }, 1300)
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err)
    })
}