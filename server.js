const express = require('express');
const routes = require("./routes");
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes

app.use(routes);

// turn on connection to db and server
// sync means that it is sequelize taking the models and connecting them to associated database tables
// by making force: true, we are forcing the sync method to re-create the tables if there are any association changes
// it is similar to DROP TABLE IF EXISTS
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening!'))
})