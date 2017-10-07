var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// using Handlebars 
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Future Implementations for running routes (maybe a better spot for these?)
//var routes = require("./controllers/controller.js");
//app.use(routes);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({force: true}).then(function() {
  console.log("Database synced")
  app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT);
  });
});