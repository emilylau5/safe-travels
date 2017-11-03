module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    comment: DataTypes.STRING
  });

  Review.associate = function(models) {
    Review.belongsTo(models.Hotel, {
      foreignKey : {
        allowNull : false
      }
    });
  };

  return Review;
};

