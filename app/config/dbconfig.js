
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./conduitapp.db');

let init = function () {
    db.run(`CREATE TABLE if not exists user(
        id integer primary key AUTOINCREMENT,
        email text not null ,
        username text not null,
        bio text null,
        image text null,
        password text not null,
        favorites integer DEFAULT 0 null,
        following integer DEFAULT 0 null
        )`);
    db.run(`CREATE TABLE if not exists article(
        id integer primary key AUTOINCREMENT,
        title text not null,
        slug text not null,
        description text not null,
        body text not null,
        favouritesCount integer DEFAULT 0,
        tagList text not null,
        userId integer,
        FOREIGN KEY (userId) REFERENCES user(id) 
       ON DELETE CASCADE ON UPDATE NO ACTION
        )`);
    db.run(`CREATE TABLE if not exists comment(
        id integer primary key AUTOINCREMENT,
        body text,
        userId integer not null,
        articleId integer not null,
        FOREIGN KEY (userId) REFERENCES user(Id) 
        ON DELETE CASCADE ON UPDATE NO ACTION,
        FOREIGN KEY (articleId) REFERENCES article(Id) 
        ON DELETE CASCADE ON UPDATE NO ACTION
        )`);
};

module.exports = {
    init: init,
    db: db
};

