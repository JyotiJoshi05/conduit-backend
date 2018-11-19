class Comment {
    constructor(id, body,articleId,userId) {
        this.id = id;
        this.body = body;
        this.userId = userId;
        this.articleId = articleId;
    }
}

module.exports = Comment;