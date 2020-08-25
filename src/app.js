const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const mongoose = require("mongoose");
const router = require("./routes/index");
const config = require("../src/config");

app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

/* MONGO DB CONNECTIVITY */
mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Mongodb is connected");
    },
    (err) => {
      console.log("Cannot connect to the mongodb" + err);
    }
  );

app.listen(config.port, function () {
  console.log("Server Started on port " + config.port + " at " + new Date());
});

// handle unseen and unhandled errors
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtExceptionMonitor", (err, origin) => {
    // Event called before crashing or shutting the process
    console.log(err);
    console.log(origin);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
