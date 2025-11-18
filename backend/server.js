const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const pool = require('./config/database');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ==================== AUTH ENDPOINTS ====================

// Admin Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Change Password
app.post('/api/auth/change-password', verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT * FROM admin_users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, users[0].password);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: 'Old password incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await connection.query(
      'UPDATE admin_users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );
    connection.release();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== PRODUCT ENDPOINTS ====================

// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.query('SELECT * FROM products');
    connection.release();

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    connection.release();

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(products[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add Product (with image upload)
app.post('/api/products', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, category, description, specifications } = req.body;
    const imageUrl = req.file ? `http://localhost:5000/${req.file.filename}` : null;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO products (name, category, description, image_url, specifications) VALUES (?, ?, ?, ?, ?)',
      [
        name,
        category,
        description,
        imageUrl,
        JSON.stringify(specifications || {}),
      ]
    );
    connection.release();

    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Product
app.put('/api/products/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, specifications } = req.body;

    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (products.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Product not found' });
    }

    let imageUrl = products[0].image_url;
    if (req.file) {
      imageUrl = `http://localhost:5000/${req.file.filename}`;
    }

    await connection.query(
      'UPDATE products SET name = ?, category = ?, description = ?, image_url = ?, specifications = ? WHERE id = ?',
      [
        name,
        category,
        description,
        imageUrl,
        JSON.stringify(specifications || {}),
        id,
      ]
    );
    connection.release();

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Product
app.delete('/api/products/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    const [products] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (products.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Product not found' });
    }

    await connection.query('DELETE FROM products WHERE id = ?', [id]);
    connection.release();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== ORDER ENDPOINTS ====================

// Get All Orders
app.get('/api/orders', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [orders] = await connection.query('SELECT * FROM orders ORDER BY created_at DESC');
    connection.release();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, productId, quantity, notes } = req.body;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO orders (customer_name, customer_email, customer_phone, product_id, quantity, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [customerName, customerEmail, customerPhone, productId, quantity, notes]
    );
    connection.release();

    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Order Status
app.put('/api/orders/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const connection = await pool.getConnection();
    await connection.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    connection.release();

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== QUOTE ENDPOINTS ====================

// Get All Quotes
app.get('/api/quotes', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [quotes] = await connection.query('SELECT * FROM quotes ORDER BY created_at DESC');
    connection.release();
    res.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Quote
app.post('/api/quotes', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, productIds, details } = req.body;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO quotes (customer_name, customer_email, customer_phone, product_ids, details) VALUES (?, ?, ?, ?, ?)',
      [customerName, customerEmail, customerPhone, JSON.stringify(productIds), details]
    );
    connection.release();

    res.status(201).json({
      message: 'Quote created successfully',
      quoteId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Quote Status
app.put('/api/quotes/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const connection = await pool.getConnection();
    await connection.query('UPDATE quotes SET status = ? WHERE id = ?', [status, id]);
    connection.release();

    res.json({ message: 'Quote updated successfully' });
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📦 Database: MySQL connected');
  console.log('🔐 Admin API available at /api/auth');
  console.log('🛍️  Products API available at /api/products');
});