const article = require('../model/article');
const daoCommon = require('./shared/daoCommon');

class articleDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(id) {
        let sqlRequest = "SELECT id, title, slug, description,body,favouritesCount,tagList,userId FROM article WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new article(row.id, row.title, row.slug, row.description,row.body,row.favouritesCount,row.tagList,row.userId));
    };

    findAll() {
        let sqlRequest = "SELECT * FROM article";
        return this.common.findAll(sqlRequest).then(rows => {
            let articles = [];
            for (const row of rows) {
                articles.push(new article(row.id, row.title, row.slug, row.description,row.body,row.favouritesCount,row.tagList,row.userId));
            }
            return articles;
        });
    };

    findAllByUser(id) {
        let sqlRequest = "SELECT * FROM article WHERE userId=$id";
        return this.common.findAllComments(sqlRequest, sqlParams).then(rows => {
            let comments = [];
            for (const row of rows) {
                comments.push(new Comment(row.id, row.body, row.articleId, row.userId));
            }
            return comments;
        });
    };
    
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM article";
        return this.common.findOne(sqlRequest);
    };

    update(article) {
        let sqlRequest = "UPDATE article SET " +
            "body=$body, " +
            "description=$description, " +
            "tagList=$tagList, " +
            "title=$title " +
            "WHERE slug=$slug";

        let sqlParams = {
            $body: article.body,
            $description: article.description,
            $tagList: article.tagList,
            $title: article.title,
            $slug: article.slug
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    create(article) {
        let sqlRequest = "INSERT into article (body, description, tagList,title,slug,favouritesCount,userId) " +
            "VALUES ($body, $description, $tagList,$title,$slug,$favouritesCount,$userId)";
        let sqlParams = {
            $body: article.body,
            $description: article.description,
            $tagList: article.tagList,
            $title: article.title,
            $slug: article.slug,
            $favouritesCount: 0,
            $userId: article.userId
        };
        return this.common.run(sqlRequest, sqlParams);
    };
    deleteById(slug) {
        let sqlRequest = "DELETE FROM article WHERE slug=$slug";
        let sqlParams = {$slug: slug};
        return this.common.run(sqlRequest, sqlParams);
    };
}
module.exports = articleDao;