# URL Shortener Frontend

This project is part of the JavaScript Bootcamp by InfoBrains Club. It's a frontend application for URL shortening that allows users to create, manage, and use shortened URLs.

## Bootcamp Information

This project was developed as part of the InfoBrains Club JavaScript Bootcamp.
- **Bootcamp Website**: [https://js-bootcamp-2025.infobrains.club/](https://js-bootcamp-2025.infobrains.club/)

## Features

- Create shortened URLs from long URLs
- View a list of your shortened URLs
- Delete and modify a URL
- Expand shortened URLs to see their original destination
- User authentication and profile management

## Technologies Used

- Vanilla JavaScript (Frontend)
- HTML5
- CSS3
- RESTful API integration

## Project Structure

The application is organized into several key modules:

- **URL Management**
  - `createShortUrl.js`: Handles the creation of new shortened URLs
  - `getShortUrls.js`: Manages the display and pagination of user's URLs
  - `unShortenUrl.js`: Provides functionality to expand shortened URLs to their original URLs
  - `deleteShortUrl.js`: Manages the deletion of shortened URLs
  - `deleteShortUrl.js`: Manages the modification of shortened URLs original path.
  - `copyShortUrl.js`: Provides copy-to-clipboard functionality

- **User Management**
  - `user.js`: Handles user profile information and authentication
  - `Auth`: Manages user authentication


## Getting Started

1. Clone the repository
```bash
git clone https://github.com/nof1eld/url-shorten-frontend.git
```

2. Open the project in your favorite code editor

3. Launch the frontend application using a local server

## API Integration

This frontend application connects to the URL shortening API at `https://www.shorten-url-api.infobrains.club/api-docs/`.

## Authentication

The application uses token-based authentication.


## Learning Outcomes

This frontend project demonstrates several key JavaScript concepts taught in the InfoBrains Club JavaScript Bootcamp:

- DOM manipulation
- Asynchronous JavaScript (async/await)
- Fetch API for HTTP requests
- Event handling
- Token-based authentication
- Dynamic content generation

## License

This project is part of the educational curriculum of InfoBrains Club, feel free to contribute or use for your own.
