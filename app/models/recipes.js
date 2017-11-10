module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("recipe", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    ingredient: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    preparation: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },{
      timestamps: false
  });
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userid',
    });
  };
  return Recipe;
};
