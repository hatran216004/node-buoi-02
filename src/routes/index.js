const express = require('express');

const commentsRoutes = require('./comments.route');
const postsRoutes = require('./posts.route');

const router = express.Router();

router.use('/comments', commentsRoutes);
router.use('/posts', postsRoutes);

module.exports = router;
