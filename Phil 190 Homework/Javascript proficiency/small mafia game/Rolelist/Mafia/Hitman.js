//add a function to loadfunctionlist
role_loadfunctionlist.push(
	function (_role) {
		if (_role === "Hitman") {
			return function (_roleObj) { // _roleObj is an obj, its reference is passed into the function
				_roleObj.role ="Hitman";
				_roleObj.resources = -1;
				_roleObj.alignment ="Mafia";
				//override target, action, and wrap functions
				
				//bots functions place holder
				_roleObj.acquire_target = function(){
					_roleObj.night_target = [false]; //empty the box
					_roleObj.night_target[0] = true; //set to motion
					var target_index, goodtarget = false;
					while (!goodtarget){ //watchout -1 problem
						target_index = Math.round(Math.random() * 100 % (listofNPCs.length - 1));
						goodtarget = (listofNPCs[target_index].alignment != "Mafia");
					}
					_roleObj.night_target.push(target_index);//append 1 target to the array
				};

				_roleObj.action_nact = function(){
					//only act if motion is true
					if (_roleObj.night_target[0] && !listofNPCs[_roleObj.night_target[1]].immunity_kill){
						var victim = _roleObj.night_target[1];//for readability
						listofNPCs[victim].alive = false;
						listofNPCs[victim].deathdes.push (" was shot at close range");
					}
				};

				_roleObj.action_nwrapup = function(){
					 // body...  
				};

				_roleObj.winner_flagupdate = function(){
					//check if everyone is mafia or neutral benign
					var alignment_victory = true;
					for (var i = 0; alignment_victory && i < listofNPCs.length; i++) {
						alignment_victory = alignment_victory &&
						(listofNPCs[i].alignment === "Mafia" ||
							listofNPCs[i].alignment === "Neutral_Benign");
					}
					_roleObj.winnerflag = alignment_victory;
				};
				return true;// roleloading function success
			};	
		} else {
			return function (whatever) {
				return false;//this is a function does nothing 
			}
		}
	}
);