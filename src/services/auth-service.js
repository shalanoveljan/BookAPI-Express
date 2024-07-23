const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const userServices = require('../services/user-service')
const { ErrorResponse, SuccesResponse } = require('../utils/response')
const { USER_NOT_FOUND, PASSWORD_INCORRECT, LOGIN_SUCCESSFULLY } = require('../utils/messages')
const AccesToken = require('../utils/accesToken')

const loginUser = async (user) => {
  const checkUser = await userServices.getUserByUsername(user.username)
  if (checkUser.status === false) {
    return new ErrorResponse(USER_NOT_FOUND)
  }
  const checkPassword = await bcrypt.compare(user.password, checkUser.data.password)
  if (!checkPassword) {
    return new ErrorResponse(PASSWORD_INCORRECT)
  }
  const token = jwt.sign({ username: checkUser.data.username }, process.env.SECRET_KEY, { expiresIn: '5m' })

  const expireDate = new Date()
  expireDate.setMinutes(expireDate.getMinutes() + 5)
  const accessToken = new AccesToken(token, expireDate.toString())
  console.log(accessToken)
  return new SuccesResponse(LOGIN_SUCCESSFULLY, accessToken)
}
module.exports = {loginUser} 