const express = require('express')
const route = express.Router()
const booksController = require('../controllers/bookscontroller')

route.get('/getallbooks', booksController.getAllBooks)
route.get('/getbookbyid/:id', booksController.getOneBook)
route.get('/getbookbytitle/:title', booksController.getBooksByTitle)
route.post('/', booksController.addBook)
route.put('/', booksController.updateBook)
route.delete('/:id', booksController.deleteBook)

module.exports = route