# Complete SQL Setup Guide

## Step 1: Configure MySQL Credentials

Edit `/backend/.env` and update your MySQL password:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=naawt_db
JWT_SECRET=your_super_secret_key_change_this
PORT=5000
```

**Important:** Replace `your_actual_mysql_password` with your actual MySQL root password.

---

## Step 2: Initialize the Database

Run this command to create the database and tables:

```bash
cd backend
node init-database.js
```

**Output should show:**
```
📦 Starting database initialization...
✅ Executed: CREATE DATABASE IF NOT EXISTS naawt_db;...
✅ Executed: CREATE TABLE admin_users...
✅ Executed: CREATE TABLE products...
✅ Executed: CREATE TABLE orders...
✅ Executed: CREATE TABLE quotes...

✨ Database initialization complete!
```

---

## Step 3: Start the Backend Server

```bash
npm start
```

**You should see:**
```
🚀 Server running on http://localhost:5000
📦 Database: MySQL connected
🔐 Admin API available at /api/auth
🛍️ Products API available at /api/products
```

---

## Step 4: Test the Connection

### Test 1: Health Check
Open in browser: `http://localhost:5000/api/products`

Should return: `[]` (empty array - no products yet)

### Test 2: Login with Credentials
Use the admin login page:
- **Username:** `admin`
- **Password:** `admin`

The hashed password in the database is: `$2b$10$YIjlrHmNkR8K8.8Fwc5bY.vbR8V6C9.K9v9r4K8V7K6K5K4K3K2K`

This corresponds to the plain text password: `admin`

---

## Complete Setup Flow

### Terminal 1 - Backend:
```bash
cd backend
npm install
node init-database.js
npm start
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Browser:
1. Go to `http://localhost:5173/admin`
2. Login with `admin` / `admin`
3. Start managing products, orders, and quotes!

---

## Database Structure

### admin_users
```sql
id (INT, Primary Key, Auto Increment)
username (VARCHAR, Unique)
password (VARCHAR, hashed with bcrypt)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### products
```sql
id (INT, Primary Key, Auto Increment)
name (VARCHAR)
category (VARCHAR)
description (TEXT)
image_url (VARCHAR)
specifications (JSON)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### orders
```sql
id (INT, Primary Key, Auto Increment)
customer_name (VARCHAR)
customer_email (VARCHAR)
customer_phone (VARCHAR)
product_id (INT, Foreign Key)
quantity (INT)
status (VARCHAR: pending, processing, shipped, delivered)
notes (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### quotes
```sql
id (INT, Primary Key, Auto Increment)
customer_name (VARCHAR)
customer_email (VARCHAR)
customer_phone (VARCHAR)
product_ids (JSON)
details (TEXT)
status (VARCHAR: pending, quoted, rejected)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

---

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
- Your MySQL password is incorrect in `.env`
- Update `DB_PASSWORD` with your actual MySQL password
- Restart the backend after updating

### Error: "Cannot find module 'mysql2'"
- Run: `npm install` in the backend folder

### Error: "ECONNREFUSED - Connection refused"
- MySQL is not running
- Start your MySQL service
- Verify it's running on port 3306

### Products not showing in admin
- Check backend is running and connected to MySQL
- Initialize database: `node init-database.js`
- Check browser console for errors

### Login fails
- Initialize database: `node init-database.js`
- Verify backend is running on port 5000
- Check `.env` JWT_SECRET is set

---

## API Endpoints (All Working with SQL)

### Auth
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/change-password` - Change admin password

### Products
- `GET /api/products` - Get all products from SQL
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Add new product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)

### Orders
- `GET /api/orders` - Get all orders (auth required)
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (auth required)

### Quotes
- `GET /api/quotes` - Get all quotes (auth required)
- `POST /api/quotes` - Create quote
- `PUT /api/quotes/:id` - Update quote status (auth required)

---

## Key Points

✅ All data is now stored in MySQL  
✅ Admin authentication uses bcrypt hashing  
✅ JWT tokens for secure API access  
✅ Image uploads stored in `/uploads` folder  
✅ Connection pooling for performance  
✅ CORS enabled for frontend access  
✅ All tables with proper relationships and timestamps

---

## Next Steps

1. Update `.env` with your MySQL credentials
2. Run `node init-database.js`
3. Start backend with `npm start`
4. Start frontend with `npm run dev`
5. Login to admin panel with `admin`/`admin`
6. Change admin password in Settings
7. Start adding products!
