const path = require("path");
const pm2 = require("pm2");
const log4js = require("@nelreina/node-log4js");

const logger = log4js("app");
const opts = require("../../pm2rc.json");

const start = opt =>
  new Promise((resolve, reject) => {
    pm2.start(opt, (err, apps) => {
      if (err) return reject(err);
      resolve({ name: opt.name });
    });
  });

const kill = code => {
  pm2.killDaemon(err => {
    process.exit(0);
  });
};
(async () => {
  const prom = [];
  pm2.connect(async err => {
    if (err) {
      logger.error(err);
      process.exit(0);
    }
    opts.forEach(opt => {
      prom.push(start(opt));
    });
    const apps = await Promise.all(prom);
    logger.trace(JSON.stringify(apps, null, 2));
    process.on("exit", kill);
    process.on("SIGINT", kill);
    process.on("SIGUSR1", kill);
    process.on("SIGUSR2", kill);
    // pm2.disconnect();
  });
})();
