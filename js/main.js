/* 
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('cupid', 'assets/sprites/cupid.png');
	game.load.image('background', 'assets/sprites/background.jpg');
	game.load.audio('music', 'assets/audio/Ashton Love - Paris (Original Mix).mp3');

}

var sprite;
var cursors;

function create() {

    game.add.image(0, 0, 'background');

	//	Enable p2 physics
	game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    game.physics.p2.defaultRestitution = 0.8;

    //  Add a sprite
	sprite = game.add.sprite(200, 200, 'cupid');

    //  Enable if for physics. This creates a default rectangular body.
	game.physics.p2.enable(sprite);

    //  Modify a few body properties
	sprite.body.setZeroDamping();
	sprite.body.fixedRotation = true;

    text = game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();
	
	//music stuff
	music = game.add.audio('music');
    music.play();
    game.input.onDown.add(changeVolume, this);

}

function update() {

	sprite.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
    	sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
    	sprite.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
    	sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
    	sprite.body.moveDown(400);
    }
}

function render() {
	
	game.debug.soundInfo(music, 20, 32);

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
	
 */
 
 
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('arrow', 'assets/sprites/cupid.png');
    game.load.image('bullet', 'assets/sprites/arrow.png');
	game.load.image('background', 'assets/sprites/background.jpg');
	game.load.audio('music', 'assets/audio/Ashton Love - Paris (Original Mix).mp3');
    
}

var sprite;
var bullets;

var fireRate = 100;
var nextFire = 0;

function create() {
	
	 game.add.image(0, 0, 'background');

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.stage.backgroundColor = '#313131';

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;
	
	//music stuff
	music = game.add.audio('music');
    music.play();
    game.input.onDown.add(changeVolume, this);

}

function update() {

    //sprite.rotation = game.physics.arcade.angleToPointer(sprite);

    if (game.input.activePointer.isDown)
    {
        fire();
    }
	
	

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}

function render() {

    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    game.debug.spriteInfo(sprite, 32, 450);
	//music stuff
	game.debug.soundInfo(music, 20, 32);

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
