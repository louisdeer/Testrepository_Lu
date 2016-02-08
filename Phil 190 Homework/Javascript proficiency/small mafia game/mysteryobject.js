//13 names 0 - 12
var namelist = 
["Rigbyz", "Modegem", "Lupinod", 
 "Potgas", "Krystay", "Soberan",
 "Anchma", "Ubantus", "Javagal",
 "Zigsaw", "Lollyop", "Rapystr",
 "Giraph"];
//create an identical name list for later use
var namelist_splice = [];


//default constructor, all fields are non object, except text
function mysteryobjectsample () {
	//all interactive states
	//system info
	this.immunity_kill = 0;
	this.winnerflag = false;
	
	//states accessable to system
	this.nametag = "HelloWorld";
	this.alive = true;
	this.location_number = 0; //number
	this.role = "Stump";
	this.alignment = "Neutral";
	this.deathdes = [];
	this.previousnightvisitor = [];

	//states of selfknowledge
	this.roleclaim = ""; 
	this.resources = 0; // -1 means infinite
	//this.lastactionclaim = [0, 1, 2];//last night action
	//this.personality = "";
	
	//choices basis
	//this.guessedrolelist = []; // multidemensions	

	//choices
	this.night_target = [false];//action, target1, target2, etc..
	this.night_message = [];//report roleblock, etc
	this.night_feedback = [];//report night activity or obstacle
	this.chat = "";//
}

mysteryobjectsample.prototype.clone = function(_mysteryobj){
	this.immunity_kill = _mysteryobj.immunity_kill;
	this.winnerflag = _mysteryobj.winnerflag;
	
	//states accessable to system
	this.nametag = _mysteryobj.nametag;
	this.alive = _mysteryobj.alive;
	this.location_number = _mysteryobj.location_number; //number
	this.role = _mysteryobj.role;
	this.alignment = _mysteryobj.alignment;
	this.deathdes = _mysteryobj.deathdes;

	//states of selfknowledge
	this.roleclaim = _mysteryobj.roleclaim;
	this.resources = _mysteryobj.resources;
	//this.lastactionclaim = [0, 1, 2];//last night action
	//this.personality = "";
	
	//choices basis
	//this.guessedrolelist = []; // multidemensions	

	//special
	//choices
	this.night_target = [false];//action, target1, target2, etc..
	this.night_message = [];//report roleblock, etc
	this.night_feedback = [];//report night activity or obstacle
	this.chat = "";// 
};//it can reset obj to default by clone a default target

//prototype load functions
mysteryobjectsample.prototype.random_namelocation = function(new_game) {	
	//if it is a new game, reset namelist_splice
	if (new_game === 0) {
		this.reset_namesplice();
	}
	//preloaded name and locations no repeat
	var indexofname = Math.round(Math.random() * 10 % (namelist_splice.length -1));
	this.nametag = namelist_splice[indexofname];
	namelist_splice.splice(indexofname, 1);

	indexofname = 0; //recycle for location loop
	while (this.nametag != namelist[indexofname]) {
		indexofname ++;
	}
	this.location_number = indexofname;
};

//bots functions place holder
mysteryobjectsample.prototype.acquire_target = function(){
	 // body...
};
mysteryobjectsample.prototype.action_nact = function(){
	 // body...  
};
mysteryobjectsample.prototype.action_nwrapup = function(){
	 // body...  
};


//guess role list
mysteryobjectsample.prototype.deductions = function(){
	 //generate guessedrolelist 
};


//utility
mysteryobjectsample.prototype.reset_namesplice = function(){
	 namelist_splice = [];
	 for (var i = 0; i < namelist.length; i++) {
	 	namelist_splice.push(namelist[i]);
	 }
};

mysteryobjectsample.prototype.winner_flagupdate = function(argument){
	 // body...  
};