"use strict";

/**
 * user controller
 *
 */

// Dependencies
const userService = require("../services/user.service");

// Controller wrapper
const controller = {};

controller.login = async (req, res) => {
  let r = req.query;

  if (!r.email || !r.password)
    return res.status(403).send({ msg: "Required fields missing" });

  let result = await userService.login(r);

  if (!result.err) {
    res.send({
      data: result.data,
      msg: "Login success",
    });
  } else {
    res.send({
      data: null,
      msg: result.msg,
    });
  }
};

controller.signup = async (req, res) => {
  let r = req.body;

  if (!r.email || !r.password || !r.firstName)
    return res.status(403).send({ msg: "Required fields missing" });

  let result = await userService.signup(r);

  if (!result.err) {
    res.send({
      data: result.data,
      msg: "Sign up success",
    });
  } else {
    res.send({
      data: null,
      msg: result.msg,
    });
  }
};

//Export the controller
module.exports = controller;
