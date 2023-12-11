import dotenv from "dotenv";
import pg from 'pg';

const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PODRT,
});


const query = async (text, params) => {
    //const start = Date.now();
    const result = await pool.query(text, params);
    //const duration = Date.now() - start;
    // console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
};


export { query, pool };