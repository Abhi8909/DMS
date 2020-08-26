"use strict";

/**
 * Folders Service
 *
 */

// Dependencies
// const config = require("../config");
const utils = require("../utils");
const mongoose = require("mongoose");

const File = require("../models/file.model");
const Folder = require("../models/folder.model");

//Container for Service
const service = {};

/**
 *
 * @param {Object} req
 * @returns {Object :{ err : Boolean, data :Object }}
 */
service.create = async (req) => {
  let session = await mongoose.startSession();
  session.startTransaction();
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

      if (req.folderId) {
        await Folder.update(
          {
            _id: req.folderId,
          },
          {
            $inc: {
              numOfFiles: 1,
            },
          }
        );
      }

      if (newFile) {
        await session.commitTransaction();
        session.endSession();
        return {
          err: false,
          data: newFile,
        };
      } else {
        await session.abortTransaction();
        session.endSession();
        return {
          err: true,
          msg: "Could create folder. Please try again",
        };
      }
    } else {
      await session.abortTransaction();
      session.endSession();
      return {
        err: true,
        msg: "File already exists with this name " + req.name,
      };
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return utils.logError(err);
  }
};

/**
 *
 * @param {Object} req
 * @returns {Object :{ err : Boolean, data :Object }}
 */
service.move = async (req) => {
  let session = await mongoose.startSession();
  session.startTransaction();
  try {
    let query = { _id: req.fileId };

    if (req.srcFolderId) {
      query.folderId = req.srcFolderId;
    }

    let file = await File.findOne(query);

    if (file && file.name) {

      let _file = await File.findOne({
        nameSlug: file.nameSlug,
        folderId: req.destFolderId,
      });

      if (!_file) {
        let result = await File.update({
          _id: file._id
        }, {
          $set: {
            folderId: req.destFolderId,
          },
        });

        // decrement the count of the source folder if exists
        if (req.srcFolderId) {
          await Folder.update(
            {
              _id: req.srcFolderId,
            },
            {
              $inc: {
                numOfFiles: -1,
              },
            }
          );
        }

        // increment the count of the destination folder
        await Folder.update(
          {
            _id: req.destFolderId,
          },
          {
            $inc: {
              numOfFiles: 1,
            },
          }
        );

        if (result) {
          await session.commitTransaction();
          session.endSession();
          return {
            err: false,
            data: result,
          };
        } else {
          await session.abortTransaction();
          session.endSession();
          return {
            err: true,
            msg: "Could not move file. Try Again.",
          };
        }
      } else {
        await session.abortTransaction();
        session.endSession();
        return {
          err: true,
          msg: "Could not move file. A file with the same name already exists",
        };
      }
    } else {
      await session.abortTransaction();
      session.endSession();
      return {
        err: true,
        msg: "File do not exists",
      };
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
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
      userId: req.userId
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
