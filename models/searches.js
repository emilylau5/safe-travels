module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    userId : DataTypes.INTEGER,
    city : DataTypes.STRING,
    startDate : DataTypes.DATEONLY,
    endDate : DataTypes.DATEONLY,
    queryString : DataTypes.STRING
  });
  //associate search with hotels
  Search.associate = function(models) {
    Search.hasMany(models.Hotel, {
      onDelete : "cascade"
    });
  };

  return Search;
}