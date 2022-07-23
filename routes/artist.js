const Router = require("express").Router();

module.exports = (sequelize) => {
  const { SeachArtist, SearchSong, SearchISRC } = require("../controllers/ArtistController")(sequelize);

  Router.get("/search", SeachArtist);
  Router.get("/search/song", SearchSong);
  Router.get("/search/isrc", SearchISRC);

  return Router;
};
