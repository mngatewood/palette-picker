module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettes',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
