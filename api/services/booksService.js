const Book = require("../models/books");

const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();

const addBook = (title, author, published, publisher) => {
  return new Promise((resolve, reject) => {
    let book = new Book({
      book_id: uid.randomUUID(12),
      title: title,
      author: author,
      published: published,
      publisher: publisher,
    });
    book.save((err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve("Book Added Successfully!!");
      }
    });
  });
};

const getBooks = (params) => {
  const { limit = 10, page = 1, sort = "_id", order = 1 } = params;
  return new Promise((resolve, reject) => {
    Book.find(
      {},
      {},
      {
        limit: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        sort: { [sort]: parseInt(order) },
      },
      (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const getBook = (book_id) => {
  return new Promise((resolve, reject) => {
    Book.find({ book_id: book_id }, (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
};
const updateBook = (book_id, book) => {
  console.log(book);
  return new Promise((resolve, reject) => {
    Book.findOneAndUpdate(
      { book_id: book_id },
      {
        $set: {
          title: book.title,
          author: book.author,
          published: book.published,
          publisher: book.publisher,
        },
      },
      { new: true },
      (err, data) => {
        console.log(data);
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      }
    );
  });
};
const deleteBook = (book_id) => {
  return new Promise((resolve, reject) => {
    Book.findOneAndRemove({ book_id: book_id }, (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
