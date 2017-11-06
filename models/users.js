module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName :  DataTypes.STRING,
    lastName :  DataTypes.STRING,
    email : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    userName : DataTypes.STRING,
    password : DataTypes.STRING
  });

  User.associate = function(models) {
    //Associating User with Searches
    User.hasMany(models.Search, {
      onDelete : "cascade"
    });
  };

  User.associate = function(models) {
    //Associating User with Hotels
    User.hasMany(models.Hotel, {
      onDelete : "cascade"
    });
  };

  return User;
};

