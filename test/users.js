const test = require('tape')

const config = require("../config.json");
const getUserPosts = require("../examples/users/get-user-posts");

test('getUserPosts', (t) => {
  getUserPosts(config.ssb_ids.user, (err, msgs) => {
    t.error(err)
    t.equal(msgs.length, 3)
    t.end()
  });
});