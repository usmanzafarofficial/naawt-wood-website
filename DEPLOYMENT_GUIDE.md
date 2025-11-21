# Deployment Guide for cPanel

This guide covers how to deploy the React frontend and Node.js backend to a cPanel hosting environment.

## Prerequisites

- cPanel access
- Domain name pointing to your hosting
- Database created in cPanel (MySQL)

## 1. Database Setup

1.  Log in to cPanel.
2.  Go to **MySQL® Database Wizard**.
3.  Create a new database (e.g., `naawt_db`).
4.  Create a new user and password. **Note these down.**
5.  Add the user to the database with **ALL PRIVILEGES**.
6.  Go to **phpMyAdmin**.
7.  Select your new database.
8.  Click **Import** and upload the `naawt_db.sql` file from the project root.

## 2. Backend Deployment

1.  In cPanel, go to **File Manager**.
2.  Navigate to `public_html` (or a subdomain folder).
3.  Create a folder named `api` (or `backend`).
4.  Upload the contents of the `backend` folder to this directory.
    - You can zip the `backend` folder locally, upload it, and extract it.
    - **Exclude** `node_modules`.
5.  Edit the `.env` file in the `api` directory:
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    JWT_SECRET=your_secure_secret
    ```
6.  **Node.js Setup**:
    - If your cPanel has **Setup Node.js App**:
        - Create a new app.
        - Application root: `public_html/api`
        - Application URL: `yourdomain.com/api`
        - Application startup file: `server.js`
        - Click **Create**.
        - Click **Run NPM Install**.
        - Click **Start App**.
    - If not, you may need to use a process manager like PM2 via SSH, or contact your host.

## 3. Frontend Deployment

1.  On your local machine, open a terminal in the `frontend` folder.
2.  Edit `.env.production`:
    ```env
    VITE_API_URL=https://yourdomain.com/api
    ```
    *(Make sure this matches where you deployed the backend)*
3.  Run the build command:
    ```bash
    npm run build
    ```
4.  This creates a `dist` folder.
5.  Upload the **contents** of the `dist` folder to `public_html` on cPanel.
    - The `index.html` should be in the root of `public_html`.
    - Ensure the `.htaccess` file (which we just created) is also uploaded to `public_html`. This handles the routing for pages like `/admin`.

## 4. Troubleshooting

-   **Admin Page 404**: Ensure `.htaccess` is present in `public_html`.
-   **API Connection Failed**: Check the Network tab in your browser developer tools.
    -   If requests go to `localhost`, you didn't rebuild the frontend with the correct `.env.production`.
    -   If requests fail with 404 or 500, check the backend logs in cPanel.
-   **Module Error (bcrypt)**: We have switched to `bcryptjs` to avoid compilation errors. If you see errors about "ELF header" or "module not found", ensure you have uploaded the updated `package.json` and `server.js`, and run `npm install` again in cPanel.
-   **Application Startup**: Ensure the startup file is set to `server.js` (or `app.js` if `server.js` fails).

## 5. Verification

1.  Visit `https://yourdomain.com`.
2.  Navigate to `/admin`.
3.  Try to log in.
