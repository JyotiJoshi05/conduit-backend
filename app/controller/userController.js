const UserDao = require('../dao/UserDao');
const ControllerCommon = require('./common/controllerCommon');
const User = require('../model/User');
var config = require('../config/dbconfig');
const UserCredntials = require('../model/UserCredentials');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
class UserController {
    constructor() {
        this.UserDao = new UserDao();
        this.common = new ControllerCommon();
    }
    
    findById(req, res) {
        let username= req.params.username;

        this.UserDao.findById(username)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };


    update(req, res) {
        let user = new User();
        user.id = req.body.id;
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.bio = req.body.bio;
        user.image = req.body.image;
        user.favourites = req.body.favourites;
        user.following = req.body.following;

        return this.UserDao.update(User)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };
    createUser(req,res){
        var user = new User();
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = hashedPassword.toString();
        return this.UserDao.create(user)
                .then(
                    function(res){
                        var token = jwt.sign({ username: user.email }, 'hhjhkjhkjhk', {
                        expiresIn: 86400
                        });
                    }
                )                    
                .catch(this.common.serverError(res));        
    }
    authenticateUser(req,res){
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token.' });
        
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Authentication Failed.' });
            res.status(200).send(decoded);
        });
    }
    create(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        return this.UserDao.create(user)
                .then(this.common.existsSuccess(res))                    
                .catch(this.common.serverError(res));
    };
    exists(req, res) {
        let usercred = new UserCredntials();
        usercred.email = req.body.email;
        usercred.password = req.body.password;
        this.UserDao.exists(usercred)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}
module.exports = UserController;