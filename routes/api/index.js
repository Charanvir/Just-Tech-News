// will serve as a means to sollect all of the API routes and package them up for us
const router = require('express').Router();

const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comments-routes")

// setting api routes for user routes
router.use('/users', userRoutes);
// setting api route for post routes
router.use('/posts', postRoutes);
//setting api route for comment route
router.use('/comments', commentRoutes);

module.exports = router;