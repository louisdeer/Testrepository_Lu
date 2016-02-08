//add a function to loadfunctionlist
role_loadfunctionlist.push(function (_role) {
	if (_role === "Citizen") {
		return function (_roleObj) {
			_roleObj.role = "Citizen";
			_roleObj.alignment ="Town";
			_roleObj.winner_flagupdate = function(){
				//check if everyone is Town or neutral benign
				var alignment_victory = true;
				for (var i = 0; alignment_victory && i < listofNPCs.length; i++) {
					alignment_victory = alignment_victory &&
					(listofNPCs[i].alignment === "Town" ||
						listofNPCs[i].alignment === "Neutral_Benign");
				}
				_roleObj.winnerflag = alignment_victory;
			};
			return true; // roleloading function success
		};	
	} else {
		return function (whatever) {
			return false;//this is a function does nothing 
		}
	}
});