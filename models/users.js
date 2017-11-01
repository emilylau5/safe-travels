module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName : DataTypes.STRING,
    password : DataTypes.STRING,
    email : DataTypes.STRING
  });

  User.associate = function(models) {
    //Associating User with Searches
    User.hasMany(models.Search, {
      onDelete : "cascade"
    });
  };

  return User;
};

