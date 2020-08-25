"use strict";
let express = require("express");
let router = express.Router();

let user = require("./user.route");
let folder = require("./folder.route");

function initRoutes() {
  router.use("/user", user);
  router.use("/folder", folder);
  /**
   * Health check up service
   *
   */
  router.get("/health", (req, res) => {
    res.send({ msg: "Service Runnning..." });
  });
}

// init the all routes for the service
initRoutes();

// Export the module
module.exports = router;
