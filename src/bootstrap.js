module.exports = async (sequelize) => {
  const User = require("../models/User")(sequelize);
  const Tweet = require("../models/Tweet")(sequelize);

  User.hasMany(Tweet, { as: "Tweets", foreignKey: "userId" });
  Tweet.belongsTo(User, { as: "User", foreignKey: "userId" });

  const errorHandler = (err) => {
    console.error("Error : " + err);
  };

  const user = await User.create({
    username: "ravi",
    password: "ravi@123",
  }).catch(errorHandler);

  const tweet = await Tweet.create({
    content: "this is first tweet by ravi.",
    userId: user.id,
  }).catch(errorHandler);

  const users = await User.findAll({
    where: {
      username: "ravi",
    },
    include: [
      {
        model: Tweet,
        as: "Tweets",
      },
    ],
  }).catch(errorHandler);

  console.log("ravi Tweets : " + JSON.stringify(users));
};
