"use strict";

/**
 * Handles all folders related routes
 *
 */

// Dependencies
const router = require("express").Router();
const controller = require("../controllers/folder.controller");
const middleware = require("../middlewares");

// Routes
router.get("/:userId", middleware, controller.getByUser);
router.post("/", middleware, controller.create);

//Export the module
module.exports = router;
