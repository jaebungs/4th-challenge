const mongoose = require("mongoose");

const catImagesSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  value: Number
});

// const testSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   url: {
//     type: String,
//     required: true,
//   },
//   value: Number
// });

module.exports = mongoose.model("Cats", catImagesSchema);
// module.exports = mongoose.model("Test", testSchema)