module.exports = function(sequelize, DataTypes) {
  var Goal = sequelize.define("Goal", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Personal"
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    },
  });
  Goal.associate = function (db) {
    Goal.belongsTo(db.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Goal;
};
