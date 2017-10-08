module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "project2db",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "project2db",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
}
