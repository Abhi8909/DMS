"use strict";

/**
 * Home Service
 *
 */

// Dependencies
const utils = require("../utils");

const Folder = require("../models/folder.model");
const File = require("../models/file.model");

//Container for Service
const service = {};

/**
 *
 * @param {Object} req
 * @returns {Object :{ err : Boolean, data :Object }}
 */
service.get = async (req) => {
  try {
    let result = [];

    let query = {
      userId: req.userId,
    };

    let folders = await Folder.find(query)
      .limit(req.limit || 20)
      .skip(req.skip || 0)
      .sort({ title: -1 });

    if (folders.length > 0) {
      result = result.concat(folders);
    }

    query.folderId = {
      $exists: false,
    };

    let files = await File.find(query)
      .limit(req.limit || 20)
      .skip(req.skip || 0)
      .sort({ title: -1 });

    if (files.length > 0) {
      result = result.concat(files);
    }

    return {
      err: false,
      data: result,
    };
  } catch (err) {
    return utils.logError(err);
  }
};

//Export the service
module.exports = service;
