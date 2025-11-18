const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    console.log('📦 Starting database initialization...');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    // Execute each statement
    for (const statement of statements) {
      try {
        await connection.query(statement);
        console.log('✅ Executed:', statement.substring(0, 50) + '...');
      } catch (error) {
        console.error('❌ Error executing statement:', error.message);
      }
    }

    console.log('\n✨ Database initialization complete!');
    console.log('📊 Tables created:');
    console.log('  - admin_users');
    console.log('  - products');
    console.log('  - orders');
    console.log('  - quotes');
    console.log('\n🔑 Default admin credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin');
  } catch (error) {
    console.error('Error during database initialization:', error);
  } finally {
    await connection.end();
  }
}

initializeDatabase();
