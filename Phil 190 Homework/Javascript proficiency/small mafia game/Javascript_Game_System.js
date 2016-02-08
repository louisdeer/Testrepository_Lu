//system object constructor
function gameSystem (_noofroles) {
	
	//procedure info
	this.end_index = _noofroles - 1;
	this.phase = 0;
	this.copy_rolelist = [];
	this.deadchars = []; // list of roles dead last phrase
	//setup
	//create the NPClist without roles(fun loop)
	this.setup_rawbots = function () { 
		for (var i = 0; i < _noofroles; i++) {
			listofNPCs.push(new mysteryobjectsample());
			listofNPCs[i].random_namelocation(i);
		}
	};

	this.setup_roles = function () {
		var i = 0, j = 0, success = false;
		//outter loop to load all NPCs for roles in role list
		while (i < listofNPCs.length) {
			//inner loop to load one role function  into role_loadfunctionlist
			while ( !success && j < role_loadfunctionlist.length) {
				success = role_loadfunctionlist[j](role_list[i])(listofNPCs[i]);
				j++;
			}
			success = false;
			j = 0;
			i++;
		}
	};

	this.copy_origin = function () {
		for (var i = 0; i < listofNPCs.length; i++) {
			//create a obj for the [i]
			this.copy_rolelist.push(new mysteryobjectsample());
			//clone from completed NPCs list
			this.copy_rolelist[i].clone(listofNPCs[i]);
		}
	};

	this.update = function () {	
		//splice dead bots from list
		for (var i = 0; i < listofNPCs.length; i++) {
			if (!listofNPCs[i].alive) {
				this.deadchars.push(new mysteryobjectsample());
				this.deadchars[this.deadchars.length - 1].clone(listofNPCs[i]);
		 		listofNPCs.splice(i, 1);
			}
		}
		//NPC winner flags update
		for (var i = 0; i < listofNPCs.length; i++) {
			listofNPCs[i].winner_flagupdate();
		}
	}

	

	//check victory conditions fun
	this.victory = function () {
		var victory = true;
		for (var i = 0; victory && i < listofNPCs.length; i++) {
			victory = victory && listofNPCs[i].winnerflag;
		}
		return victory;
	};
	//dawn description
	this.dawn_describe = function (){
		//report death
		/*switch
		-something happens
		-nothing happens  
		*/
		//test
		document.write("<li>Did everyone live to see the sun raise?</li><br>");
	};
	//day description
	this.day_describe = function (){
		//random stuff
		//test
		document.write("<p>Its another day. Paranoid people gather together to discuss their fate.</p><br>");
	};

	//dusk description
	this.dusk_describe = function (){
		//report execution
		//hint population
		//test
		document.write("<p>The arguements are over.</p>");
	};

	//bots chat fun + <call loop>
	//chat message
	this.display_chat =	function () {
		//NPCs
	};


	//bots act fun + <call loop>
	//day action
	this.act_day = function () {
		 //placeholder  
	};


	//player choice <prompt>
	this.player_choose = function () {
		//prompt for bots name
		var chosen = "", i;
		var valid = false;
		while (!valid) {
			chosen = prompt("Who has the illfate?", listofNPCs[0].nametag);
			if (chosen === "") {
				valid = true; // players choose no one.
			}
			i = 0;
			while (!valid && i < listofNPCs.length) {
				valid = (listofNPCs[i].nametag === chosen);
				if (valid) {
					break;
				}
				i++;
			}
		}
		return i;
	};


	//execution
	this.execute = function(_index){
		listofNPCs[_index].alive = false;
		listofNPCs[_index].deathdes.push(" was killed by upset villiagers.");
	};

	//--night no description
	//night target
	this.target_night = function () {
		// order of actions
		// test
		for (var i = 0; i < listofNPCs.length; i++) {
			listofNPCs[i].acquire_target();
		}  
	};
	//night act
	this.act_night = function () {
		// order of actions 
		//test
		for (var i = 0; i < listofNPCs.length; i++) {
			listofNPCs[i].action_nact();
		}   
	};
	//night wrap up
	this.wrap_night = function () {
		 // order of actions  
	};


	//ENDGAME
	this.conclude = function () {
		document.write("<li>After so much struggle, the remain people are:</li><br>");
		this.display_alignment(listofNPCs);
		document.write("<li>Its all over.</li><br>");
		//report victoy
		//displace original rolelist 
		document.write("<p>Now Reveal the truths:</p><br>");
		this.display_rolelist(this.copy_rolelist);
	};

	//displays Mysteryobjects
	this.reveal_deadroles = function () {
		for (var i = 0; i < this.deadchars.length; i++) {
			for (var j = 0; j < this.deadchars[i].deathdes.length; j++) {
				document.write("<li>" + this.deadchars[i].nametag + this.deadchars[i].deathdes[j] + ".</li><br>");
			}
			document.write("<li>" + this.deadchars[i].nametag + " was a " + this.deadchars[i].role + ".</li><br>");
		}
		this.deadchars = [];
	};


	this.display_rolelist = function (_list) {
		for (var i = 0; i < _list.length; i++) {
			document.write("<li>" + _list[i].nametag + " was a " + _list[i].role + ".</li>");
		}
	};

	this.display_alignment = function (_list) {
		for (var i = 0; i < _list.length; i++) {
			document.write("<li>" + _list[i].nametag + " is a " + _list[i].role + " of the " + _list[i].alignment + ".</li>");
		}
	};

	this.display_aliveNPCs = function () {	
		var i, j, k;
		//display according to Location number in namelist
		//i means how many are displayed
		//j is all possible locationumber
		//k is index of the listofNPC
		for (j = 0, i = 0;  i < listofNPCs.length && j < namelist.length; j++) {
			for (k = 0; k < listofNPCs.length; k++) {
				if (listofNPCs[k].location_number === j) {
					document.write("<li>" + listofNPCs[k].nametag + " is still alive.</li>");
					i++;
				}
			}
		}
	};


	//rolefunctions
}