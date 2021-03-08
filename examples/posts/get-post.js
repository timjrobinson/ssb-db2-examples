/** 
 * This example shows how to get a post by ID
 */

const {and, type, key, toPromise} = require('ssb-db2/operators')
const config = require("../../config.json");

module.exports = function(sbot) {
  function getPost(postId) {
    postId = postId || config.ssb_ids.post;
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




