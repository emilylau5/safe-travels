module.exports = function(sequelize, DataTypes) {
  var Hotel = sequelize.define("Hotel", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    city: {
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
  };

  Hotel.associate = function(models) {
    Hotel.belongsTo(models.User, {
      foreignKey : {
        allowNull : false
      }
    });
  };

  // Hotel.associate = function(models) {
  //   Hotel.belongsTo(models.Search, {
  //     foreignKey : {
  //       allowNull : false
  //     }
  //   });
  // };

  return Hotel;
};
