const ArticleDao = require('../dao/ArticleDao');
const controllerCommon = require('./common/controllerCommon');
const Article = require('../model/Article');
class ArticleController {

    constructor() {
        this.ArticleDao = new ArticleDao();
        this.common = new controllerCommon();
    }
    findById(req, res) {
        let id = req.params.id;
        this.ArticleDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
    findAll(res) {
        this.ArticleDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
    
    countAll(res) {
        this.ArticleDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };
    update(req, res) {
        let article = new Article();
        article.body = req.body.body;
        article.description = req.body.description;
        article.title = req.body.title;
        article.slug = req.params.slug;
        article.tagList = req.body.tagList;
        return this.ArticleDao.update(article)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };
    create(req, res) {
        let article = new Article();
        if (req.body.id) {
            article.id = req.body.id;
        }
        article.body = req.body.body;
        article.description = req.body.description;
        article.tagList = req.body.tagList;
        article.userId = req.body.userId;
        article.favouritesCount = 0;
        article.slug = req.body.title;
        article.title = req.body.title;
        
            return this.ArticleDao.create(article)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        
    };

    deleteById(req, res) {
        let slug = req.params.slug;
        this.ArticleDao.deleteById(slug)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };
}
module.exports = ArticleController;