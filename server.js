const express = require('express');
const routes = require("./controllers");
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware function that can take all of the contents of a folder and server them as static assets
// useful for frontend sepcific files like iamges, stylesheets and JS files
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes

app.use(routes);

// turn on connection to db and server
// sync means that it is sequelize taking the models and connecting them to associated database tables
// by making force: true, we are forcing the sync method to re-create the tables if there are any association changes
// it is similar to DROP TABLE IF EXISTS
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening!'))
})