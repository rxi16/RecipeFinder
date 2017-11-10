module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
      timestamps: false
  });
  return User;
};
