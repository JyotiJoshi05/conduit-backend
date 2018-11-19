const express = require('express');
const router = express.Router();
const ArticleController = require('../../controller/ArticleController');
const articleController = new ArticleController();
//Count total number of articles
router.get('/count', function (req,res) {
    articleController.countAll(res);
});
//Get details of article by id
router.get('/:slug', function (req, res) {
    articleController.findById(req, res)
});
//Fetch all articles
router.get('', function (req,res) {
    articleController.findAll(res);
});
// //Update an article
router.put('/:slug', function (req, res) {
    articleController.update(req, res)
});
//Create an article
router.post('', function (req, res) {
    articleController.create(req, res);
});
//Delete an article
router.delete('/:slug', function (req, res) {
    articleController.deleteById(req, res)
});
module.exports = router;