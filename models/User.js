const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(35),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  });
};
