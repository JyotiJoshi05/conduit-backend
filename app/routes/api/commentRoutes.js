const express = require('express');
const router = express.Router();
const CommentController = require('../../controller/CommentController');
const commentController = new CommentController();
//Find comments by article Id
router.get('/:id', function (req, res) {
    commentController.findAll(req,res);
});
//Create a comment
router.post('/create', function (req, res) {
    commentController.create(req, res);
});
//Delete a comment
router.delete('/delete/:id', function (req, res) {
    commentController.deleteById(req, res)
});
module.exports = router;