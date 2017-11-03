module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    userName : DataTypes.STRING,
    password : DataTypes.STRING,
    email : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
  });

  // User.associate = function(models) {
  //   //Associating User with Searches
  //   User.hasMany(models.Search, {
  //     onDelete : "cascade"
  //   });
  // };

  // User.associate = function(models) {
  //   //Associating User with Hotels
  //   User.hasMany(models.Hotel, {
  //     onDelete : "cascade"
  //   });
  // };

  return User;
};

