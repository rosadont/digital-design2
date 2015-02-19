var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/sprites/background.jpg');
    game.load.image('player','assets/sprites/police.png');
	game.load.image('criminal', 'assets/sprites/criminal.png');
	game.load.audio('music', 'assets/audio/Axwell - Ingrosso - We Come We Rave We Love (Dex Morrison Remix).mp3');
	game.load.image('phaser', 'assets/sprites/criminal.png');
}

var player;
var cursors;

function create() {

    game.world.setBounds(0, 0, 3400, 1000);
    game.add.tileSprite(0, 0, 3400, 1000, 'background');
 
	
/* 	//criminals
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
    bmd.drawGroup(group); */
	
	
	//music
	
    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;

    music = game.add.audio('music');

    music.play();

    game.input.onDown.add(changeVolume, this);
	
	//bitmapData
	game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
	
	//
	//	Here we create a group, populate it with sprites, give them all a random velocity
	//	and then check the group against itself for collision

/* 	sprites = game.add.group();

 	for (var i = 0; i < 30; i++)
	{
		//var s = sprites.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'spinner');
		//s.animations.add('spin', [0,1,2,3]);
		//s.play('spin', 20, true);
		game.physics.enable(s, Phaser.Physics.ARCADE);
		//s.body.velocity.x = game.rnd.integerInRange(-200, 200);
		//s.body.velocity.y = game.rnd.integerInRange(-200, 200);
	} 

	//	Here we'll create a new group
	var groupB = game.make.group();

	//	And add a sprite into it
	groupB.create(150, 320, 'phaser');

	//	It becomes a child of the Sprites group
	sprites.add(groupB);

	//	This will set physics properties on all group children that have a 'body' (i.e. it will skip the groupB)
	sprites.setAll('body.collideWorldBounds', true);
	sprites.setAll('body.bounce.x', 1);
	sprites.setAll('body.bounce.y', 1);
	sprites.setAll('body.minBounceVelocity', 0); */

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