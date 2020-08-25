"use struct";

let mongoose = require("mongoose");
let { v4: uuidv4 } = require("uuid");

let Schema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    default: "Admin",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
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

module.exports = mongoose.model("users", Schema);
