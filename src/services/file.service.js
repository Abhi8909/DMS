"use strict";

/**
 * Folders Service
 *
 */

// Dependencies
// const config = require("../config");
const utils = require("../utils");

const File = require("../models/file.model");

//Container for Service
const service = {};

/**
 *
 * @param {Object} req
 * @returns {Object :{ err : Boolean, data :Object }}
 */
service.create = async (req) => {
  try {
    let nameSlug = req.name.replace(/ /g, "").toLowerCase();
    let query = { nameSlug: nameSlug };
    if (req.folderId) {
      query.folderId = req.folderId;
    }

    let file = await File.findOne(query);

    if (!file) {
      req.nameSlug = nameSlug;
      let newFile = await new File(req).save();
      if (newFile) {
        return {
          err: false,
          data: newFile,
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
        msg: "File already exists with this name " + req.name,
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
service.move = async (req) => {
  try {
    let query = { _id: req.fileId };

    if (req.srcFolderId) {
      query.folderId = req.srcFolderId;
    }

    let file = await File.findOne(query);

    if (file && file.name) {
      let query = { nameSlug: file.nameSlug, folderId: req.destFolderId };

      let _file = await File.findOne({
        nameSlug: file.nameSlug,
        folderId: req.destFolderId,
      });

      if (!_file) {
        let result = await File.update(query, {
          $set: {
            folderId: req.destFolderId,
          },
        });

        if (result) {
          return {
            err: false,
            data: result,
          };
        } else {
          return {
            err: true,
            msg: "Could not move file. Try Again.",
          };
        }
      } else {
        return {
          err: true,
          msg: "Could not move file. A file with the same name already exists",
        };
      }
    } else {
      return {
        err: true,
        msg: "File do not exists",
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

    let files = await File.find(query)
      .limit(req.limit || 20)
      .skip(req.skip || 0)
      .sort({ name: -1 });

    if (files.length > 0) {
      return {
        err: false,
        data: files,
      };
    } else {
      return {
        err: true,
        msg: "No files available",
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
service.getByFolder = async (req) => {
  try {
    let query = {
      folderId: req.folderId,
    };

    let files = await File.find(query)
      .limit(req.limit || 20)
      .skip(req.skip || 0)
      .sort({ createdAt: -1 });

    if (files.length > 0) {
      return {
        err: false,
        data: files,
      };
    } else {
      return {
        err: true,
        msg: "No files available",
      };
    }
  } catch (err) {
    return utils.logError(err);
  }
};

//Export the service
module.exports = service;
