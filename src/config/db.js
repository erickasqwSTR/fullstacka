require('dotenv').config();
const knex = require('knex');
const { Model } = require('objection');
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

const normalizeClient = (rawClient) => {
  const normalized = rawClient?.trim().toLowerCase();
  if (!normalized || normalized === 'mysql' || normalized === 'mysql2' || normalized === 'mysql12') {
    return 'mysql2';
  }
  return normalized;
};

const client = normalizeClient(DB_CLIENT);

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

const knexConfig = {
  client,
  connection,
  pool: { min: 0, max: 7 }
};

if (!knexConfig.client) {
  throw new Error('Knex client is missing. Set DB_CLIENT or use mysql2.');
}

if (!knexConfig.connection) {
  throw new Error('Knex connection is missing. Set DATABASE_URL or DB_HOST/DB_NAME.');
}

const db = knex(knexConfig);

Model.knex(db);

// Prueba de conexión inmediata
 db.raw('SELECT 1')
  .then(() => console.log('¡Conexión a MySQL exitosa!'))
  .catch((err) => console.error('Error al conectar a MySQL:', err.message));

module.exports = db;