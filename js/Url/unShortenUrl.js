const unshortenBtn = document.getElementById("unshorten-btn");

unshortenBtn.addEventListener("click", async () => {
  const urlInput = shortenForm.querySelector('input[name="url"]').value;

  if (!urlInput) {
    alert("Please enter a shortened URL");
    return;
  }

  const isShortUrl = urlInput.includes("shorten-url-api.infobrains.club/");
  if (!isShortUrl) {
    alert(
      "Please enter a valid shortened URL (e.g., https://www.shorten-url-api.infobrains.club/shorten/cm8awwwq800ves62i0yj106cx)"
    );
    return;
  }

  const token = localStorage.getItem("token");

  // Extract the ID from the URL
  const id = urlInput.split("/").pop();

  try {
    const unshortenUrl = `https://www.shorten-url-api.infobrains.club/api/private/urls/${id}`;

    const response = await fetch(unshortenUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const jsonResponse = await response.json();

    if (response.status === 500) {
      alert("Internal server error");
    } else if (response.status === 401) {
      alert("Unauthorized");
      localStorage.removeItem("token");
      window.location.href = "/index.html";
    } else if (response.status === 400) {
      alert(jsonResponse.error.details);
    } else if (response.status === 200) {
      const originalUrl = jsonResponse.data.originalUrl;
      shortenResult.innerHTML = `
        <p>Original URL: <a href="${originalUrl}" target="_blank">${originalUrl}</a></p>
        <button id="copy-button" url-id="${originalUrl}"><img src="/Assets/copy-icon.svg" alt="Copy">Copy</button>
      `;
      document
        .getElementById("copy-button")
        .addEventListener("click", copyShortUrl);
    }
  } catch (error) {
    console.error("Error unshortening URL:", error);
    alert("Failed to unshorten URL");
  }
});
