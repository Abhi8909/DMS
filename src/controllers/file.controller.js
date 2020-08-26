"use strict";

/**
 * File controller
 *
 */

// Dependencies
const fileService = require("../services/file.service");

// Controller wrapper
const controller = {};

controller.create = async (req, res) => {
  let r = req.body;

  if (!r.name || !r.content)
    return res.status(403).send({ msg: "Required fields missing" });

  r.userId = req.decoded.userId;

  let result = await fileService.create(r);

  if (!result.err) {
    res.send({
      data: result.data,
      msg: "File created success",
    });
  } else {
    res.send({
      data: null,
      msg: result.msg,
    });
  }
};

controller.move = async (req, res) => {
  let r = req.body;

  if (!r.fileId || !r.destFolderId)
    return res.status(403).send({ msg: "Required fields missing" });

  if (r.srcFolderId === r.destFolderId)
    return res
      .status(200)
      .send({ msg: "Source and destination can't be the same" });

  let result = await fileService.move(r);

  if (!result.err) {
    res.send({
      data: result.data,
      msg: "Success: File moved",
    });
  } else {
    res.send({
      data: [],
      msg: result.msg,
    });
  }
};

controller.getByFolder = async (req, res) => {
  let r = req.params;
  r.userId = req.decoded.userId;
  let result = await fileService.getByFolder(r);

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

controller.getByUser = async (req, res) => {
  let r = req.params;

  let result = await fileService.getByUser(r);

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
