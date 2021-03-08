/** 
 * This example shows how to get a single message by ID
 */

const {key, toPromise} = require('ssb-db2/operators')
const config = require("../../config.json");

module.exports = function(sbot) {
  function getMessage(msgId) {
  msgId = msgId || config.ssb_ids.post;
    return sbot.db.query(
      key(msgId),
      toPromise()
    )
  }

  return getMessage
}

 
 
 
 