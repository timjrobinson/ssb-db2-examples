
// Check if data dir exists, if true, check if the md5sum matches what it should be
// For now just return true

// Generate data
// node_modules/ssb-fixtures/lib/bin.js --outputDir ./data --messages 100000 --seed ssb-db2-examples && mkdir -p data/db2 && node node_modules/jitdb/copy-json-to-bipf-async.js data/flume/log.offset data/db2/log.bipf

const ssbFixtures = require("ssb-fixtures");
const { mkdir, rmdir } = require("fs/promises")
const { exec } = require("child_process");
const { existsSync } = require("fs");

async function generateData() {
  if (existsSync("./data")) {
    // console.log("./data already exists, skipping data generation");
    return;
  }
  

  const options = {
    outputDir: "./data",
    messages: 1000,
    seed: "ssb-db2-examples"
  };
  
  await ssbFixtures(options);
  
  await mkdir("./data/db2");
  
  exec("node node_modules/jitdb/copy-json-to-bipf-async.js data/flume/log.offset data/db2/log.bipf", (err, stdout, stderr) => {
    if (err) {
        console.log(`Error: ${err.message}`);
        return;
    }
    if (stderr) {
        console.log(`Error: ${stderr}`);
        return;
    }
  
    console.log(stdout);
  });
}

generateData();