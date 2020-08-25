"use strict";

/**
 * Users Service
 *
 */

// Dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config");
const utils = require("../utils");

const User = require("../models/user.model");

//Container for Service
const service = {};

/**
 *
 * @param {Object} req
 * @returns {Object :{ err : Boolean, data :Object }}
 */
service.signup = async (req) => {
  try {
    let user = await User.findOne({
      email: req.email,
    });

    if (!user) {
      req.password = bcrypt.hashSync(req.password, 10);
      let user = await new User(req).save();
      if (user) {
        let token = jwt.sign({ userId: user.id }, config.secret);
        return {
          err: false,
          data: {
            token,
            user,
          },
        };
      } else {
        return {
          err: true,
          msg: "Could sign up. Please try again",
        };
      }
    } else {
      return {
        err: true,
        msg: "User already signed up. Please login",
      };
    }
  } catch (err) {
    return utils.logError(err);
  }
};

/**
 *
 * @param {Object} req
 * @returns {Object :{ err : Boolean, data :Object }}
 */
service.login = async (req) => {
  try {
    let user = await User.findOne({
      email: req.email,
    });

    if (user) {
      if (bcrypt.compareSync(req.password, user.password)) {
        let token = jwt.sign({ userId: user.id }, config.secret);
        return {
          err: false,
          data: {
            token,
            user,
          },
        };
      } else {
        return {
          err: true,
          msg: "Email or password is incorrect",
        };
      }
    } else {
      return {
        err: true,
        msg: "User is not registered",
      };
    }
  } catch (err) {
    return utils.logError(err);
  }
};

//Export the service
module.exports = service;
