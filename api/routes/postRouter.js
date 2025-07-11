const express = require('express');
const postController = require('../controllers/postController');
const postRouter = express.Router();

postRouter.post('/post', postController.createPost);
postRouter.get('/posts', postController.findAllPost);
postRouter.patch('/post/:id', postController.updatePost);
postRouter.delete('/post/:id', postController.deletePost);

module.exports = postRouter;
