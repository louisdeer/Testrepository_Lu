//add a function to loadfunctionlist
role_loadfunctionlist.push(function (_role) {
	if (_role === "Hitman") {
		return function (_roleObj) {
			_roleObj.role = "Citizen";
			return true;
		};	
	} else {
		return function (whatever) {
			return false;//this is a function does nothing 
		}
	}
});