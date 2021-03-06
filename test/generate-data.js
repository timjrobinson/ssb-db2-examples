
// Check if data dir exists, if true, check if the md5sum matches what it should be
// For now just return true

// Generate data
// node_modules/ssb-fixtures/lib/bin.js --outputDir ./data --messages 100000 --seed ssb-db2-examples && mkdir -p data/db2 && node node_modules/jitdb/copy-json-to-bipf-async.js data/flume/log.offset data/db2/log.bipf

const importFresh = require("import-fresh")
const ssbFixtures = importFresh("ssb-fixtures");
const { exec } = require("child_process");
const { existsSync, mkdirSync } = require("fs");
const path = require("path");
const debug = require("debug")("generate-data");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateData(dataDir, callback) {
  debug("Calling generate data with data dir: ", dataDir);
  if (existsSync(dataDir)) {
    debug(`${dataDir} already exists, skipping data generation`);
    return callback();
  }
  
  const options = {
    outputDir: dataDir,
    messages: 1000,
    seed: "ssb-db2-examples"
  };
  
  await ssbFixtures(options);

  mkdirSync(path.join(dataDir, "db2"));
  
  const scriptPath = path.join(__dirname, "..", "node_modules/jitdb/copy-json-to-bipf-async.js")
  const logOffsetPath = path.join(dataDir, "flume/log.offset");
  const bipfPath = path.join(dataDir, "db2/log.bipf");
  const command = `node ${scriptPath} ${logOffsetPath} ${bipfPath}`;
  debug("Running command ", command);
  exec(command, (err, stdout, stderr) => {
    if (err) return callback(err);
    if (stderr) return callback(stderr);
  
    return callback();
  });
}

module.exports = generateData