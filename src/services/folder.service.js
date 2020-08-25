"use strict";

/**
 * Folders Service
 *
 */

// Dependencies
const config = require("../config");
const utils = require("../utils");

const Folder = require("../models/folder.model");

//Container for Service
const service = {};

/**
 *
 * @param {Object} req
 * @returns {Object :{ err : Boolean, data :Object }}
 */
service.create = async (req) => {
  try {
    let folder = await Folder.findOne({
      title: `/^${req.title}$/i`,
    });

    if (!folder) {
      let newFolder = await new Folder(req).save();
      if (newFolder) {
        return {
          err: false,
          data: newFolder,
        };
      } else {
        return {
          err: true,
          msg: "Could create folder. Please try again",
        };
      }
    } else {
      return {
        err: true,
        msg: "Folder already exists with this name " + req.title,
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
service.getByUser = async (req) => {
  try {
    let query = {
      userId: req.userId,
    };

    let folders = await Folder.find(query)
      .limit(req.limit || 20)
      .skip(req.skip || 0)
      .sort({ createdAt: -1 });

    if (folders.length > 0) {
      return {
        err: false,
        data: folders,
      };
    } else {
      return {
        err: true,
        msg: "No folders available",
      };
    }
  } catch (err) {
    return utils.logError(err);
  }
};

//Export the service
module.exports = service;
