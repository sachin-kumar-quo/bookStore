const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  book_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published: {
    type: Date,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Book", bookSchema);
