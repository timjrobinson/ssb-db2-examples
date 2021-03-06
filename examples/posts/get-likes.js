/** 
 * This example shows how to get all "likes" for a specific post
**/

const {and, type, votesFor, toCallback} = require('ssb-db2/operators')

module.exports = function(sbot) {
  function getLikes(postId, callback) {
    sbot.db.query(
      and(
        type("vote"), 
        votesFor(postId)
      ),
      toCallback((err, msgs) => {
        callback(err, msgs);
      })
    )
  }

  return getLikes
}




