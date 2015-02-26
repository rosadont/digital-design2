var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/sprites/background.jpg');
    game.load.image('player','assets/sprites/man.png');
	game.load.audio('music', 'assets/audio/Axwell - Ingrosso - We Come We Rave We Love (Dex Morrison Remix).mp3');
	game.load.image('bullet', 'assets/sprites/bullet.png');
<<<<<<< HEAD
	game.load.image('ball', 'assets/sprites/pencil.png');
=======
>>>>>>> feda84824f4e3e9a96ce4e2590084176300f1cb1
}

var player;
var cursors;
<<<<<<< HEAD
var penicl;
var man;
=======
var bullets;
var bullet;
var criminal;
var bullets;
var bulletTime = 0;
var fireButton;
var firingTimer = 0;
>>>>>>> feda84824f4e3e9a96ce4e2590084176300f1cb1
var stateText;

function create() {

    game.world.setBounds(0, 0, 3400, 1000);
    game.add.tileSprite(0, 0, 3400, 1000, 'background');
<<<<<<< HEAD
=======
 
	
 	//criminals
	//game.add.sprite(0, 0, 'background');
	var group = game.make.group();

    //  Add a bunch of sprites in random positions to the group
    for (var i = 0; i < 40; i++)
    {
        group.create(game.world.randomX, game.world.randomY, 'criminal');
    }
>>>>>>> feda84824f4e3e9a96ce4e2590084176300f1cb1

    //  This is the BitmapData we're going to be drawing to
    var bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();
    //  Draw the group
    bmd.drawGroup(group);
<<<<<<< HEAD
=======
	
>>>>>>> feda84824f4e3e9a96ce4e2590084176300f1cb1
	
	//music
    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;
    music = game.add.audio('music');
    music.play();
    game.input.onDown.add(changeVolume, this);
	
	//bitmapData
	game.physics.startSystem(Phaser.Physics.P2JS);
<<<<<<< HEAD
    player = game.add.sprite(100, 900, 'player');
=======

    player = game.add.sprite(100, 900, 'player');

>>>>>>> feda84824f4e3e9a96ce4e2590084176300f1cb1
    game.physics.p2.enable(player);
    cursors = game.input.keyboard.createCursorKeys();
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
<<<<<<< HEAD
    game.camera.follow(player);
	
=======

    game.camera.follow(player);
	
	//bullets
	bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
	
>>>>>>> feda84824f4e3e9a96ce4e2590084176300f1cb1
	//  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
<<<<<<< HEAD
	
	//bouncing pencil
    game.physics.arcade.gravity.y = 150;
	game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, createBall, this);

}

function createBall() {
=======
>>>>>>> feda84824f4e3e9a96ce4e2590084176300f1cb1

    //  A bouncey ball sprite just to visually see what's going on.
    var ball = game.add.sprite(game.world.randomX, 0, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.bounce.y = 0.9;
    ball.body.collideWorldBounds = true;
}

function update() {
	
	//bitmapData
	  player.body.setZeroVelocity();
    if (cursors.up.isDown){
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown){
        player.body.moveDown(300);
    }
    if (cursors.left.isDown){
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown){
        player.body.moveRight(300);
    }
	
	//bullets
	        //  Firing?
        if (fireButton.isDown)
        {
            fireBullet();
        }
	game.physics.arcade.overlap(bullets, criminal, collisionHandler, null, this);
}

function collisionHandler (bullet, criminal) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    criminal.kill();
}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }
	
	bullets.callAll('kill',this);
    stateText.text=" You Won, \n Click to restart";
    stateText.visible = true;

    //the "click to restart" handler
    game.input.onTap.addOnce(restart,this);

}

function collisionHandler (pencil, man) {

    //  When a bullet hits an alien we kill them both
    pencil.kill();
    man.kill();
}

function render() {
	
	//music
	game.debug.soundInfo(music, 20, 32);
}

function changeVolume(pointer) {

    if (pointer.y < 300){
        music.volume += 0.1;
    }
    else{
        music.volume -= 0.1;
    }
<<<<<<< HEAD
=======
}


function restart () {

    //  A new level starts
    //  And brings the aliens back from the dead :)
    criminal.removeAll();
    create();

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;

>>>>>>> feda84824f4e3e9a96ce4e2590084176300f1cb1
}