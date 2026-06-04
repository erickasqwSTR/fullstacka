// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: process.env.DB_CLIENT || 'mysql2',
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST || 'mysql',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'rootpw',
      database: process.env.DB_NAME || 'pedidosp',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
    },
    migrations:{
      directory:"./migrations"
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
