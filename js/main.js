 
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('cupid', 'assets/sprites/cupid.png');
    game.load.image('arrows', 'assets/sprites/arrow.png');
	game.load.image('background', 'assets/sprites/background.jpg');
	game.load.image('boy', 'assets/sprites/boy.png');
	game.load.image('heart', 'assets/sprites/sadheart.png');
	game.load.audio('music', 'assets/audio/Ashton Love - Paris (Original Mix).mp3');
}

var sprite;
var arrows;
var fireRate = 100;
var nextFire = 0;
var score;
var scoreText;
var player;
var aliens;
var hearts;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];

function create() {
	
	game.add.image(0, 0, 'background');
	
	var boy = game.add.sprite(300, 400, 'boy');

    game.physics.startSystem(Phaser.Physics.ARCADE);

    arrows = game.add.group();
    arrows.enableBody = true;
    arrows.physicsBodyType = Phaser.Physics.ARCADE;
    arrows.createMultiple(50, 'arrows');
    arrows.setAll('checkWorldBounds', true);
    arrows.setAll('outOfBoundsKill', true);
    
    sprite = game.add.sprite(650, 100, 'cupid');
    //sprite.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;
	
	//music stuff
	music = game.add.audio('music');
    music.play();
    game.input.onDown.add(changeVolume, this);
	
	//heart
	emitter = game.add.emitter(game.world.centerX, game.world.centerY, 10);
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
	game.physics.arcade.overlap(arrows, sprite, collisionHandler, null, this);
	
	 //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) 
    {
        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }
}

function collisionHandler(arrows, sprite){
	
	//  When a bullet hits an alien we kill them both
	arrows.kill();
    sprite.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    if (sprite.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;

        hearts.callAll('kill',this);
        stateText.text = " You Won, \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
}`

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

function restart () {

    //  A new level starts  
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    cupid.removeAll();

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;
}
 /*

function update() {

    if (sprite.alive)
    {
        //  Reset the player, then check for movement keys
        sprite.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            sprite.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            sprite.body.velocity.x = 200;
        }

        //  Firing?
        if (fireButton.isDown)
        {
            fireBullet();
        }

        if (game.time.now > firingTimer)
        {
            enemyFires();
        }

        //  Run collision
        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
    }

}


function enemyHitsPlayer (sprite, hearts) {
    
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        hearts.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }

}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime){
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
}

 */