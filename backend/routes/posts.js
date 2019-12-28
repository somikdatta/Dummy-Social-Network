const express = require("express");
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const postsController = require('../controllers/posts')
const router = express.Router();


router.get('', postsController.getAllPosts);

router.get('/:id', postsController.getPostById)

router.post("", checkAuth, extractFile, postsController.createPost);

router.patch("/:id", checkAuth, extractFile, postsController.updatePost)

router.delete("/:id", checkAuth, postsController.deletePost);

module.exports = router;
