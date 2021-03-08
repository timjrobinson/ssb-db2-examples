/**
 * These examples show how to get various information about a users posts. 
**/

const {toPromise} = require('ssb-db2/operators');

module.exports = function(sbot) {
  function getAllMessages() {
    return sbot.db.query(
      toPromise()
    );
  }

  return getAllMessages
}
