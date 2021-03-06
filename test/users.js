const test = require('tape')
const path = require("path")
const SecretStack = require('secret-stack')
const caps = require('ssb-caps')
const ssbKeys = require('ssb-keys')

const importFresh = require("import-fresh")
const generateData = importFresh("./generate-data");
const config = require("../config.json");

const dataPath =  path.join(__dirname, "..", "data");

let sbot; 

test('setup', (t) => {
  generateData(dataPath, (err) => {
    t.error(err);

    const keys = ssbKeys.loadOrCreateSync(path.join(dataPath, "secret"));
    sbot = SecretStack({ caps })
      .use(require('ssb-db2'))
      .call(null, { keys, path: dataPath }) 
    
    t.end()
  });
});

test('getUserPosts', (t) => {
  const getUserPosts = require("../examples/users/get-user-posts")(sbot);
  getUserPosts(config.ssb_ids.user, (err, msgs) => {
    t.error(err)
    t.equal(msgs.length, 3)
    t.end()
  });
});

test('teardown', (t) => {
  setTimeout(() => {
    sbot.close(() => t.end())
  }, 500);
});