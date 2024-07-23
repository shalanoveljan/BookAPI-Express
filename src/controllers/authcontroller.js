const authModel = require('../models/authModel/auth-model')
const authService = require('../services/auth-service')
const { ErrorResponse, SuccesResponse } = require('../utils/response')

const loginUser = async (req, res) => {
  const authModelDTO = new authModel(req.body)
  const result = await authService.loginUser(authModelDTO)
  if (result.status !== true) {
    return res.status(400).json(result)
  }
  return res.status(200).json(result)
}
module.exports = { loginUser } 