var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");
// var exphbs = require("express-handlebars");

var isAuthenticated = require("./config/middleware/isAuthenticated");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

//trying get here
app.get("/api/users", isAuthenticated, function(req, res) {
  console.log("you are logged in as:", req.user)
  db.User.findOne({
    where: {
      firebaseId: req.user.id
    },
    include: [db.Goal]
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

// using Handlebars 
// var exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");



db.sequelize.sync().then(function() {
  console.log("Database synced")
  app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT);
  });
});