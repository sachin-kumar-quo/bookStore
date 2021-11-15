const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");

const routes = require("./api/routes");

const connectToMongo = async () => {
  mongoose.connect(
    `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

connectToMongo()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });
