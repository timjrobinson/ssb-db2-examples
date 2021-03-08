const path = require("path")
const test = require('tape')
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

    t.end();
  });
});
  
test('getLikes', (t) => {
  const getLikes = require("../examples/posts/get-likes")(sbot);
  getLikes(config.ssb_ids.post).then((likes) => {
    t.equal(likes.length, 39);
    t.end();
  });
});

test('getPost', (t) => {
  const getPost = require("../examples/posts/get-post")(sbot);
  getPost(config.ssb_ids.post).then((posts) => {
    t.equal(posts[0].value.author, '@loVkx1dA/FDC7OQJBRcczjK/Pn9JnGzZb6m6lbjeCuc=.ed25519')
    t.equal(posts[0].value.content.text, 'OLDESTMSG dolore magna');
    t.end();
  });
});

test('teardown', (t) => {
  setTimeout(() => {
    sbot.close(() => t.end());
  }, 500);
});