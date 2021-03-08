# SSB DB2 Examples

These examples show how to do common SSB queries using [SSB DB2](https://github.com/ssb-ngi-pointer/ssb-db2). Useful when creating your own Scuttlebutt application.


## Usage

### Generate Data

`npm run generate-data` - Generate test data to play around with. The data is created in the `./data` folder. 

Alternatively you can copy your `~/.ssb` folder into `./data` to run queries on it.

### Run Examples

`node run-example.js <path> [params] [--json]` - Run a specific example with specified parameters. If no parameters are specified the defaults from `config.json` will be used.

#### Example Commands

Get all posts for the user specified in config.json
```sh
node run-example.js users/get-user-posts
```

Get all 'like' messages (called votes internally) for this message
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

### Blobs

#### get-blob

How to retrieve a blob via ID

#### get-random-blob

How to retrieve a random blob

### Posts

#### get-likes

How to get total likes for a post and a list of User ID's that liked a post.

#### get-post

How to get information about a post.

### Users

In this repository a User is synonymous with a feed. Users are identified by a userId in most queries which is a feed Id and ends with .ed2556 (check this is correct).

#### get-user-posts

Get all posts that a user has made. These are all messages with a type of `post`.
