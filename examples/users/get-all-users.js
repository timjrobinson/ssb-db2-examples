/**
 * This example lists all known UserID's
 **/

const path = require("path")
const SecretStack = require('secret-stack')
const caps = require('ssb-caps')
const ssbKeys = require('ssb-keys')
const {and, type, author, toCallback} = require('ssb-db2/operators')

const dataPath = path.join(__dirname, "..", "..", "./data");
const keys = ssbKeys.loadOrCreateSync(path.join(dataPath, "secret"));

const sbot = SecretStack({ caps })
  .use(require('ssb-db2'))
  .call(null, { keys, path: dataPath })

sbot.db.query(
  and(type('post')),
  toCallback((err, msgs) => {
    console.log('There are ' + msgs.length + ' messages of type "post"')
    console.log('Here are the first 10:')
    msgs.slice(0, 10).forEach(printPostContent)
    sbot.close()
  })
)

function printPostContent(msg) {
  const time = msg.value.timestamp
  console.log(msg)
}