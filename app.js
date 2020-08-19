const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

// used dotenv to hide password
require("dotenv").config();
const port = process.env.PORT || 4500;
const URL =
  "mongodb+srv://jaeCat:" +
  process.env.MONGODB_ATLAS_PWD +
  "@catapi.rw97b.mongodb.net/catAPI?retryWrites=true&w=majority";

const indexRoute = require("./routes/index");
const Cats = require("./models/cat-images");


const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/cats', indexRoute)


mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(`MongoDB connection Error: ${err}`);
  });



app.get("/", (req, res) => {
  Cats.find({}).then(cats => {
    const catImage = cats[Math.floor(Math.random() * cats.length)]
    const upVotedCat = cats.filter(cat => cat.value === 1)
    const downVotedCat = cats.filter(cat => cat.value === 0)
    res.render('index', {
      randomCatImg: catImage, upVotedCat, downVotedCat
    })
    })
  })

  //When vote button is pressed, update it to database
  //It took so long to make it work. I still do not understand why app.put or app.patch is not working.. anyone?
app.post("/like/:id", (req, res) => {
  Cats.findByIdAndUpdate(req.params.id, {value: 1}, (err, cat) => {
    if (err) {
      res.send(`Error: ${err}`)
    } else {
      res.redirect('/')
    }
  })
})

app.post("/dislike/:id", (req,res) => {
  Cats.findByIdAndUpdate(req.params.id, {value: 0}, (err, cat) => {
    if (err) {
      res.send(`Error: ${err}`)
    } else {
      res.redirect('/')
    }
  })
})

app.listen(port, () => {
  console.log('Server is on!')
})