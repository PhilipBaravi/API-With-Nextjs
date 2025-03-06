import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER, // Your DB username
  host: process.env.DB_HOST, // Your DB host
  database: process.env.DB_NAME, // Your database name
  password: process.env.DB_PASSWORD, // Your DB password
  port: Number(process.env.DB_PORT), // Your DB port (usually 5432)
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}
