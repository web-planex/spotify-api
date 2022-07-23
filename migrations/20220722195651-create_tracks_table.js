"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("tracks", {
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("tracks");
  },
};
