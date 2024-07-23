class BookAddModelDTO {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
    this.publishedDate = data.published_date;
    this.isbn = data.isbn;
  }
}
module.exports = BookAddModelDTO;