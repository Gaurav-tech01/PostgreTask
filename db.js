const Pool = require('pg').Pool
const dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
    connectionString: "postgres://task_uggm_user:7VyddeNiG5cNJoJV5iKICjqNgnxLe8pc@dpg-cllndmcjtl8s73ep3ba0-a.oregon-postgres.render.com:5432/task_uggm",
    ssl: true
})

module.exports = pool