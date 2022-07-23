const Router = require("express").Router();
const { CheckISRC } = require("../middlewares/TrackMiddleware");

module.exports = (sequelize) => {
  const { CreateTrack } = require("../controllers/TrackController")(sequelize);

  Router.post("/add", CheckISRC, CreateTrack);

  return Router;
};
