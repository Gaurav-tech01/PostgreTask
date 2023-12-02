const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
const checkPass = "SELECT s.id,s.password FROM users s WHERE s.email = $1";
const addTask = "INSERT INTO tasks (title, details, duedate, userId) VALUES ($1, $2, $3, $4) RETURNING *"
const getTask = "SELECT * FROM tasks where userid = $1"
const getTaskById = "SELECT * FROM tasks where userid = $1 and id = $2"
const removeTask = "DELETE FROM tasks where userid = $1 and id = $2"
const updateTask = "UPDATE tasks SET title = $1 WHERE userId = $2 and id = $3"

module.exports = {
    checkEmailExists,
    addUser,
    checkPass,
    addTask,
    getTask,
    getTaskById,
    removeTask,
    updateTask
}