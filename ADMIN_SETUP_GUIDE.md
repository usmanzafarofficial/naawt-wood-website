# Admin System Setup - SQL Backend Integration

## What Was Fixed

The admin panel is now fully integrated with the SQL backend. Here's what was updated:

### Frontend Changes:
1. ✅ Created `/services/api.ts` - API service for all backend communication
2. ✅ Updated `AdminLogin.tsx` - Now authenticates against the backend API
3. ✅ Updated `AdminPage.tsx` - Now fetches data from the backend
4. ✅ Updated `.env.local` - Added `VITE_API_URL=http://localhost:5000/api`

### Backend Structure:
- Express.js server with MySQL database
- JWT authentication for admin access
- RESTful API for products, orders, and quotes
- File upload support for product images

---

## Complete Setup Instructions

### Step 1: Start the Backend Server

```bash
cd backend
npm install  # (if not already done)
npm start    # Starts server on http://localhost:5000
```

Or with auto-reload in development:
```bash
npm run dev
```

### Step 2: Initialize the Database

Before the first run, set up your MySQL database:

```bash
# Make sure MySQL is running, then:
node init-database.js
```

This will:
- Create the `naawt_db` database
- Create all required tables
- Insert default admin user: `admin`/`admin`

### Step 3: Update Backend .env Credentials

Edit `/backend/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password  # Update this!
DB_NAME=naawt_db
JWT_SECRET=your_super_secret_key_change_this  # Update this!
PORT=5000
```

### Step 4: Start the Frontend

```bash
cd frontend
npm install  # (if needed)
npm run dev
```

The frontend will run on `http://localhost:5173` or similar.

---

## Testing the Admin Panel

1. **Navigate to admin:**
   - Go to `http://localhost:5173/admin` (or your frontend URL)
   - Or click "Admin" link in the header

2. **Login with default credentials:**
   - Username: `admin`
   - Password: `admin`

3. **Available Features:**
   - ✅ **Products** - Create, read, update, delete products with images
   - ✅ **Orders** - View and manage order statuses
   - ✅ **Quotes** - View and manage quote requests
   - ✅ **Settings** - Change admin password

---

## API Endpoints

All endpoints are at `http://localhost:5000/api/`

### Authentication
- `POST /auth/login` - Login (returns JWT token)
- `POST /auth/change-password` - Change password (requires auth)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (requires auth, supports image upload)
- `PUT /products/:id` - Update product (requires auth)
- `DELETE /products/:id` - Delete product (requires auth)

### Orders
- `GET /orders` - Get all orders (requires auth)
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order status (requires auth)

### Quotes
- `GET /quotes` - Get all quotes (requires auth)
- `POST /quotes` - Create quote
- `PUT /quotes/:id` - Update quote status (requires auth)

---

## Troubleshooting

### "Cannot connect to backend" error
- ✅ Check backend server is running (`npm start`)
- ✅ Verify `VITE_API_URL` in `.env.local` is correct
- ✅ Check backend is on port 5000
- ✅ Check CORS is enabled in backend

### "Access denied for user 'root'" 
- ✅ Update `DB_PASSWORD` in backend `.env`
- ✅ Ensure MySQL is running
- ✅ Verify user has database creation permissions

### Login fails with "Invalid credentials"
- ✅ Initialize database with `node init-database.js`
- ✅ Check backend is running
- ✅ Try default credentials: `admin`/`admin`

### Products not loading
- ✅ Check orders/quotes table exist in database
- ✅ Ensure database was initialized
- ✅ Check browser console for specific errors
- ✅ Check backend server logs

---

## Database Schema

### admin_users
```sql
id (INT, Primary Key)
username (VARCHAR, Unique)
password (VARCHAR, hashed with bcrypt)
created_at, updated_at
```

### products
```sql
id (INT, Primary Key)
name (VARCHAR)
category (VARCHAR)
description (TEXT)
image_url (VARCHAR)
specifications (JSON)
created_at, updated_at
```

### orders
```sql
id (INT, Primary Key)
customer_name (VARCHAR)
customer_email (VARCHAR)
customer_phone (VARCHAR)
product_id (INT, Foreign Key)
quantity (INT)
status (VARCHAR: pending, processing, shipped, delivered)
notes (TEXT)
created_at, updated_at
```

### quotes
```sql
id (INT, Primary Key)
customer_name (VARCHAR)
customer_email (VARCHAR)
customer_phone (VARCHAR)
product_ids (JSON)
details (TEXT)
status (VARCHAR: pending, quoted, rejected)
created_at, updated_at
```

---

## Security Notes

⚠️ **IMPORTANT - Change these before production:**

1. **Admin Password**
   - Default: `admin`/`admin`
   - Change via Settings tab in admin panel

2. **JWT Secret**
   - Set `JWT_SECRET` in `/backend/.env`
   - Use a strong, random string

3. **MySQL Credentials**
   - Never use default root password
   - Set strong password in `/backend/.env`

---

## Next Steps

1. ✅ Start backend server: `npm start` (in backend folder)
2. ✅ Initialize database: `node init-database.js`
3. ✅ Start frontend: `npm run dev` (in frontend folder)
4. ✅ Navigate to admin panel and test
5. ✅ Change default admin password
6. ✅ Start managing products, orders, and quotes!

---

## File Locations

```
backend/
├── server.js              # Main Express server
├── init-database.js       # Database initialization script
├── .env                   # Environment variables
├── package.json
├── config/
│   └── database.js        # MySQL pool configuration
└── database/
    └── schema.sql         # Database schema

frontend/
├── App.tsx                # Main app component
├── .env.local             # Frontend env variables
├── pages/
│   ├── AdminLogin.tsx     # Login page (now uses backend)
│   └── AdminPage.tsx      # Admin dashboard (now uses backend)
└── services/
    └── api.ts             # API service layer
```
