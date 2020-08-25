/**
 * Configurations settings for dev
 */

// Export the module
module.exports = {
  appVersion: "1.0.0",
  env: "PROD",
  port: process.env.PORT || 3000,
  dbPort: 27017,
  url: "mongodb://localhost:27017/dms",
  secret: "THISISPRODASECRET",
};
