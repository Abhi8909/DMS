"use strict";
let express = require("express");
let router = express.Router();

let user = require("./user.route");
let folder = require("./folder.route");
let file = require("./file.route");

function initRoutes() {
  router.use("/user", user);
  router.use("/folder", folder);
  router.use("/file", file);

  /**
   * Health check up service
   *
   */
  router.get("/ping", (req, res) => {
    res.send({ msg: "Service Runnning..." });
  });
}

// init the all routes for the service
initRoutes();

// Export the module
module.exports = router;
