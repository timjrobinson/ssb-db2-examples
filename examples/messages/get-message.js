/** 
 * This example shows how to get a single message by ID
 */

const {key, toPromise} = require('ssb-db2/operators')

module.exports = function(sbot) {
  function getMessage(msgId) {
    return sbot.db.query(
      key(msgId),
      toPromise()
    )
  }

  return getMessage
}

 
 
 
 