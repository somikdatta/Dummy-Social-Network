const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.send("Access Denied.");
})

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.status(401).json({
        message: 'Email does not exist!'
      });
    }
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      res.status(401).json({
        message: 'Password does not match!'
      });
    }

  }).catch(err => {
    res.status(401).json({
      message: 'Authentication failed!'
    });
  });
});

module.exports = router;
