require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 
    'postgresql://neondb_owner:npg_QhcnVZw6Wx5f@ep-bold-smoke-aynzh8ge-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const poolConfig = connectionString
    ? {
        connectionString: connectionString,
        ssl: connectionString.includes('sslmode=require') || process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false
    }
    : {
        host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
        port: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432', 10),
        user: process.env.DB_USER || process.env.PGUSER || 'postgres',
        password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'postgres',
        database: process.env.DB_NAME || process.env.PGDATABASE || 'notherbooking',
    };

const pool = new Pool(poolConfig);

// Verify connection status on boot
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ PostgreSQL connection error:', err.message);
    } else {
        console.log('✅ PostgreSQL connected successfully');
        release();
    }
});

module.exports = pool;

