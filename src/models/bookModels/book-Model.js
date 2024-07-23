class BookModel {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.author = data.author;
    this.publishedDate = data.published_date;
    this.isbn = data.isbn
  }
  static mapAll(datas) {
    const rows = []
    for (const data of datas) {
      const book = new BookModel(data)
      rows.push(book)
    }
    return rows
  }
  static mapOne(data) {
    return new BookModel(data)
  }
}


module.exports = BookModel;