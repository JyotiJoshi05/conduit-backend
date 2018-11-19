const express = require('express');
const router = express.Router();
const UserController = require('../../controller/userController');
const userController = new UserController();
//Check if a user exists
router.post('/login', function (req, res) {
    userController.exists(req, res);
});
//Get details of user
router.get('/profiles/:username', function (req, res) {
    userController.findById(req, res);
});
//Update user
router.put('/:id', function (req, res) {
    userController.update(req, res);
});
//Register a user
router.post('', function (req, res) {
    userController.create(req, res);
});
module.exports = router;