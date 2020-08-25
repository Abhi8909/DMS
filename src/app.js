const express = require("express");
const app = express();
var { router } = require("./routes/index");
const bodyParser = require("body-parser");
const compression = require("compression");

const port = process.env.PORT || 3000;

app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.listen(port, function () {
  console.log("Server Started on port " + port + " at " + new Date());
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
