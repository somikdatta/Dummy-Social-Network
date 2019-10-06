const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://somikdatta:8jJuDbh6Z08s5TrZ@cluster0-owthk.mongodb.net/udemy-mean?retryWrites=true&w=majority", { useNewUrlParser: true, reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
