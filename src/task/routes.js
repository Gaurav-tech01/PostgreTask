const { Router } = require('express');
const controller = require('./controller')
const authenticate = require('./middleware')
const router = Router();


router.post('/createuser', controller.addUser)
router.post('/login', controller.loginUser)
router.post('/addTask', authenticate, controller.addTask)
router.get('/getTask', authenticate, controller.getTask)
router.get('/getTask/:id', authenticate, controller.getTaskById)
router.delete('/deleteTask/:id', authenticate, controller.deleteTask)
router.put('/updateTask/:id', authenticate, controller.updateTask)

module.exports = router