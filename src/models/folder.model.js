"use struct";

let mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  titleSlug: {
    type: String,
    required: true,
  },
  numOfFiles: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
  },
  type: {
    type: String,
    default: "folder",
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  lastUpdatedAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("folders", Schema);
