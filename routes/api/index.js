// will serve as a means to sollect all of the API routes and package them up for us
const router = require('express').Router();

const userRoutes = require("./user-routes");

router.use('/users', userRoutes)

module.exports = router;