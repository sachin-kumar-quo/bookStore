const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();

class BookStore {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getBooksList() {
    const data = await this.getData();
    return data;
  }

  async addBook(title, author, published, publisher) {
    const data = (await this.getData()) || [];
    const book_id = uid.randomUUID(12);
    data.unshift({ book_id, title, author, published, publisher });
    return writeFile(this.datafile, JSON.stringify(data));
  }

  async getBook(book_id) {
    const data = await this.getData();
    return data.find((book) => book.book_id === book_id);
  }

  async updateBook(book_id, updatedBook) {
    const data = await this.getData();
    const book = data.find((book) => book.book_id === book_id);
    if (book) {
      book.title = updatedBook.title ? updatedBook.title : book.title;
      book.author = updatedBook.author
        ? updatedBook.author
        : book.author;
      book.published = updatedBook.published
        ? updatedBook.published
        : book.published;
      book.publisher = updatedBook.publisher
        ? updatedBook.publisher
        : book.publisher;
      return writeFile(this.datafile, JSON.stringify(data));
    }
  }

  async deleteBook(book_id) {
    const data = await this.getData();
    const book = data.find((book) => book.book_id === book_id);
    if (book) {
      data.splice(data.indexOf(book), 1);
      return writeFile(this.datafile, JSON.stringify(data));
    }
  }

  async getData() {
    const data = await readFile(this.datafile, "utf8");
    const parsedJson = JSON.parse(data);
    if (parsedJson.length < 1) return [];
    return parsedJson;
  }
}

module.exports = BookStore;
