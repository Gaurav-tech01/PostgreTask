const pool = require('../../db')
const queries = require('./queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const addUser = async (req, res) => {
    try {
        let success = false
        const { email, password } = req.body
        const result = await pool.query(queries.checkEmailExists, [email])
        if (result.rows.length) {
            res.send("Already Exists");
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(password, salt)
            const result = await pool.query(queries.addUser, [email, secPass])
            const id = result.rows[0].id
            const data = {
                user: {
                    id,
                    email
                }
            }
            const authToken = jwt.sign(data, process.env.secret)
            success = true
            res.json({ success, authToken })
        }
    }
    catch (error) {
        // console.error(error.message);
        res.status(500).send(error.message)
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let success = false
        const result = await pool.query(queries.checkPass, [email])
        if (!(result.rows.length)) {
            res.send("User Not Present");
        } else {
            const passComp = await bcrypt.compare(password, result.rows[0].password)
            if (!passComp) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            } else {
                const id = result.rows[0].id
                const data = {
                    user: {
                        id,
                        email
                    }
                }
                const authToken = jwt.sign(data, process.env.secret)
                success = true
                res.json({ success, authToken })
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
}

const addTask = async (req, res) => {
    try {
        const { title, details, duedate } = req.body
        const result = await pool.query(queries.addTask, [title, details, duedate, req.user.id])
        res.send(result.rows[0])
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
const getTask = async (req, res) => {
    try {
        const result = await pool.query(queries.getTask, [req.user.id])
        res.send(result.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const getTaskById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pool.query(queries.getTaskById, [req.user.id, id])
        const noTask = !result.rows.length
        if (noTask) {
            res.send("Task Not Present");
        } else {
            res.send(result.rows)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pool.query(queries.getTaskById, [req.user.id, id])
        const noTask = !result.rows.length
        if (noTask) {
            res.send("Task Not Present");
        } else {
            await pool.query(queries.removeTask, [req.user.id, id])
            res.send("Task deleted successfully")
        }
    } catch (error) {
        // console.error(error.message);
        res.status(500).send(error.message)
    }
}
const updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { title } = req.body
        const result = await pool.query(queries.getTaskById, [req.user.id, id])
        const noTask = !result.rows.length
        if (noTask) {
            res.send("Task Not Present");
        } else {
            await pool.query(queries.updateTask, [title, req.user.id, id])
            res.send("Task Updated successfully")
        }
    } catch (error) {
        // console.error(error.message);
        res.status(500).send(error.message)
    }
}

module.exports = {
    addUser,
    loginUser,
    addTask,
    getTask,
    getTaskById,
    deleteTask,
    updateTask
}