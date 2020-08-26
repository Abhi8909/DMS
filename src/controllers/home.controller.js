"use strict";

/**
 * Folder controller
 *
 */

// Dependencies
const homeService = require("../services/home.service");

// Controller wrapper
const controller = {};

controller.get = async (req, res) => {
  let query = req.query;
  query.userId = req.decoded.userId;

  let result = await homeService.get(query);

  if (!result.err) {
    res.send({
      data: result.data,
      msg: "Success",
    });
  } else {
    res.send({
      data: [],
      msg: result.msg,
    });
  }
};

//Export the controller
module.exports = controller;
