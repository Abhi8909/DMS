"use struct";

let mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameSlug: {
    type: String,
    required: true,
  },
  folderId: {
    type: String,
  },
  userId: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  type: {
    type: String,
    default: "file",
  },
  lastUpdatedAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("files", Schema);
