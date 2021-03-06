/**
 * These examples show how to get various information about a users posts. 
 **/

const path = require("path")

const SecretStack = require('secret-stack')
const caps = require('ssb-caps')
const ssbKeys = require('ssb-keys')
const {and, type, author, toCallback} = require('ssb-db2/operators')


const rootPath = path.join(__dirname, "..", "..");
const dataPath =  path.join(rootPath, "./data");
const keys = ssbKeys.loadOrCreateSync(path.join(dataPath, "secret"));

const sbot = SecretStack({ caps })
  .use(require('ssb-db2'))
  // .use(require('ssb-db2/compat/ebt'))
  // .use(require('ssb-db2/full-mentions'))
  .call(null, { keys, path: dataPath })

module.exports = getUserPosts

async function getUserPosts(userId, callback) {
  sbot.db.query(
    and(type('post')),
    and(author(userId)),
    toCallback((err, msgs) => {
      callback(err, msgs.slice());
      sbot.close();
    })
  )
}