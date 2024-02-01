const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:marcus@localhost:5432/gamestore';

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;