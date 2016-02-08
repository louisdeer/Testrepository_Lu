var debug = "1";
//setup
var new_Game = new gameSystem(noofroles);
console.log("A new Game starts with phase : " + new_Game.phase);
console.log("Number of Roles : " + noofroles);

new_Game.setup_rawbots();

//placeholder for random generator
//generate the list (loop)

new_Game.setup_roles();
new_Game.copy_origin(); // save a copy for end game display
//debug 
//-------Gamestart---------
//game loop
var n_day = 1;
var everyone_alive_are_winner = false; //game ends condition
while(!everyone_alive_are_winner){
	everyone_alive_are_winner = new_Game.victory();
	document.write("<p>-------Day " + n_day + " Starts-------</p>");
	//dawn phrase
	new_Game.phase = 0;
	//dawn description fun
	new_Game.dawn_describe();
	//dawn update NPClist
	new_Game.update();
	new_Game.reveal_deadroles();
	new_Game.display_aliveNPCs();
	document.write("<br>");
	//check victory conditions fun
	everyone_alive_are_winner = new_Game.victory();
	if (everyone_alive_are_winner) {
		break;
	}

	//day phase
	new_Game.phase = 1;
	//--day description fun
	new_Game.day_describe();
	//bots chat fun + <call loop>
	new_Game.display_chat();

	//dusk phase
	new_Game.phase = 2;
	//player choice <prompt>
	window.scrollTo(0,document.body.scrollHeight);
	new_Game.execute(new_Game.player_choose());
	//dusk description fun
	new_Game.dusk_describe();
	//dusk update NPClist
	new_Game.update();
	new_Game.reveal_deadroles();
	window.scrollTo(0,document.body.scrollHeight);
	//check victory conditions fun
	everyone_alive_are_winner = new_Game.victory();
	if (everyone_alive_are_winner) {
		break;
	}
	alert("The fate has revealed.");
	
	//night phase
	new_Game.phase = 3;
	//--night no description
	//place holder 1.bots Trust calculation <call loop>
	//2.bots Target fun + <call loop>
	new_Game.target_night();
	//3.bots act fun + <call loop>
	new_Game.act_night();
	//4.bots Wrapup fun + <call loop>
	new_Game.wrap_night();
	//scoll down the page
	/*debug
	
	//listofNPCs[0].acquire_target();
	//listofNPCs[0].action_nact();
	//prompt for loopbreak
	debug = prompt("Break the loop? Enter 1", "1");
	if (debug === "1") {
		break;
	}
	*/
	n_day++;
}

new_Game.conclude();
window.scrollTo(0,document.body.scrollHeight);
