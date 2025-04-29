# Simple Form App with hCAPTCHA

A Dockerized Node.js web application built with Express, featuring a form that collects a user's name and age, protected by hCAPTCHA for bot prevention. The app validates inputs, verifies hCAPTCHA responses, and redirects to a success page upon valid submission.

## Features
- **Form**: Collects name and age with client-side and server-side validation.
- **hCAPTCHA**: Integrates hCAPTCHA to prevent automated submissions.
- **Docker**: Runs in a container for easy deployment.
- **Node.js/Express**: Lightweight backend with Axios for hCAPTCHA verification.
- **Environment Variables**: Securely stores hCAPTCHA Secret Key using `.env`.

## Project Structure
```
simple-form-app/
├── public/
│   ├── index.html      # Form with hCAPTCHA widget
│   ├── success.html    # Success page displaying submitted data
│   └── script.js       # Client-side form validation
├── .env                # Environment variables (not in Git)
├── Dockerfile          # Docker configuration
├── package.json        # Node.js dependencies and scripts
├── README.md           # This file
└── server.js           # Express server with hCAPTCHA verification
```

## Prerequisites
- **Docker**: Installed and running (e.g., Docker Desktop).
- **hCAPTCHA Account**: Sign up at [dashboard.hcaptcha.com](https://dashboard.hcaptcha.com) to get a Site Key and Secret Key.
- **Node.js**: Optional for local development (Docker handles runtime).

## Setup
1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd simple-form-app
   ```

2. **Configure hCAPTCHA**:
   - Log in to [dashboard.hcaptcha.com](https://dashboard.hcaptcha.com).
   - Create a new site, add `localhost` and `127.0.0.1` to Domains.
   - Copy your **Site Key** and **Secret Key**.

3. **Update Site Key**:
   - Open `public/index.html`.
   - Replace `YOUR_HCAPTCHA_SITE_KEY` in `<div class="h-captcha" data-sitekey="YOUR_HCAPTCHA_SITE_KEY"></div>` with your Site Key.

4. **Create `.env` File**:
   - In the project root, create a `.env` file:
     ```
     HCAPTCHA_SECRET_KEY=your-secret-key-here
     ```
   - Replace `your-secret-key-here` with your hCAPTCHA Secret Key.
   - **Note**: Do not commit `.env` to Git (it’s in `.gitignore`).

5. **Build Docker Image**:
   ```bash
   docker build -t simple-form-app .
   ```

6. **Run Docker Container**:
   ```bash
   docker run -p 3000:3000 --env-file .env simple-form-app
   ```

## Usage
1. Open `http://localhost:3000` in a browser.
2. Fill out the form (name, age), complete the hCAPTCHA challenge, and submit.
3. On valid submission, you’ll be redirected to a success page displaying your name and age.
4. If submission fails (e.g., invalid inputs or hCAPTCHA), an error message appears.

## Troubleshooting
- **hCAPTCHA Widget Error**: Ensure Site Key is correct and `localhost`/`127.0.0.1` are in dashboard Domains.
- **400 Bad Request**: Check `.env` for correct Secret Key, verify form data (Network tab), and submit hCAPTCHA immediately.
- **Server Logs**: Run `docker logs <container_id>` to debug validation or hCAPTCHA errors.
- **Contact**: For issues, check hCAPTCHA documentation or open a GitHub issue.

## Dependencies
- **Express**: Web framework for Node.js.
- **Axios**: HTTP client for hCAPTCHA API calls.
- **Dotenv**: Loads environment variables from `.env`.

## Contributing
Feel free to submit issues or pull requests for improvements (e.g., styling, features like database integration).

## License
MIT License. See [LICENSE](LICENSE) for details.