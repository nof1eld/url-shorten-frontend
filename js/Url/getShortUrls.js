const shortenUrlList = document.getElementById("shorten-list")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const currentPageSpan = document.getElementById("current-page")
const totalPagesSpan = document.getElementById("total-pages")

let currentPage = 1
const limit = 10

const getShortUrls = async (buttonAction = null) => {
  // Update current page based on action
  if (buttonAction === "next") currentPage++
  if (buttonAction === "prev") currentPage--

  const url = "https://www.shorten-url-api.infobrains.club/api/private/urls"
  const token = localStorage.getItem("token")

  try {
    const response = await fetch(`${url}?page=${currentPage}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const jsonResponse = await response.json()

    if (response.status === 500) {
      alert("Internal server error")
      return
    }

    if (response.status === 401) {
      alert("Unauthorized")
      localStorage.removeItem("token")
      window.location.href = "/index.html"
      return
    }

    if (response.status === 200) {
      const { data, pagination } = jsonResponse

      // Clear current page
      shortenUrlList.innerHTML = ""

      // pagination elements
      currentPageSpan.textContent = pagination.page
      totalPagesSpan.textContent = pagination.totalPages
      prevBtn.disabled = !pagination.hasPrevious
      nextBtn.disabled = !pagination.hasNext

      data.forEach((shortUrl) => {
        const li = document.createElement("li")
        li.innerHTML = `
                <div class="shorten-url">
                    <div class="shorten-url__urls">
                        <div class="shorten-url__short-url">
                            <p><strong>Short link:</strong> </p>
                            <a href="${shortUrl.shortUrl}" target="_blank" rel="noopener noreferrer">
                                    shorten-url-api.infobrains.club/shorten/
                                    <img id="external-link-icon" src="../../Assets/external-link-icon.svg" alt="External link" title="Open in new tab">
                            </a>
                        </div>
                        <div class="shorten-url__original-url">
                            <strong>Original:</strong> 
                            <a href="${shortUrl.originalUrl}" target="_blank"><img src="https://www.google.com/s2/favicons?domain=${shortUrl.originalUrl}" alt="favicon" /></a>
                        </div> 
                    
                    </div>
                    
                    <div class="shorten-url__details">
                        <div class="shorten-url__clicks">
                            <p><strong>Clicks:</strong> ${shortUrl.clicks}</p>
                        </div>
                        <div class="shorten-url__created-at">
                            <p><strong>Date Created:</strong> ${new Date(shortUrl.createdAt).toLocaleString()}</p>
                        </div>
                        <div class="shorten-url__updated-at">
                            <p><strong>Date Updated:</strong> ${new Date(shortUrl.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div class="shorten-url_actions">
                    <button id="copy" url-id="${shortUrl.shortUrl}" onclick="copyShortUrl(event)"><img src="../../Assets/copy-icon.svg" alt="Copy" title="Copy to clipboard"></button>
                    <button id="modify" url-id="${shortUrl.id}" onclick="modifyShortUrl(event)"><img src="../../Assets/edit-icon.svg" alt="Edit" title="Edit Url"></button>
                    <button id="delete" url-id="${shortUrl.id}" onclick="deleteShortUrl(event)"><img src="../../Assets/delete-icon.png" alt="Delete" title="Delete Url"></button>
                </div>
                `
        shortenUrlList.appendChild(li)
      })
    }
  } catch (error) {
    console.error("Error fetching short URLs:", error)
    alert("Failed to load your shortened URLs")
  }
}

// Initialize the URL list on page load
getShortUrls()

