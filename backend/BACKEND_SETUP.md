# SQL Backend Setup Guide

## Prerequisites
- Node.js 16+ installed
- MySQL 8.0+ installed and running

## Setup Steps

### 1. Configure MySQL Credentials
Edit the `.env` file with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=naawt_db
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Initialize Database
```bash
node init-database.js
```

This will:
- Create the `naawt_db` database
- Create all required tables (admin_users, products, orders, quotes)
- Insert default admin user (username: `admin`, password: `admin`)

### 4. Start the Server
```bash
npm start
```

Or with auto-reload (development):
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- **POST** `/api/auth/login` - Admin login
- **POST** `/api/auth/change-password` - Change admin password

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create product (requires auth, supports image upload)
- **PUT** `/api/products/:id` - Update product (requires auth)
- **DELETE** `/api/products/:id` - Delete product (requires auth)

### Orders
- **GET** `/api/orders` - Get all orders (requires auth)
- **POST** `/api/orders` - Create order
- **PUT** `/api/orders/:id` - Update order status (requires auth)

### Quotes
- **GET** `/api/quotes` - Get all quotes (requires auth)
- **POST** `/api/quotes` - Create quote
- **PUT** `/api/quotes/:id` - Update quote status (requires auth)

## Database Schema

### admin_users
- id (INT, Primary Key)
- username (VARCHAR, Unique)
- password (VARCHAR, hashed)
- created_at, updated_at

### products
- id (INT, Primary Key)
- name (VARCHAR)
- category (VARCHAR)
- description (TEXT)
- image_url (VARCHAR)
- specifications (JSON)
- created_at, updated_at

### orders
- id (INT, Primary Key)
- customer_name (VARCHAR)
- customer_email (VARCHAR)
- customer_phone (VARCHAR)
- product_id (INT, Foreign Key)
- quantity (INT)
- status (VARCHAR, default: 'pending')
- notes (TEXT)
- created_at, updated_at

### quotes
- id (INT, Primary Key)
- customer_name (VARCHAR)
- customer_email (VARCHAR)
- customer_phone (VARCHAR)
- product_ids (JSON)
- details (TEXT)
- status (VARCHAR, default: 'pending')
- created_at, updated_at

## Environment Variables

```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=naawt_db
JWT_SECRET=your_super_secret_key_change_this
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
FILE_UPLOAD_PATH=./uploads
```

## Default Admin Credentials
- **Username:** admin
- **Password:** admin
- ⚠️ Change these immediately in production!

## File Upload
- Images are uploaded to the `uploads/` directory
- File access: `http://localhost:5000/{filename}`
- Supported formats: All image types (multipart/form-data)

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check DB credentials in `.env`
- Verify MySQL user has CREATE DATABASE permissions

### Port Already in Use
- Change PORT in `.env` or use `PORT=3001 npm start`

### JWT Errors
- Update `JWT_SECRET` in `.env` to a secure value
- Regenerate tokens after changing the secret

## Next Steps
1. Update `.env` with your MySQL credentials
2. Run `node init-database.js` to initialize the database
3. Run `npm start` to start the server
4. Access the admin panel to start managing products, orders, and quotes
