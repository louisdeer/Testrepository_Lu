//add a function to loadfunctionlist
role_loadfunctionlist.push(function (_role) {
	if (_role === "Jester") {
		return function (_roleObj) {
			_roleObj.role = "Jester";
			return true;
		};	
	} else {
		return function (whatever) {
			return false;//this is a function does nothing 
		}
	}
});