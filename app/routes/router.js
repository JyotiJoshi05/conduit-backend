const express = require('express');
const router = express.Router();
router.use('/users', require('./api/userRoutes'));
router.use('/articles', require('./api/articleRoutes'));
router.use('/comment', require('./api/commentRoutes'));
module.exports = router;