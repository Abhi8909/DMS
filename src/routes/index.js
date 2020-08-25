"use strict";

function initRoutes() {
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
