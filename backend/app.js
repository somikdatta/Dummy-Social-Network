const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://somikdatta:8jJuDbh6Z08s5TrZ@cluster0-owthk.mongodb.net/test?retryWrites=true&w=majority")
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

app.post("/api/posts", (req, res, next) => {
  const posts = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(posts);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: '12ab', title: 'First server side post', content: 'This is coming from the server' },
    { id: '123abc', title: 'Second server side post', content: 'This is coming from the server as well' }
  ];
  return res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
