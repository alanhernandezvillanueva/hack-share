const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const { engine } = require('express-handlebars');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// make public folder accessible
app.use(express.static(path.join(__dirname, "public")));
//Handlebars
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
 app.set("view engine", "handlebars");

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
