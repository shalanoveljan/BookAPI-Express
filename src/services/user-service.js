const pool = require('../config/db')
const bcrypt = require('bcrypt')

const userModel = require('../models/userModels/user-Model')
const userAddModelDTO = require('../models/userModels/user-AddModelDTO')
const userUpdateModelDTO = require('../models/userModels/user-UpdateModelDTO')

const { ErrorResponse, SuccesResponse } = require('../utils/response')

const { DATA_LISTED_SUCCESSFULLY, DATA_NOT_FOUND, DATA_ADDED_SUCCESSFULLY, DATA_UPDATED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY, DUPLICATE_DATA_FOUND } = require('../utils/messages')

const getAllUsers = async () => {
  try {
    const data = await pool.query('select * from users')
    const result = data?.rows && data.rows.length > 0 ? userModel.mapAll(data.rows) : null
    if (result !== null) {
      return new SuccesResponse(DATA_LISTED_SUCCESSFULLY, result)
    }
    else {
      return new ErrorResponse(DATA_NOT_FOUND)
    }
  } catch (error) {
    return new ErrorResponse(error.message)

  }
}

const getUserById = async (id) => {
  try {
    const data = await pool.query('select * from users where id=$1', [id])
    const result = data?.rows && data.rows.length > 0 ? userModel.mapOne(data.rows[0]) : null
    if (result !== null) {
      return new SuccesResponse(DATA_LISTED_SUCCESSFULLY, result)
    }
    else {
      return new ErrorResponse(DATA_NOT_FOUND)
    }
  }
  catch (error) {
    return new ErrorResponse(error.message)
  }
}
const getUserByUsername = async (username) => {
  try {
    const data = await pool.query('select * from users where username=$1', [username])
    const result = data?.rows && data.rows.length > 0 ? userModel.mapOne(data.rows[0]) : null
    if (result !== null) {
      return new SuccesResponse(DATA_LISTED_SUCCESSFULLY, result)
    }
    else {
      return new ErrorResponse(DATA_NOT_FOUND)
    }
  } catch (error) {
    return new ErrorResponse(error.message)
  }
}
const addUser = async (user) => {
  try {
    const checkDuplicateUser = await getUserByUsername(user.username)
    if (checkDuplicateUser.status === true) {
      return new ErrorResponse(DUPLICATE_DATA_FOUND)
    }
    user.password = await bcrypt.hash(user.password, 10)
    const data = pool.query('call add_user($1,$2)', [user.username, user.password])
    return new userAddModelDTO(data)

  } catch (error) {
    return {
      message: new ErrorResponse(error.message),
      code: error.code
    }
  }
}
const updateUser = async (user) => {
  try {
    user.password = await bcrypt.hash(user.password, 10)
    const data = await pool.query('call update_user($1,$2,$3)', [user.id, user.username, user.password])
    return new userUpdateModelDTO(data)
  } catch (error) {
    return new ErrorResponse(error.message)
  }
}
const deleteUser = async (id) => {
  try {
    const checkDeleteData = await getUserById(id)
    if (checkDeleteData.status === false) {
      return new ErrorResponse(DATA_NOT_FOUND)
    }
    const data = await pool.query('call delete_user($1)', [id])
    return new SuccesResponse(DATA_DELETED_SUCCESSFULLY, data)
  } catch (error) {
    return new ErrorResponse(error.message)
  }
}
module.exports = { getAllUsers, getUserById, getUserByUsername, addUser, updateUser, deleteUser }