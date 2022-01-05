const router = require("express").Router();
//api routes
const userRoutes = require("./user-routes");
const postRoutes = require('./post-routes');
const commentRoutes = require('./comments-routes');

router.use("/users", userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
module.exports = router;
