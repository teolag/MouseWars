var STATE_INIT="init",
	STATE_COUNTDOWN="countdown",
	STATE_GAME="game",
	STATE_FALSE_START="false start",
	STATE_WINNER="winner";


var state = STATE_INIT;

var players = [];
players.push({name:"Peter", points:0});
players.push({name:"Teodor", points:0});


var gameStartTime;
var mouseRecorder = [];
var clickRecorder = [];

var replayCanvas = document.getElementById("replayCanvas");
var replayContext = replayCanvas.getContext("2d");
resizeCanvas();

var statusText = document.getElementById("statusText");
var startCircle = document.getElementById("startCircle");
startCircle.addEventListener("click", function() {
	State.switchTo("countdown");
}, false);

addEventListener("resize", function() {
	console.log("win resize");
	resizeCanvas();
});
addEventListener("keyup", function(e) {
	if(state===STATE_GAME && e.keyCode===27) {
		console.log("Abort game");
		setState(STATE_INIT);
		playerAreas[0].removeEventListener("mousedown", playerClick, false);
		playerAreas[1].removeEventListener("mousedown", playerClick, false);
		removeEventListener("mousemove", recordMouse, false);
		removeEventListener("mousedown", recordClickMouse, false);
		show(startCircle);
		statusText.innerHTML = "Game aborted<br><small>Click the circle again to restart</small>";
	}
});

var playerAreas = [];
for(var playerId=0; playerId<players.length; playerId++) {
	var playerArea = document.querySelector(".click-area.player"+(playerId+1));
	playerAreas.push(playerArea);
	playerAreas[playerId].querySelector(".name").textContent = players[playerId].name;
	playerAreas[playerId].querySelector(".points").textContent = players[playerId].points;
}



function playerClick(e) {
	var player = e.target.dataset.player;
	var playerId = player-1;

	console.log("Player " + player + " clicked");

	var wonTime = (new Date()).getTime() - gameStartTime.getTime();
	statusText.innerHTML = players[playerId].name + " won after " + wonTime + "ms!! [+1]<br><small>Click the circle again to restart</small>";

	playerAreas[0].removeEventListener("mousedown", playerClick, false);
	playerAreas[1].removeEventListener("mousedown", playerClick, false);


	players[playerId].points++;
	playerAreas[playerId].querySelector(".points").textContent = players[playerId].points;

	setState(STATE_WINNER);
	show(startCircle);

	var c = replayContext;
	removeEventListener("mousemove", recordMouse, false);
	removeEventListener("mousedown", recordClickMouse, false);
	recordClickMouse(e);

	//Draw samples
	c.fillStyle = "rgba(0,0,0,0.1)";
	for(var i=0; i<mouseRecorder.length; i++) {
		c.beginPath();
		c.arc(mouseRecorder[i].x, mouseRecorder[i].y, 5, 0, Math.PI*2);
		c.fill();
	}

	//Draw mouse trail
	c.strokeStyle = "rgba(0,0,0,0.3)";
	c.beginPath();
	c.moveTo(mouseRecorder[0].x, mouseRecorder[0].y);
	for(var i=1; i<mouseRecorder.length; i++) {
		c.lineTo(mouseRecorder[i].x, mouseRecorder[i].y);
	}
	c.stroke();

	//Draw clicks
	c.fillStyle = "rgba(255,0,0,1)";
	for(var i=0; i<clickRecorder.length; i++) {
		c.beginPath();
		c.arc(clickRecorder[i].x, clickRecorder[i].y, 5, 0, Math.PI*2);
		c.fill();
	}


}


function recordMouse(e) {
	var now = new Date();
	var record = {
		t: now.getTime() - gameStartTime.getTime(),
		x: e.pageX,
		y: e.pageY
	}
	mouseRecorder.push(record);
}
function recordClickMouse(e) {
	var now = new Date();
	var record = {
		t: now.getTime() - gameStartTime.getTime(),
		x: e.pageX,
		y: e.pageY
	}
	clickRecorder.push(record);
	e.preventDefault();
}


function resizeCanvas() {
	replayCanvas.width = window.innerWidth;
	replayCanvas.height = window.innerHeight;
}



function setState(newState) {
	if(newState!=state) {
		state = newState;
		console.log("State changed to:", state, "DELETE THIS!!");
	}
}

function hide(elem) {
	elem.setAttribute("hidden", "");
}

function show(elem) {
	elem.removeAttribute("hidden");
}




