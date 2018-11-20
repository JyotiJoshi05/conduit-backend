const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const database = require('./app/config/dbconfig');
database.init();
const port = process.argv[2] || 1234;
app.listen(port, function () {
     console.log("Server listening on port : " + port);
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const REST_API_ROOT = '/api';
app.use(REST_API_ROOT, require('./app/routes/router'));
