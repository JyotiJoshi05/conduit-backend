const Comment = require('../model/comment');
const daoCommon = require('./shared/daoCommon');

class CommentDao {
    constructor() {
        this.common = new daoCommon();
    }
    findAll(id) {
        let sqlRequest = "SELECT * FROM Comment WHERE articleId=$id";
        let sqlParams = {$id: id};
        return this.common.findAllComments(sqlRequest, sqlParams).then(rows => {
            let comments = [];
            for (const row of rows) {
                comments.push(new Comment(row.id, row.body, row.articleId, row.userId));
            }
            return comments;
        });
    };
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM Comment";
        return this.common.findOne(sqlRequest);
    };
    create(comment) {
        let sqlRequest = "INSERT into Comment (body,userId,articleId) " +
            "VALUES ($body,$userId,$articleId)";
        let sqlParams = {
            $body: comment.body,
            $userId: comment.userId,
            $articleId: comment.articleId
        };
        return this.common.run(sqlRequest, sqlParams);
    };
    deleteById(id) {
        let sqlRequest = "DELETE FROM comment WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}
module.exports = CommentDao;