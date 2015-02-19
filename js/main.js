var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/sprites/background.jpg');
    game.load.image('player','assets/sprites/police.png');
	game.load.image('criminal', 'assets/sprites/criminal.png');
	game.load.audio('music', 'assets/audio/Axwell - Ingrosso - We Come We Rave We Love (Dex Morrison Remix).mp3');
	game.load.image('bullet', 'assets/sprites/bullet.png');
}

var player;
var cursors;
var bullets;
var bullet;
var criminal;
var bullets;
var bulletTime = 0;
var fireButton;
var firingTimer = 0;
var stateText;

function create() {

    game.world.setBounds(0, 0, 3400, 1000);
    game.add.tileSprite(0, 0, 3400, 1000, 'background');
 
	
 	//criminals
	//game.add.sprite(0, 0, 'background');
	var group = game.make.group();

    //  Add a bunch of sprites in random positions to the group
    for (var i = 0; i < 40; i++)
    {
        group.create(game.world.randomX, game.world.randomY, 'criminal');
    }

    //  This is the BitmapData we're going to be drawing to
    var bmd = game.add.bitmapData(game.width, game.height);

    bmd.addToWorld();

    //  Draw the group
    bmd.drawGroup(group);
	
	
	//music
	
    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;

    music = game.add.audio('music');

    music.play();

    game.input.onDown.add(changeVolume, this);
	
	//bitmapData
	game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(100, 900, 'player');

    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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
	
	//  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

}

function update() {
	
	//bitmapData
	  player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
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

function render() {
	
	//music
	game.debug.soundInfo(music, 20, 32);
	
	//bitmapData
	
    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.spriteCoords(player, 32, 500);
	
	//criminal
	//game.physics.arcade.collide(sprites);

}

function changeVolume(pointer) {

    if (pointer.y < 300)
    {
        music.volume += 0.1;
    }
    else
    {
        music.volume -= 0.1;
    }
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

}