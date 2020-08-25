"use strict";

/**
 * Handles all users related routes
 *
 */

// Dependencies
const router = require("express").Router();
const controller = require("../controllers/user.controller");
const middleware = require("../middlewares");

// Routes
router.get("/login", middleware, controller.login);
router.post("/signup", middleware, controller.signup);

//Export the module
module.exports = router;
