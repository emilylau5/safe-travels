module.exports = function(sequelize, DataTypes) {
  var Hotel = sequelize.define("Hotel", {
    searchId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Hotel.associate = function(models) {
    //associating hotels with reviews
    Hotel.hasMany(models.Review, {
      onDelete: "cascade"
    });
  }
  return Hotel;
};
