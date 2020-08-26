"use strict";

/**
 * Folder controller
 *
 */

// Dependencies
const folderService = require("../services/folder.service");

// Controller wrapper
const controller = {};

controller.create = async (req, res) => {
  let r = req.body;

  if (!r.title) return res.status(403).send({ msg: "Required fields missing" });

  r.userId = req.decoded.userId;

  let result = await folderService.create(r);

  if (!result.err) {
    res.send({
      data: result.data,
      msg: "Folder created successfully",
    });
  } else {
    res.send({
      data: null,
      msg: result.msg,
    });
  }
};

controller.getByUser = async (req, res) => {
  let r = req.params;

  let result = await folderService.getByUser(r);

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
