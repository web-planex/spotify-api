const Sequelize = require("sequelize");

const sequelize = new Sequelize("spotify", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
