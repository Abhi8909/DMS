"use strict";

/**
 * Handles all files related routes
 *
 */

// Dependencies
const router = require("express").Router();
const controller = require("../controllers/home.controller");
const middleware = require("../middlewares");

// Routes
router.get("/", middleware, controller.get);

//Export the module
module.exports = router;
