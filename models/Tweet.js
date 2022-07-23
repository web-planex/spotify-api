const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Tweet", {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: Sequelize.STRING(300),
    userId: {
      type: Sequelize.INTEGER(11),
      references: { model: "users", key: "id" },
    },
  });
};
