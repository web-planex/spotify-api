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

  // createAssociations({TrackModel, ArtistModel});
  TrackModel.hasMany(ArtistModel, {
    as: 'name',
    foreignKey: 'track_id',
    targetKey: 'id',
    onDelete: 'CASCADE',
  });
  ArtistModel.belongsTo(TrackModel, {
    foreignKey: 'track_id',
    targetKey: 'id',
  });

  const dbUtil = new DbUtil(Sequelize, sequelize, TrackModel, ArtistModel);

  const SeachArtist = async (req, res) => {
    let output;
    // console.log(Object.keys(req).join(', '));
    const queryObj = url.parse(req.url, true).query;
    const isValid = () => queryObj.q;
    let status = 200;
    if (!isValid()) {
      output = { status: 'fail', mesg: 'Required \'q\' query parameter absent' };
      status = 400;
    } else {
      const { q } = queryObj;
      const result = await dbUtil.artistSearch(q);
      status = result.length ? 200 : 404;
      output = { status: result.length ? 'succeed' : 'fail', mesg: result.length ? result : `No artists containing substring '${queryObj.q}' were found.` };
    }

    res.status(status).json(output);
  };

  const SearchSong = async (req, res) => {
    let output;
    const queryObj = url.parse(req.url, true).query;
    const isValid = () => queryObj.q;
    let status = 200;
    if (!isValid()) {
      output = { status: 'fail', mesg: 'Required "q" query parameter absent' };
      status = 400;
    } else {
      const { q } = queryObj;
      const result = await dbUtil.songSearch(q);
      status = result.length ? 200 : 404;
      output = { status: result.length ? 'succeed' : 'fail', mesg: result.length ? result : `No songs with substring '${queryObj.q}' were found.` };
    }

    res.status(status).json(output);
  }

  const SearchISRC = async (req, res) => {
    let output;
    const queryObj = url.parse(req.url, true).query;
    const isValid = () => queryObj.q;
    let status = 200;
    if (!isValid(req)) {
      output = { status: 'fail', mesg: 'Required \'q\' query parameter absent' };
      status = 400;
    } else {
      const { q } = queryObj;
      const result = await dbUtil.getTrackByISRC(q);
      status = result.length ? 200 : 404;
      output = { status: result.length ? 'succeed' : 'fail', mesg: result.length ? result : `No track with ISRC ${queryObj.q} could be found` };
    }
    res.status(status).send(output);
  }

  return {
    SeachArtist,
    SearchSong,
    SearchISRC
  };
};