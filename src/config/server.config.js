require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  INSTANCE_URL: process.env.INSTANCE_URL,
  API_KEY: process.env.API_KEY,
};
