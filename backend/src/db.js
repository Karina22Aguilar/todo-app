const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'todo_db',
  port: process.env.DB_PORT || 5432,
});

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        done BOOLEAN DEFAULT false
      );
    `);
    console.log('Tabla "tasks" lista ✅');
  } catch (err) {
    console.error('Error creando tabla:', err);
  }
})();
