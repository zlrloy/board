const express = require('express');
const postController = require('../controllers/postController');
const postRouter = express.Router();

postRouter.post('/', postController.createPost);
postRouter.get('/', postController.findAllPost);
postRouter.patch('/:id', postController.updatePost);
postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;
