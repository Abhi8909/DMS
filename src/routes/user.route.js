"use strict";

/**
 * Handles all users related routes
 *
 */

// Dependencies
const router = require("express").Router();
const controller = require("../controllers/user.controller");

// Routes
router.get("/login", controller.login);
router.post("/signup", controller.signup);

//Export the module
module.exports = router;
