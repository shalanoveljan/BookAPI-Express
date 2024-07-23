const userServices = require('../services/user-service');
const { DATA_LISTED_SUCCESSFULLY, DATA_NOT_FOUND, DATA_ADDED_SUCCESSFULLY, DATA_UPDATED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY, DUPLICATE_DATA_FOUND, DATA_NOT_UPDATED, DATA_NOT_DELETED } = require('../utils/messages');
const { SuccesResponse, ErrorResponse } = require('../utils/response');

const getAllUsers = async (req, res) => {
  const serviceData = await userServices.getAllUsers();
  const result = (serviceData.status === true) ? new SuccesResponse(DATA_LISTED_SUCCESSFULLY, serviceData.data) : new ErrorResponse(serviceData.message)
  if (result.message === DATA_NOT_FOUND) { res.status(404).json(result) }
  if (result.status !== true && result.message !== DATA_NOT_FOUND) { res.status(500).json(result) }
  res.status(200).json(result)
}

const getUserById = async (req, res) => {
  const serviceData = await userServices.getUserById(req.params.id)
  const result = (serviceData.status === true) ? new SuccesResponse(DATA_LISTED_SUCCESSFULLY, serviceData.data) : new ErrorResponse(serviceData.message)
  if (result.message === DATA_NOT_FOUND) { return res.status(404).json(result) }
  if (result.status !== true && result.message !== DATA_NOT_FOUND) { return res.status(500).json(result) }
  return res.status(200).json(result)
}
const getUserByUsername = async (req, res) => {
  const serviceData = await userServices.getUserByUsername(req.params.username)
  const result = (serviceData.status === true) ? new SuccesResponse(DATA_LISTED_SUCCESSFULLY, serviceData.data) : new ErrorResponse(serviceData.message)
  if (result.message === DATA_NOT_FOUND) { return res.status(404).send(result) }
  if (result.status !== true && result.message !== DATA_NOT_FOUND) {
    return res.status(500).json(result)

  }
  return res.status(200).json(result)
}

const addUser = async (req, res) => {
  const serviceData = await userServices.addUser(req.body)
  let result
  if (serviceData.message && serviceData.code === '23505') {
    result = new ErrorResponse(DUPLICATE_DATA_FOUND)
  }
  else if (serviceData.message) {
    result = new ErrorResponse(serviceData.message)
  }
  else {
    result = new SuccesResponse(DATA_ADDED_SUCCESSFULLY)
  }



  if (result.status === false && result.message === DUPLICATE_DATA_FOUND) {
    return res.status(409).json(result)
  }
  if (result.status === false && result.message !== DUPLICATE_DATA_FOUND) {
    res.status(400).json(result)
    return
  }
  return res.status(201).json(result)

}
const updateUser = async (req, res) => {
  const serviceData = await userServices.updateUser(req.body)
  const result = (serviceData.status !== false) ? new SuccesResponse(DATA_UPDATED_SUCCESSFULLY) : new ErrorResponse(serviceData.message)
  if (result.status !== false) {
    res.status(200).json(result)
    return
  }
  return res.status(500).json(result)
}
const deleteUser = async (req, res) => {
  const serviceData = await userServices.deleteUser(req.params.id)
  const result = (serviceData !== false) ? new SuccesResponse(serviceData.message) : new ErrorResponse(serviceData.message)
  if (result.status !== false) {
    res.status(200).json(result)
    return
  }
  res.status(500).json(result)
}

module.exports = { getAllUsers, getUserById, getUserByUsername, addUser, updateUser, deleteUser }  