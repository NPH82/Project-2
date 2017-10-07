var db = require("../models");

module.exports = function(app) {

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Goal]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/Users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/goals", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Goal.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });

  app.get("api/goals/:id", function(req, res) {
    db.Goal.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });

  app.post("/api/goals", function(req, res) {
    db.Goal.create(req.body).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });

  app.delete("/api/goals/:id", function(req, res) {
    db.Goal.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });

  app.put("/api/goals", function(req, res) {
    db.Goal.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });
};