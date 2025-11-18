const pool = require('./config/database');

async function migrate() {
  const conn = await pool.getConnection();
  try {
    console.log('Running migration: add category_slug to products');
    await conn.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS category_slug VARCHAR(255) NULL AFTER category;");
    console.log('Ensured column exists. Populating category_slug for existing rows...');

    const [rows] = await conn.query('SELECT id, category FROM products');
    for (const r of rows) {
      const cat = r.category || '';
      const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await conn.query('UPDATE products SET category_slug = ? WHERE id = ?', [slug, r.id]);
    }

    console.log('Migration complete.');
  } catch (err) {
    console.error('Migration error:', err.message || err);
  } finally {
    conn.release();
    process.exit(0);
  }
}

migrate();
