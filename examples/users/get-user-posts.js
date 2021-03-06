/**
 * These examples show how to get various information about a users posts. 
**/

const {and, type, author, toCallback} = require('ssb-db2/operators')

module.exports = function(sbot) {
  function getUserPosts(userId, callback) {
    sbot.db.query(
      and(type('post')),
      and(author(userId)),
      toCallback((err, msgs) => {
        callback(err, msgs.slice());
      })
    );
  }

  return getUserPosts
}
