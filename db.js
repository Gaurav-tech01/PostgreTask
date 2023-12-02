const Pool = require('pg').Pool
const dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"task",
    password:process.env.password,
    port: 5432
})

module.exports = pool