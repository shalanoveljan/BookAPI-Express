const pool = require('../config/db')
const bookModel = require('../models/bookModels/book-Model')
const bookAddModelDTO = require('../models/bookModels/book-AddModelDTO')
const bookUpdateDTO = require('../models/bookModels/book-UpdateModelDTO')
const { ErrorResponse, SuccesResponse } = require('../utils/response')
const { DATA_LISTED_SUCCESSFULLY, DATA_NOT_FOUND, DATA_DELETED_SUCCESSFULLY } = require('../utils/messages')


const getAllBooks = async () => {
  try {
    const data = await pool.query('select * from books')
    const result = data?.rows && data.rows.length > 0 ? bookModel.mapAll(data.rows) : null
    if (result !== null) {
      return new SuccesResponse(DATA_LISTED_SUCCESSFULLY, result)
    } else {
      return new ErrorResponse(DATA_NOT_FOUND)
    }
  } catch (error) {
    return new ErrorResponse(error.message)
  }

}
const getOneBook = async (id) => {
  try {
    const data = await pool.query('select * from books where id=$1', [id])
    const result = data?.rows && data.rows.length > 0 ? bookModel.mapOne(data.rows[0]) : null
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
const getBooksByTitle = async (title) => {
  try {
    const data = await pool.query('select * from books b where b.title=$1', [title])
    const result = data?.rows && data.rows.length > 0 ? bookModel.mapOne(data.rows[0]) : null

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
const addBook = async (book) => {
  try {
    const data = await pool.query('call add_book($1,$2,$3,$4)', [book.title, book.author, book.published_date, book.isbn])
    return new bookAddModelDTO(data)
  } catch (error) {
    return { message: new ErrorResponse(error.message), code: error.code }
  }
}
const updateBook = async (book) => {
  try {
    const data = await pool.query('call update_book($1,$2,$3,$4,$5)', [book.id, book.title, book.author, book.published_date, book.isbn])
    return new bookUpdateDTO(data)
  } catch (error) {
    return new ErrorResponse(error.message)
  }
}
const deleteBook = async (id) => {
  try {
    const checkDeleteData = await getOneBook(id)
    if (checkDeleteData.status === false) {
      return new ErrorResponse(DATA_NOT_FOUND)
    }
    else {
      const data = await pool.query('call delete_book($1)', [id])
      return new SuccesResponse(DATA_DELETED_SUCCESSFULLY, data)
    }
  } catch (error) {
    return new ErrorResponse(error.message)
  }
}
module.exports = { getAllBooks, getOneBook, getBooksByTitle, addBook, updateBook, deleteBook }