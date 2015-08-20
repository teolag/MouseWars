State.add("countdown", function() {
	var countdownInterval;
	var time, startTime;

	var enter = function() {
		console.log("Welcome to Countdown");
		setState(STATE_COUNTDOWN);
		startCircle.addEventListener("mouseout", falseStart, false);
		replayContext.clearRect(0, 0, replayCanvas.width, replayCanvas.height);

		startTime = new Date();

		time = 3;
		statusText.textContent = time;
		countdownInterval = setInterval(tick, 1000);
	}

	var exit = function() {
		console.log("Goodbye and welcome back to Countdown");
		clearInterval(countdownInterval);
		startCircle.removeEventListener("mouseout", falseStart, false);

	};

	var tick = function() {
		time--;
		statusText.textContent = time;
		if(time<=0) {
			setState(STATE_GAME);
			clearInterval(countdownInterval);
			statusText.textContent = "GO!!";

			gameStartTime = new Date();

			mouseRecorder.length=0;
			clickRecorder.length=0;
			addEventListener("mousemove", recordMouse, false);
			addEventListener("mousedown", recordClickMouse, false);

			playerAreas[0].addEventListener("mousedown", playerClick, false);
			playerAreas[1].addEventListener("mousedown", playerClick, false);
			startCircle.removeEventListener("mouseout", falseStart, false);
			hide(startCircle);
		}
	};

	var falseStart = function(e) {
		State.switchTo("falseStart", {x: e.pageX, startTime:startTime});
	};

	return {
		enter: enter,
		exit: exit
	};
}());