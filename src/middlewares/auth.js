"use strict";

// Dependencies
const config = require("../config");
const jwt = require("jsonwebtoken");

// Conatiner for auth
let auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Please provide your token",
      });
    } else {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Authentication failed",
          });
        } else {
          console.log(decoded);
          req.decoded = decoded;
          next();
        }
      });
    }
    // next();
  } catch (err) {
    res.status(400).send({
      error: new Error("Invalid request!"),
    });
  }
};

// Export the module
module.exports = auth;
