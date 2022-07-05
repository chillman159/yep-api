const Pool = require('pg').Pool;

const pool = new Pool({
  host: "db",
  user:"postgres",
  password: "postgres",
  database: "chargeasy",
  port: 5432
})
pool
  .connect()
  .then(() => {
    console.log("Databse connected with success");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = { pool };