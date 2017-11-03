module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("review", {
    hotelId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  });

  // Review.associate = function(models) {
  //   Review.belongsTo(models.Hotel, {
  //     foreignKey : {
  //       allowNull : false
  //     }
  //   });
  // };

  return Review;
};
