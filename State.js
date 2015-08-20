var State = (function() {
	var states = {};
	var active;

	var add = function(name, state) {
		console.log("Added new state: '" + name + "'");
		state.name = name;
		states[name] = state;
	};

	var switchTo = function(newStateName, data) {
		if(active) {
			console.log("Exit state '" + active.name + "'");
			active.exit();
		}
		active = states[newStateName];
		console.log("Entering state '" + active.name + "'");
		active.enter(data);
	};

	return {
		add: add,
		switchTo: switchTo
	};
}());