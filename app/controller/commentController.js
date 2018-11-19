const CommentDao = require('../dao/CommentDao');
const controllerCommon = require('./common/controllerCommon');
const Comment = require('../model/Comment');
class CommentController {

    constructor() {
        this.CommentDao = new CommentDao();
        this.common = new controllerCommon();
    }
    findAll(req,res) {
        let id = req.params.id;
        this.CommentDao.findAll(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
    countAll(res) {
        this.CommentDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };
    create(req, res) {
        let comment = new Comment();
        comment.body = req.body.body;
        comment.userId = req.body.userId;
        comment.articleId = req.body.articleId;
        return this.CommentDao.create(comment)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
    };
    deleteById(req, res) {
        let id = req.params.id;

        this.CommentDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };
    exists(req, res) {
        let id = req.params.id;

        this.CommentDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}
module.exports = CommentController;