
class Article {
    constructor(id, title, slug, description,body,favouritesCount,tagList,userId) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.body = body;
        this.favouritesCount= favouritesCount;
        this.tagList=tagList;
        this.userId=userId;
    }
}

module.exports = Article;