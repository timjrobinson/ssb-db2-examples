# SSB DB2 Examples

These examples show how to do common SSB queries using [SSB DB2](https://github.com/ssb-ngi-pointer/ssb-db2). Useful when creating your own Scuttlebutt application.


## Usage

### Generate Data

`npm run generate-data` - Generate test data to play around with. The data is created in the `./data` folder.

Alternatively you can do copy your existing SSB data with:

```sh
mkdir -p ./data/db2/
node ./node_modules/jitdb/copy-json-to-bipf-async.js ~/.ssb/flume/log.offset ./data/db2/log.bipf
```

and you'll be able to run the examples using it.

### Run Examples

`node run-example.js <path> [params] [--json]` - Run a specific example with specified parameters.

#### Example Commands

If you're looking for ID's to use look in [config.json]

Get all posts for a user
```sh
node run-example.js users/get-user-posts @iJW1b884BcWfBXIrFG2rXDfeCS9o69ePSuDBXYBXVvE=.ed25519
```

Get all 'like' messages for this message
```
node run-example.js posts/get-likes %l2brqjfqS/52POoCZVHL7GzCq1VWyMJGW5VyJH1QsoM=.sha256
```

Get all messages in the database in json format and put them in a json file
```
node run-example.js messages/get-all-messages --json > messages.json
```

Get a single message and get the content with jq
```
node run-example.js messages/get-message %8HLZGm3vlzEJKNkJIGwBOieOko57Fy1h/S34Zgd9Gi8=.sha256 --json | jq '.[0].value.content'
```

### Run All Examples

`npm test` - Runs all examples using the config.json file. To enable writing or configure the examples see the config section.

## Config

`read_only` - *true* - If true will only read from SSB and show data, will not write anything to your feed.
`ssb_ids` - Example ID's to pull in tests. These come from the fixtures that were auto-generated with the seed `ssb-db2-examples`.

## Contributing

Feel free to add your own examples for things not already covered. I'd like this repository to show most queries done by the major SSB clients.

## Examples

Categories and filenames are in alphabetical order. You can find the files in examples/category/name.js. You can run the index.js file to see how to use each of these different queries.

### Messages

#### get-all-messages

Get all messages in your database

#### get-message

Get a single message by ID. 

### Posts

#### get-likes

Get total likes for a post and a list of User ID's that liked a post.

#### get-post

Get a single post by ID. This is the same as get-message but nothing will be returned if the type of the message is not `post`.

### Users

In this repository a User is synonymous with a feed. Users are identified by a userId in most queries which is a feed Id and ends with .ed2556 (check this is correct).

#### get-user-posts

Get all posts that a user has made. These are all messages with a type of `post`.
