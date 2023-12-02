const Pool = require('pg').Pool
const dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
    connectionString: process.env.password,
    ssl: true
})

module.exports = pool