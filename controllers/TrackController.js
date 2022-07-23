const {
  getToken,
  getTrackByISRC,
  getTrackBySong,
  getMeta,
} = require("../helper/spotify");
const DbUtil = require("../helper/db");
const Sequelize = require("sequelize");
const url = require("url");

module.exports = (sequelize) => {
  const TrackModel = require("../models/Track")(sequelize);
  const ArtistModel = require("../models/Artist")(sequelize);
  const dbUtil = new DbUtil(Sequelize, sequelize, TrackModel, ArtistModel);

  const CreateTrack = async (req, res) => {
    let output;
    let status = 201;
    const { ISRC, idx } = req.body;
    const result = await getTrackByISRC(ISRC);
    const isViable = () =>
      result.tracks &&
      result.tracks.items &&
      parseInt(idx, 10) < result.tracks.items.length;
    if (isViable()) {
      const { artistNames, spotify_image_uri, title } = getMeta(
        result,
        parseInt(idx, 10)
      );
      const id = await dbUtil.insertTrack({ spotify_image_uri, title, ISRC });
      if (id) {
        await dbUtil.insertArtistArray(parseInt(id, 10), artistNames);
        output = {
          status: "succeed",
          data: await dbUtil.getTrackByPrimaryKey(id),
        };
        status = 201;
      } else {
        output = { status: "succeed", mesg: "Duplicate ISRC insert ignored" };
        status = 202;
      }
    } else {
      output = {
        status: "fail",
        mesg: `No track found with ISRC ${req.body.ISRC}, or track ISRC ${req.body.ISRC} items length is out of range for index ${req.body.idx}`,
      };
      status = 404;
    }
    return res.status(status).json(output);
  };

  return {
    CreateTrack,
  };
};
