const path = require("path")
const test = require('tape')
const SecretStack = require('secret-stack')
const caps = require('ssb-caps')
const ssbKeys = require('ssb-keys')

const importFresh = require("import-fresh")
const generateData = importFresh("./generate-data");
const config = require("../config.json");

const dataPath =  path.join(__dirname, "..", "data", "posts");

let sbot; 

test('setup', (t) => {
  generateData(dataPath, (err) => {
    t.error(err);

    const keys = ssbKeys.loadOrCreateSync(path.join(dataPath, "secret"));
    sbot = SecretStack({ caps })
      .use(require('ssb-db2'))
      .call(null, { keys, path: dataPath })

    t.end();
  });
});
  
test('getPostLikes', (t) => {
  const getPostLikes = require("../examples/posts/get-likes")(sbot);
  getPostLikes(config.ssb_ids.post, (err, likes) => {
    t.error(err);
    t.equal(likes.length, 39);
    t.end();
  });
});

test('teardown', (t) => {
  setTimeout(() => {
    sbot.close(() => t.end());
  }, 500);
});