const express = require('express')
const route = express.Router()
const userController = require('../controllers/userController')

route.get('/getallusers', userController.getAllUsers)
route.get('/getuserbyid/:id', userController.getUserById)
route.get('/getuserbyusername/:username', userController.getUserByUsername)
route.post('/', userController.addUser)
route.put('/', userController.updateUser)
route.delete('/:id', userController.deleteUser)


module.exports = route