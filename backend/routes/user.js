const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({
          message: 'Email does not exist!'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Password does not match!'
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        'npkr8ryPpOiY_MkSVlcFZLmcV7KB6AOuV1NVDS9QCDc3Hf3m7RIqMkKgGXv9TnmtFLjDEPUguwu_M3p0EHIzyxigfVPLWlBTmMBIKbE3Nhb7Qt66Vn3JTY7VuquRjbseEfS2l3bjxoF2HIZMzzhSLjYtf4eD_WNI8QyRKc5-OUa8YVMBuHA7pIsQILsPOeyOf_yEVoU7tYilErPS70XYCvjfnHqqVVHWrhFf0mCChoVRWn6a1UfEKzDbiCkyhgb0wLwk7TahLCjleh2MsY_50l7PD4HzcRs6QvBM8SHDnhCILiU_1HIHO_F7O04NjqP6cNR9tE7c6QFEj6gFkxZ8Aw',
        { expiresIn: '1d' }
      );
      res.status(200).json({
        token: token
      })
    }).catch(err => {
      res.status(401).json({
        message: 'Authentication failed!'
      });
    });
});

module.exports = router;
