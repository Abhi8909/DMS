"use strict";

/**
 * Handles all files related routes
 *
 */

// Dependencies
const router = require("express").Router();
const controller = require("../controllers/file.controller");
const middleware = require("../middlewares");

// Routes
router.post("/", middleware, controller.create);
router.post("/move", middleware, controller.move);
router.get("/getByUser/:userId", middleware, controller.getByUser);
router.get("/getByFolder/:folderId", middleware, controller.getByFolder);

//Export the module
module.exports = router;
