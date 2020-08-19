const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();

const Cats = require("../models/cat-images");
const Test = require("../models/cat-images")


//Used this to manual upload cat images to Mongodb Atlas
router.post("/upload", (req, res) => {
  Cats.create(req.body).then((data) => {
    console.log(req.body);
    res.send(data);
  });
});


// // just testing
// router.post("/test", (req, res) => {
//   Test.create({
//     _id: new mongoose.Types.ObjectId(),
//     url: req.body.url,
//     value: req.body.value
//   }).then((data) => {
//     res.send(data)
//   })
// });

module.exports = router;
