const path = require("path");
const pm2 = require("pm2");
const log4js = require("@nelreina/node-log4js");

const logger = log4js("app");
const opt = {
  name: "express-service-1",
  script: path.resolve(__dirname, "../../test-service/server.js")
};

pm2.connect(err => {
  if (err) {
    logger.error(err);
    process.exit(0);
  }

  pm2.list(opt.name, (err, list) => {
    if (err) {
      logger.error(err);
    }
    logger.trace(list);
  });
});
