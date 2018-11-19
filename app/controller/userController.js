const UserDao = require('../dao/UserDao');
const ControllerCommon = require('./common/controllerCommon');
const User = require('../model/User');
const UserCredntials = require('../model/UserCredentials');
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

    create(req, res) {
        let user = new User();
        if (req.body.id) {
            user.id = req.body.id;
        }
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;

        if (req.body.id) {
            return this.UserDao.createWithId(user)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.UserDao.create(user)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

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