module.exports = function(sequelize, DataTypes) {
  var Hotel = sequelize.define("Hotel", {
    searchId : DataTypes.INTEGER,
    name : DataTypes.STRING
  });

  Hotel.associate = function(models) {
    //associating hotels with reviews
    Hotel.hasMany(models.Review, {
      onDelete : "cascade"
    });
  }
  return Hotel;
};
