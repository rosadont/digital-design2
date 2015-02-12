 
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('cupid', 'assets/sprites/cupid.png');
    game.load.image('arrows', 'assets/sprites/arrow.png');
	game.load.image('background', 'assets/sprites/background.jpg');
	game.load.image('boy', 'assets/sprites/boy.png');
	game.load.image('heart', 'assets/sprites/sadheart.png');
	game.load.image('picture', 'assets/sprites/lose.png');
	game.load.audio('music', 'assets/audio/Ashton Love - Paris (Original Mix).mp3');
}

var picture;
var sprite;
var arrows;
var fireRate = 100;
var nextFire = 0;
var hearts;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var enemyBullet;
var firingTimer = 0;
var picture;
var timer;
var current = 3;


function create() {
	
	game.add.image(0, 0, 'background');
	var boy = game.add.sprite(350, 400, 'boy');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    arrows = game.add.group();
    arrows.enableBody = true;
    arrows.physicsBodyType = Phaser.Physics.ARCADE;
    arrows.createMultiple(50, 'arrows');
    arrows.setAll('checkWorldBounds', true);
    arrows.setAll('outOfBoundsKill', true);
    
    sprite = game.add.sprite(650, 100, 'cupid');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.allowRotation = false;
	
	//music stuff
	music = game.add.audio('music');
    music.play();
    game.input.onDown.add(changeVolume, this);
	
	//heart
	emitter = game.add.emitter(450, 350, 10);
    emitter.makeParticles('heart', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 200, true, true);
    emitter.minParticleSpeed.setTo(-200, -300);
    emitter.maxParticleSpeed.setTo(200, -400);
    emitter.gravity = 150;
    emitter.bounce.setTo(0.5, 0.5);
    emitter.angularDrag = 30;
    emitter.start(false, 4000, 400);
	
	var mx = game.width - game.cache.getImage('cupid').width;
    var my = game.height - game.cache.getImage('cupid').height;
	
	for (var i = 0; i < 5; i++){
		sprite.animations.add('swim');
		sprite.animations.play('swim', 30, true);
		game.add.tween(sprite).to({y : 300}, 2000,  Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
		var cursors = game.input.keyboard.createCursorKeys();
		var fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        sprite.events.onInputDown.add(destroySprite, this);
    }
	//loser
	
	picture = game.add.sprite(game.world.centerX, game.world.centerY, 'picture');
    picture.anchor.setTo(0.5, 0.5);
    picture.scale.setTo(2, 2);
	
	//	Create our Timer
	timer = game.time.craete(false);
	
	//	Set a TimerEvent to occur after 3 seconds
	timer.add(3000, fade, this);
	
	//	Start the timer running - this is important!
	//	It won't start automatically, allowing you to hook it to button events and the like.
	timer.start();
}

function fade(){
	var tween;
	if (picture.alpha === 1){
		tween = game.add.tween(picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(picture).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
	}
	else
    {
        game.add.tween(picture).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        tween = game.add.tween(picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
	}
	tween.onComplete.add(change, this);
}

function change(){
	if (picture.alpha === 0)
    {
    picture.loadTexture('picture' + current);
	}
    else
    {
        picture.loadTexture('picture' + current);
    }
	current++;
	if (current > 7){
		current = 1;
	}
	timer.add(3000, fade, this);
}

function update() {
	
    if (game.input.activePointer.isDown){
        fire();
    }
}

function fire() {

    if (game.time.now > nextFire && arrows.countDead() > 0) {
        nextFire = game.time.now + fireRate;
        var arrow = arrows.getFirstDead();
        arrow.reset(sprite.x, sprite.y);
        game.physics.arcade.moveToPointer(arrow, 300);
    }
}

function render() {
	
	//music stuff
	game.debug.soundInfo(music, 20, 32);
}

function resetBullet (arrows) {

    //  Called if the bullet goes out of the screen
    arrows.kill();

}

function changeVolume(pointer) {

    if (pointer.y < 300){
        music.volume += 0.1;
    }
    else{
        music.volume -= 0.1;
    }
}