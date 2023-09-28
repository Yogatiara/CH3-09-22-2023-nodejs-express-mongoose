const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '"Name" must be filled'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [
      true,
      '"Price" tour must be filled',
    ],
  },
});

const tourModel = mongoose.model(
  "Tour",
  tourSchema
);

module.exports = tourModel;
