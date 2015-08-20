State.add("falseStart", function() {


	var enter = function(data) {
		var now = new Date();

		setState(STATE_FALSE_START);
		console.log("False start!!!");

		var cheaterId = (data.x < window.innerWidth/2)? 0: 1;

		var jumpTime = 3000-(now.getTime()-data.startTime.getTime());
		statusText.innerHTML = players[cheaterId].name + " jumped the gun by "+jumpTime+"ms!! [-1]<br><small>Click the circle again to restart</small>";
		players[cheaterId].points--;
		playerAreas[cheaterId].querySelector(".points").textContent = players[cheaterId].points;
		show(startCircle);
	}

	var exit = function() {

	};


	return {
		enter: enter,
		exit: exit
	};
}());