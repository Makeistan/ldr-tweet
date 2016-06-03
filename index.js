require("./keys")

// twitterClient instantiate
var twitterClient = require("./twitter") // twitterClient is the client through which we do twitter operations

// instantiate the arduino board
var arduino = require("./arduino")(twitterClient) // arduino boards control

