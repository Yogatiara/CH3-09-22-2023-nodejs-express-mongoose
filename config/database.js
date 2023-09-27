const mongoose = require("mongoose")

const database = "mongodb://127.0.0.1:27017/tours"

const db = mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() =>
    console.log("Succes connect to database")
  )

module.exports = db
