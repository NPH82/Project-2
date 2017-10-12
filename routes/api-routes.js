var db = require("../models");


var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/api/users", isAuthenticated, function(req, res) {
    console.log(req.user)
    db.User.findOne({
      where: {
        firebaseId: req.user.id
      },
      include: [db.Goal]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", isAuthenticated, function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/Users/:id", isAuthenticated, function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/goals", isAuthenticated, function(req, res) {
    db.User.findOne({
        where: {
          firebaseId: req.user.id
        }
      })
      .then(function(dbUser) {
        return db.Goal.findAll({
          where: {
            UserId: dbUser.id
          },
          include: [db.User]
        })
      })
      .then(function(dbGoal) {
        res.json(dbGoal);
      });
  });

  app.get("/api/goals/:id", isAuthenticated, function(req, res) {
    db.Goal.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });

  app.post("/api/goals", isAuthenticated, function(req, res) {
    db.User.findOne({
        where: {
          firebaseId: req.user.id
        }
      })
      .then(function(dbUser) {
        return db.Goal.create({
          text: req.body.text,
          weight: req.body.weight,
          UserId: dbUser.id
        })
      })
      .then(function(dbGoal) {
        res.json(dbGoal);
      });
  });

  app.delete("/api/goals/:id", isAuthenticated, function(req, res) {
    db.Goal.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });

  app.put("/api/goals", isAuthenticated, function(req, res) {
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