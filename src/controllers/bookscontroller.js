const booksService = require('../services/books-service')
const { DATA_LISTED_SUCCESSFULLY, DATA_NOT_FOUND, DUPLICATE_DATA_FOUND, DATA_ADDED_SUCCESSFULLY, DATA_UPDATED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY } = require('../utils/messages')
const { SuccesResponse, ErrorResponse } = require('../utils/response')


const getAllBooks = async (req, res) => {
  const serviceData = await booksService.getAllBooks()
  const result = (serviceData.status === true) ? new SuccesResponse(DATA_LISTED_SUCCESSFULLY, serviceData.data) : new ErrorResponse(serviceData.message)
  if (result.message === DATA_NOT_FOUND) {
    return res.status(404).json(result)
  }
  else if (result.status === false && !result.message === DATA_NOT_FOUND) {
    return res.status(500).json(result)
  }
  else {
    return res.status(200).json(result)
  }
}
const getOneBook = async (req, res) => {
  const serviceData = await booksService.getOneBook(req.params.id)
  const result = (serviceData.status === true) ? new SuccesResponse(DATA_LISTED_SUCCESSFULLY, serviceData.data) : new ErrorResponse(serviceData.message)
  if (result.message === DATA_NOT_FOUND) {
    return res.status(404).json(result)
  }
  else if (result.status === false && !result.message === DATA_NOT_FOUND) {
    return res.status(500).json(result)
  }
  else {
    return res.status(200).json(result)
  }
}
const getBooksByTitle = async (req, res) => {
  const serviceData = await booksService.getBooksByTitle(req.params.title)
  const result = (serviceData.status === true) ? new SuccesResponse(DATA_LISTED_SUCCESSFULLY, serviceData.data) : new ErrorResponse(serviceData.message)
  if (result.message === DATA_NOT_FOUND) {
    return res.status(404).json(result)
  }
  else if (result.status === false && result.message !== DATA_NOT_FOUND) {
    return res.status(500).json(result)
  }
  else {
    return res.status(200).json(result)
  }
}
const addBook = async (req, res) => {
  const serviceData = await booksService.addBook(req.body)
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
  else if (result.status === false && result.message !== DUPLICATE_DATA_FOUND) {
    return res.status(500).json(result)
  }
  else {
    return res.status(201).json(result)
  }
}

const updateBook = async (req, res) => {
  const serviceData = await booksService.updateBook(req.body)
  const result = (serviceData.status !== false) ? new SuccesResponse(DATA_UPDATED_SUCCESSFULLY) : new ErrorResponse(serviceData.message)
  if (result.status !== false) {
    return res.status(200).json(result)
  }
  else {
    return res.status(500).json(result)
  }

}

const deleteBook = async (req, res) => {
  const serviceData = await booksService.deleteBook(req.params.id)
  const result = (serviceData.status !== false) ? new SuccesResponse(serviceData.message) : new ErrorResponse(serviceData.message)
  if (result.status === true) {
    return res.status(200).json(result)
  }
  else {
    return res.status(500).json(result)
  }

}
module.exports = { getAllBooks, getOneBook, getBooksByTitle, addBook, updateBook, deleteBook }