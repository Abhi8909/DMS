"use strict";

// Dependencies
// const config = require("../config");

// Conatiner for auth
let auth = async (req, res, next) => {
  try {
    /**
     * Auth code goes here
     */
    next();
  } catch (err) {
    res.status(400).send({
      error: new Error("Invalid request!"),
    });
  }
};

// Export the module
module.exports = auth;
