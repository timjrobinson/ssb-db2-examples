/**
 * These examples show how to get various information about a users posts. 
**/

const {and, type, author, toPromise} = require('ssb-db2/operators')

module.exports = function(sbot) {
  function getUserPosts(userId) {
    return sbot.db.query(
      and(type('post')),
      and(author(userId)),
      toPromise()
    );
  }

  return getUserPosts
}
