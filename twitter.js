var Twitter = require("twitter")
const env = process.env

var consumer_key = env["TWITTER_CONSUMER_KEY"]
var consumer_secret = env["TWITTER_CONSUMER_SECRET"]
var access_token_key = env["TWITTER_ACCESS_TOKEN_KEY"]
var access_token_secret = env["TWITTER_ACCESS_TOKEN_SECRET"]

var client = new Twitter({
	consumer_key: consumer_key,
	consumer_secret: consumer_secret,
	access_token_key: access_token_key,
	access_token_secret: access_token_secret
})



module.exports = client