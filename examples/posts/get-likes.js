/** 
 * This example shows how to get all "likes" for a specific post
**/

const {and, type, votesFor, toPromise} = require('ssb-db2/operators')

module.exports = function(sbot) {
  function getLikes(postId) {
    return sbot.db.query(
      and(
        type("vote"), 
        votesFor(postId)
      ),
      toPromise()
    )
  }

  return getLikes
}




