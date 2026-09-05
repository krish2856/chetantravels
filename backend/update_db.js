require('dotenv').config();
const pool = require('./config/db');

async function run() {
    try {
        await pool.query('ALTER TABLE other_bookings ADD COLUMN IF NOT EXISTS total_seat INTEGER;');
        console.log("Column added successfully or already exists");
    } catch (e) {
        console.error("Error updating database schema:", e.message);
    } finally {
        pool.end();
    }
}
run();

