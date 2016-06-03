var Twitter = require("twitter")
const env = process.env


// twitter variables for tokens and keys
var consumer_key = env["TWITTER_CONSUMER_KEY"]
var consumer_secret = env["TWITTER_CONSUMER_SECRET"]
var access_token_key = env["TWITTER_ACCESS_TOKEN_KEY"]
var access_token_secret = env["TWITTER_ACCESS_TOKEN_SECRET"]


// instantiating a twitterClient
var client = new Twitter({
	consumer_key: consumer_key,
	consumer_secret: consumer_secret,
	access_token_key: access_token_key,
	access_token_secret: access_token_secret
})



// exporting the twitterClient in twitter.js module
module.exports = client