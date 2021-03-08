/** Run a specific example from the command line **/

const path = require('path');
const util = require('util');
const SecretStack = require('secret-stack')
const caps = require('ssb-caps')
const ssbKeys = require('ssb-keys')

const dataPath =  path.join(__dirname, "data");

const argv = require('yargs/yargs')(process.argv.slice(2)).argv

const exampleFile = argv._[0];
const exampleParams = argv._.slice(1);

if (!exampleFile) {
  const scriptCmd = "node run-example.js"
  console.log(`Usage: ${scriptCmd} <path> [params] [--json]`)
  console.log("Examples:")
  console.log(`\t${scriptCmd} users/get-user-posts`);
  console.log(`\t${scriptCmd} posts/get-likes %l2brqjfqS/52POoCZVHL7GzCq1VWyMJGW5VyJH1QsoM=.sha256`);
  console.log(`\t${scriptCmd} messages/get-all-messages --json`);
  return;
}

const keys = ssbKeys.loadOrCreateSync(path.join(dataPath, "secret"));
const sbot = SecretStack({ caps })
  .use(require('ssb-db2'))
  .call(null, { keys, path: dataPath })

const exampleFunction = require(path.join(__dirname, "examples", exampleFile))(sbot);
exampleFunction.apply(null, exampleParams).then((data) => {
  let parsedData;
  if (argv.json) {
    parsedData = JSON.stringify(data);
  } else {
    parsedData = util.inspect(data, false, null);
  }
  console.log(parsedData)
  setTimeout(() => sbot.close(), 100);
})