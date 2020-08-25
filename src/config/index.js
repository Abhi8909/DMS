// all config here

// Config container
let config = {};

if (process.env.NODE_ENV === "PROD") config = require("./prod");
else config = require("./dev");

// Export the module
module.exports = config;
