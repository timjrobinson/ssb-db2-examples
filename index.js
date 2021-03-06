/**
 * This file runs all examples sequentially using your local SSB database. 
 * It will first redeem an invite to the SSB PeerNet us-west server which should 
 * give you all the data you need to retrieve the posts/blobs from the SSB network. 
 */

const examples = require("examples/all");
const config = require("./config.json");

const blobInfo = await examples.blobs.getBlob(config.blob_id);
