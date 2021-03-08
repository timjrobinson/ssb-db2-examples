/** 
 * This example shows how to get all "likes" for a specific post
**/

const {and, type, votesFor, toPromise} = require('ssb-db2/operators')
const config = require("../../config.json");

module.exports = function(sbot) {
  function getLikes(postId) {
    postId = postId || config.ssb_ids.post;
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




