//
// Simple Canvas program adapted from this demo:
// http://phaser.io/examples/v2/games/tanks
//

//
// Main Variables
// 
var land;
var cursors;
var cursorDown;
var textArea;

//
// Arrays of bots
//
//var bots = [jeff, sharAI, troi, yang, faust, maria, dylan, Daniel, duyen, rey];
var bots = [jeff, sharAI, yang];
var sprites = [];
var currentBotIndex = 0;

//
// Main game object. Size of visible region.
//
var game = new Phaser.Game(500, 500, Phaser.AUTO, 'canvasContainer', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

//
// Pre-load  assets
//
function preload() {
    game.load.image('background', 'assets/grass.jpg');
    for (var i = 0; i < bots.length; i++) {
        game.load.image(bots[i].name, bots[i].imagePath);
    };
}

//
// Set up the simulation
//
function create() {

    // Set world size
    game.world.setBounds(0, 0, 1000, 1000);

    // Set up the land
    land = game.add.tileSprite(0, 0, 1000, 1000, 'background');

    // Set up sprites
    for (var i = 0; i < bots.length; i++) {
        var newSprite = game.add.sprite(bots[i].x, bots[i].y, bots[i].name);
        newSprite.anchor.setTo(0.5, 0.5); // Sets the center of rotation, I think in the coordinates of the sprite
        bots[i].sprite = newSprite;
        bots[i].body = newSprite.body;
        game.physics.enable(newSprite, Phaser.Physics.ARCADE);
        sprites.push(newSprite);
        newSprite.body.collideWorldBounds = true;
        bots[i].init();
    }

    // Make camera follow the agent
    game.camera.follow(sprites[currentBotIndex]);

    // Set up keyboard input
    cursors = game.input.keyboard.createCursorKeys();

    // Text area to log agent states
    textArea = document.getElementById("textArea");

}

//
// Main update function
//
function update() {

    // Arrow keys
    if (cursors.left.isDown) {
        cursorDown = true;
        sprites[currentBotIndex].body.rotation -= 4;
    } else if (cursors.right.isDown) {
        cursorDown = true;
        sprites[currentBotIndex].body.rotation += 4;
    }
    if (cursors.up.isDown) {
        cursorDown = true;
        sprites[currentBotIndex].body.speed = 300;
    } else if (cursors.down.isDown) {
        cursorDown = true;
        sprites[currentBotIndex].body.speed = 0;
    }

    // Update bots
    for (var i = 0; i < bots.length; i++) {
        // When cursor is down, perform "cursor override" update
        //   for current bot
        if (cursorDown && i == currentBotIndex) {
            bots[i].basicUpdate();
            cursorDown = false;
        } else {               
            bots[i].update();
        }
    }

    // Update the text area
    document.textArea.logText.value = bots[currentBotIndex].getStatus();
    // Todo. text history

}

//
// Select the current bot to focus on.  Called by html.
// TODO: This function is unresponsive.   Sometimes have to use dropdown
//  twice.
//
function botSelect() {
    var e = document.getElementById("botSelect");
    newIndex = e.selectedIndex;
    game.camera.follow(sprites[newIndex]);
    currentBotIndex = newIndex;
}

//
// Can be used to render text to the canvas
//
function render() {

    // game.debug.text('Bots: ' + bots.length, 32, 32);

}
