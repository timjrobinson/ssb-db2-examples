/** Run a specific example from the command line **/

const path = require('path');
const { argv } = require('process');
const SecretStack = require('secret-stack')
const caps = require('ssb-caps')
const ssbKeys = require('ssb-keys')

const dataPath =  path.join(__dirname, "..", "data");

if (argv.length < 3) {
  console.log("Usage: npm run example <path> [params].")
  console.log("Examples:")
  console.log("\tnpm run example users/get-user-posts");
  console.log("\tnpm run example post/get-likes %l2brqjfqS/52POoCZVHL7GzCq1VWyMJGW5VyJH1QsoM=.sha256");
  return;
}

const exampleFile = argv[2];
const exampleParams = argv.slice(3);

const keys = ssbKeys.loadOrCreateSync(path.join(dataPath, "secret"));
const sbot = SecretStack({ caps })
  .use(require('ssb-db2'))
  .call(null, { keys, path: dataPath })

const exampleFunction = require("./" + exampleFile)(sbot);
exampleFunction.apply(null, exampleParams).then((data) => {
  console.log(data);
  sbot.close();
})