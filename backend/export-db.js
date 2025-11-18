const fs = require('fs');
const path = require('path');
const pool = require('./config/database');
require('dotenv').config();

async function exportAll() {
  const outDir = path.join(__dirname, 'export');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const client = await pool.getConnection();
  try {
    console.log('📦 Exporting data from database...');

    const tables = ['admin_users', 'products', 'orders', 'quotes'];
    for (const table of tables) {
      try {
        const [rows] = await client.query(`SELECT * FROM ${table}`);
        const outPath = path.join(outDir, `${table}.json`);
        fs.writeFileSync(outPath, JSON.stringify(rows, null, 2), 'utf8');
        console.log(`✅ Exported ${rows.length} rows from ${table} -> export/${table}.json`);
      } catch (err) {
        console.error(`❌ Failed to export table ${table}:`, err.message || err);
      }
    }

    console.log('\n✨ Export complete. Files written to backend/export/');
  } catch (err) {
    console.error('Error during export:', err);
  } finally {
    client.release();
    process.exit(0);
  }
}

exportAll();
