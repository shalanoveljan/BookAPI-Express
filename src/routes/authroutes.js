const express = require('express')
const route = express.Router()
const authController = require('../controllers/authcontroller')



route.post('/login', authController.loginUser)

module.exports =  route 

