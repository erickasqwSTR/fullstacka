require('dotenv').config();
const { URL } = require('url');

const {
  DB_CLIENT,
  DB_HOST = '127.0.0.1',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'pedidosp',
  DB_SSL = 'false'
} = process.env;

const DATABASE_URL = (process.env.DATABASE_URL || process.env.MYSQL_ADDON_URI || '').trim();
const useSsl = DB_SSL.toLowerCase() === 'true';
const client = DB_CLIENT?.trim() || 'mysql2';

const parseDatabaseUrl = (databaseUrl) => {
  const url = new URL(databaseUrl);
  return {
    host: url.hostname,
    port: url.port,
    user: url.username,
    password: url.password,
    database: url.pathname.replace(/^\//, '')
  };
};

const connection = DATABASE_URL
  ? { ...parseDatabaseUrl(DATABASE_URL), ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}) }
  : {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    };

if (!client) {
  throw new Error('Knex client is missing in knexfile. Set DB_CLIENT or use mysql2.');
}

if (!connection) {
  throw new Error('Knex connection is missing in knexfile. Set DATABASE_URL or DB_HOST/DB_NAME.');
}

module.exports = {
  development: {
    client,
    connection,
    pool: { min: 0, max: 7 }
  },
  production: {
    client,
    connection,
    pool: { min: 0, max: 7 }
  }
};