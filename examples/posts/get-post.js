/** 
 * This example shows how to get a post by ID
 */

const {and, type, key, toPromise} = require('ssb-db2/operators')

module.exports = function(sbot) {
  function getPost(postId) {
    return sbot.db.query(
      and(
        type("post"), 
        key(postId)
      ),
      toPromise()
    )
  }

  return getPost
}




