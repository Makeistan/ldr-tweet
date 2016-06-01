var five = require("johnny-five")
var photoresistor;

module.exports = function (twitterClient) {
	var board = new five.Board()
	
	var min = 200
	var max = 1000
	
	var gapStatus = 0
	board.on("ready", function () {
		photoresistor = new five.Sensor({
			pin: "A3",
			freq: 1000
		})
		
		var redLed = new five.Led(12)
		var greenLed = new five.Led(13)

		photoresistor.on("data", function () {		
			var status;
			var numVal = parseInt(this.raw)

			if (numVal < 200) {
				status = "It's too dark here!"
				console.log("Dark!")
			}
			else if (numVal > 1000) {
				status = "It's too lit here!"
				console.log("Lit")
			}


			if (status && gapStatus <= 0) {
				twitterClient.post("statuses/update", {
					status: status + Math.random().toString().substr(1, 10)
				}, function (error, tweet, response) {
					if (!error) {
						console.log("Tweet Sent")
						greenLed.blink(500)
						board.wait(1000, function () {
							greenLed.stop()
							greenLed.off()
						})
					}
					else if (error) {
						console.error(error)
						redLed.blink(500)
						board.wait(1000, function () {
							redLed.stop()
						})
					}
				})
				gapStatus = 10 * 1000
			}
			gapStatus -= 1 * 1000
		})
	})

	return board
}
