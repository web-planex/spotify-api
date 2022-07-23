const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Track", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    spotify_image_uri: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ISRC: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
