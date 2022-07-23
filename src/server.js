// required node_modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// required internel modules
const sequelize = require("../database/connection");

const app = express();

// express middlewares
app.use(express.json());
app.use(cors());

// application routes
app.use("/track", require("../routes/track")(sequelize));
app.use("/artist", require('../routes/artist')(sequelize));

process.on('unhandledRejection', (reason, p) => {
  console.log('ERROR: unhandled Promise Rejection:', reason, '\nStack trace:\n', p);
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  const result = err;

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (!err.status) {
    result.mesg = `Server error processing service ${req.url}, error = ${err.message}`;
  }
  res.send(result);
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`Server is running on port :: ${process.env.PORT || 3001}`)
);
