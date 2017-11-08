module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    queryString: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  //associate search with hotels
  // Search.associate = function(models) {
  //   Search.hasMany(models.Hotel, {
  //     onDelete : "cascade"
  //   });
  // };  

  Search.associate = function(models) {
    Search.belongsTo(models.User, {
      foreignKey : {
        allowNull : false
      }
    });  
  };

  return Search;
};





