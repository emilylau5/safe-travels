module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    hotelId : DataTypes.INTEGER,
    userId : DataTypes.INTEGER,
    comment : DataTypes.STRING
  });

  return Review;
}