const bcrypt = require('bcrypt');
const pool = require('./config/database');

async function fixPasswords() {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT id, username, password FROM admin_users');
    for (const row of rows) {
      const pwd = row.password || '';
      // If it doesn't look like a bcrypt hash, update it
      if (!pwd.startsWith('$2')) {
        const hashed = await bcrypt.hash(pwd || 'admin', 10);
        await conn.query('UPDATE admin_users SET password = ? WHERE id = ?', [hashed, row.id]);
        console.log(`Updated password for user ${row.username}`);
      } else {
        console.log(`Password for ${row.username} already hashed`);
      }
    }
  } catch (err) {
    console.error('Error fixing passwords:', err.message || err);
  } finally {
    conn.release();
    process.exit(0);
  }
}

fixPasswords();
