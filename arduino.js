/*
 * arduino.js
 * Arduino code which uses johnny-five and reads the value off of photoresistors 
 * to send tweets using the twitter client we provide to it.
 */

var five = require("johnny-five")
var photoresistor;

module.exports = function (twitterClient) {
	var board = new five.Board()
	
	var min = 200
	var max = 1000
	
	var gapStatus = 0
	board.on("ready", function () {
		

		// instantiating a new photoresistor on A3 Pin
		photoresistor = new five.Sensor({
			pin: "A3",
			freq: 1000
		})
		

		var redLed = new five.Led(12) // red led on digital pin 12
		var greenLed = new five.Led(13) // green led on digital 13

		photoresistor.on("data", function () {		
			var status;
			var numVal = parseInt(this.raw)


			// checks the photoresistor's value
			if (numVal < 200) {
				status = "It's too dark here!"  // sets it's to dark status if it's too low
				console.log("Dark!")
			}
			else if (numVal > 1000) {
				status = "It's too lit here!" // sets it to lit status if it's too high
				console.log("Lit")
			}


			if (status && gapStatus <= 0) {

				// posting the tweet to twitter
				twitterClient.post("statuses/update", {
					status: status + Math.random().toString().substr(1, 10)  // Random String is added with the tweet to avoid status duplication
				}, function (error, tweet, response) {
					if (!error) {
						// if tweet sent successfully
						console.log("Tweet Sent")
						greenLed.blink(500) /// greenLed blinks
						board.wait(1000, function () {
							greenLed.stop()
							greenLed.off()
						})
					}
					else if (error) {
						console.error(error)
						redLed.blink(500) // redLed blinks on error
						board.wait(1000, function () {
							redLed.stop()
						})
					}
				})
				gapStatus = 10 * 1000 // interval of 10 seconds before reading the led
			}
			gapStatus -= 1 * 1000
		})
	})

	return board
}
