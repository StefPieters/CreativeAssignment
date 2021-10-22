class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }
    preload(){
      
        /*this.load.image("Background0", "assets/Background0.png");
        this.load.image("Background1", "assets/Background1.png");*//* sprites voor backgrounds */

        this.load.spritesheet("RedEnemy", "assets/RedEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("GreenEnemy", "assets/GreenEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        });  
        this.load.spritesheet("PinkEnemy", "assets/PinkEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        }); 
        this.load.spritesheet("BlackEnemy", "assets/BlackEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        }); 
        /*this.load.spritesheet("EnemyBoss", "assets/EnemyBoss.png", {
            frameWidth: 16,
            frameHeight: 16
        }); */
        this.load.spritesheet("Explosion", "assets/Explosion.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image("lostcity", "assets/lostcity.png");
        this.load.image("LaserPlayer", "assets/LaserPlayer.png");
        this.load.image("LaserEnemy", "assets/LaserEnemy.png");
        this.load.image("Shield", "assets/Shield.png");
        this.load.image("Wall", "assets/Wall.png");
        this.load.image("Background", "assets/Background.png");
        this.load.image("Player", "assets/Player.png", {
            frameWidth: 32,
            frameHeight: 32
          });

        this.load.audio("sndExplode0", "assets/sndExplode0.wav");
        this.load.audio("sndExplode1", "assets/sndExplode1.wav");
        this.load.audio("sndLaser", "assets/sndLaser.wav");
        this.load.audio("sndLoseGame", "assets/sndLoseGame.wav");
        this.load.audio("sndWinGame", "assets/sndWinGame.wav");
        this.load.audio("sndWallHit", "assets/sndWallHit.wav");
        this.load.audio("sndShieldHit", "assets/sndShieldHit.wav");
        this.load.audio("Music", "assets/Chiptronical.ogg");
        
    }
    create() {
      
        let score = 0;
        let scoreText;
        let lives = 5;
        let livesText;
        let monsterKills = 0;
        let levelText;

        this.music = this.sound.add('Music', {volume:0.5});

        this.music.play();
        
        this.bg = this.add.image(540,300, "Background")
        this.bg.displayWidth = this.sys.canvas.width;
        this.bg.displayHeight = 750;
        scoreText = this.add.text(20, 30, 'Score: 0', { fontFamily: 'arial', fontSize: '30px', fill: 'white' });
        livesText = this.add.text(900, 30, `Lives: ${lives}`, { fontFamily: 'arial', fontSize: '30px', fill: 'white' });
        levelText = this.add.text(500, 30, 'Level 1', { fontFamily: 'arial', fontSize: '30px', fill: 'white' });
        this.anims.create({
            key: "RedEnemy",
            frames: this.anims.generateFrameNumbers("RedEnemy"),
            frameRate: 20,
            repeat: -1
          });
        this.anims.create({
          key: "GreenEnemy",
          frames: this.anims.generateFrameNumbers("GreenEnemy"),
          frameRate: 20,
          repeat: -1
        });
        this.anims.create({
            key: "PinkEnemy",
            frames: this.anims.generateFrameNumbers("PinkEnemy"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "BlackEnemy",
            frames: this.anims.generateFrameNumbers("BlackEnemy"),
            frameRate: 20,
            repeat: -1
          });
        this.anims.create({
            key: "Explosion",
            frames: this.anims.generateFrameNumbers("Explosion"),
            frameRate: 20,
            repeat: 0
        });
        

        this.sfx = {
            explosions: [
              this.sound.add("sndExplode0", {volume:0.5}),
              this.sound.add("sndExplode1", {volume:0.5})
            ],
            laser: this.sound.add("sndLaser", {volume:0.5}),
            WallHit: this.sound.add("sndWallHit", {volume:0.5}),
            ShieldHit: this.sound.add("sndShieldHit", {volume:0.5}),
            WinGame: this.sound.add("sndWinGame", {volume:0.5}),
            LoseGame: this.sound.add("sndLoseGame", {volume:0.5})
        }
        this.wall = new Wall(this,this.game.config.width * 0.5, this.game.config.height * .97, "Wall");
        this.player = new Player(this, this.game.config.width * 0.5, this.game.config.height * .955, "Player");
        this.shield = new Shield(this, this.game.config.width * 0.5, this.game.config.height * .74, "Shield");
        
        
        
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.bigEnemies = this.add.group();
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        //bring shield back
        /*this.time.addEvent({
          delay: 0,
          callback: function() {
        if (this.shield.getData("isDead")) {
          console.log('hey')
          this.time.addEvent({
          delay: 3000,
          callback: function() {
            
            if (this.shield.getData("isDead")) {
            this.shield = new Shield(this, this.game.config.width * 0.5, this.game.config.height * .74, "Shield");
            }
            },
          callbackScope: this,
          loop: false
          });}
        },
          callbackScope: this,
          loop: true
          });*/
       this.time.addEvent({
          delay: 5000,
          callback: function() {
            var enemy = null;
            var bigEnemy = null;
            //LEVEL 6 part 2
            if(monsterKills > 75 && monsterKills <= 100){
              
              if (Phaser.Math.Between(0, 10) >= 5) {
              enemy = new PinkEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );

            }
            else if (Phaser.Math.Between(0, 10) >= 5) {
              
                enemy = new GreenEnemy(
                  this,
                  Phaser.Math.Between(20, this.game.config.width-20),
                  0
                );

            }
          
            }
            if (enemy !== null) {
              enemy.setScale(Phaser.Math.Between(15, 16) *.1); //scale enemies
              this.enemies.add(enemy);
              }
            if (bigEnemy !== null) {
              bigEnemy.setScale(Phaser.Math.Between(26, 27)*.1); //scale bigEnemies
              this.enemies.add(bigEnemy);
            }


          },
          callbackScope: this,
          loop: true
        });
        this.time.addEvent({
          delay: 1500,
          callback: function() {
            var enemy = null;
            var bigEnemy = null;
            
            //LEVEL 1
              if(monsterKills >= 0 && monsterKills <= 10){
              enemy = new RedEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
              }

            //LEVEL 2
              if(monsterKills > 10 && monsterKills <= 15){
              levelText.setText("Level 2");
              enemy = new GreenEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
            //LEVEL 3
              }
            if(monsterKills > 15 && monsterKills <= 20){
              levelText.setText("Level 3");
              enemy = new PinkEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
              }
              
              //LEVEL 4
            if(monsterKills > 20 && monsterKills <= 50){
              levelText.setText("Level 4");
            if (Phaser.Math.Between(0, 10) >= 5) {
              enemy = new RedEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
              
            }
            else if (Phaser.Math.Between(0, 10) >= 5) {
              if (this.getEnemiesByType("GreenEnemy").length < 5/* values to change amount of enemies)*/) {
                enemy = new GreenEnemy(
                  this,
                  Phaser.Math.Between(20, this.game.config.width-20),
                  0
                );
              }
            }
            else {
              enemy = new PinkEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
            }
            }
            //LEVEL 5
            if(monsterKills > 50 && monsterKills <= 75){
              levelText.setText("Level 5");
              bigEnemy = new BlackEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
            }
            
            //LEVEL 6
            if(monsterKills > 75 && monsterKills <= 100){
              levelText.setText("Level 6");
              
              if (Phaser.Math.Between(0, 10) >= 5) {
              bigEnemy = new BlackEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );

            }
            else if (Phaser.Math.Between(0, 10) >= 5) {

                enemy = new GreenEnemy(
                  this,
                  Phaser.Math.Between(20, this.game.config.width-20),
                  0
                );

            }
          
            }
            
            if (enemy !== null) {
              enemy.setScale(Phaser.Math.Between(16, 17)*.1); //scale enemies
              this.enemies.add(enemy);
              }
            if (bigEnemy !== null) {
              bigEnemy.setScale(Phaser.Math.Between(25, 27)*.1); //scale bigEnemies
              this.enemies.add(bigEnemy);
            }


            // WIN GAME ------------------------------------
          if(monsterKills >= 100){
          this.player.winGame();
          this.music.stop();
          this.scene.start("SceneGameWon");
          
          }

          },
          callbackScope: this,
          loop: true
        });
        
      
        
        
        /*this.time.addEvent({
          delay: this.delay,
          callback: function() {
            var enemy = null;

            if(monsterKills > 100){ //boss level
            levelText.setText(`Level 2`)
            this.music.stop();
            }//changes background if level is completed

            if(monsterKills >= 0 && monsterKills <= 10){
            this.delay = 10000;
            if (Phaser.Math.Between(0, 10) >= 5) {
              enemy = new RedEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
              
            }
            else if (Phaser.Math.Between(0, 10) >= 5) {
              if (this.getEnemiesByType("GreenEnemy").length < 5/* values to change amount of enemies) {
                enemy = new GreenEnemy(
                  this,
                  Phaser.Math.Between(20, this.game.config.width-20),
                  0
                );
              }
            }
            else {
              enemy = new PinkEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
            }
            if (enemy !== null) {
              enemy.setScale(Phaser.Math.Between(13, 17) * 0.1); //scale enemies
              this.enemies.add(enemy);
            }
          }
          },
          callbackScope: this,
          loop: true
        });*/
        
          
          
        

        this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
          if (enemy) {
            if (enemy.onDestroy !== undefined) {
              enemy.onDestroy();
            }
            
            playerLaser.destroy();
            score += 10;
            monsterKills += 1;
            enemy.explode(true);
            scoreText.setText('Score: ' + score);
          }
        });
        this.physics.add.collider(this.playerLasers, this.bigEnemies, function(playerLaser, bigEnemy) {
          if (bigEnemy) {
            if (bigEnemy.onDestroy !== undefined) {
              bigEnemy.onDestroy();
            }
            bigEnemy.explode(true);
            playerLaser.destroy();
            score += 50;
            monsterKills += 1;
            bigEnemy.setData("Dead", "true");
            
            scoreText.setText('Score: ' + monsterKills);
          }
        });
        
        this.physics.add.overlap(this.wall, this.enemies, function(wall, enemy) {
          if (!wall.getData("isDead") &&
              !enemy.getData("isDead")) {
            
            enemy.explode(true);
            console.log(lives);
            lives = lives-1;
            console.log(lives);
            livesText.setText(`Lives: ${lives}`)
            //---------------
            wall.wallHit();
            if(lives === 0){
            wall.setData("isDead", "true");
            wall.explode(true);
            wall.onDestroy();
            }
          }
        });
        
        this.physics.add.overlap(this.shield, this.enemyLasers, function(shield, enemyLaser) {
          if (enemyLaser) {
            if (enemyLaser.onDestroy !== undefined) {
              enemyLaser.onDestroy();
            }
            //------------------
            shield.shieldHit();
            enemyLaser.explode(true);
          }
        });

        this.physics.add.collider(this.playerLasers, this.enemyLasers, function(playerLaser, enemyLaser) {
          if (enemyLaser) {
            if (enemyLaser.onDestroy !== undefined) {
              enemyLaser.onDestroy();
            }
            enemyLaser.explode(true);
            playerLaser.destroy();
          }
        });

        this.physics.add.overlap(this.wall, this.enemyLasers, function(wall, enemyLaser) {
          if (!wall.getData("isDead") &&
              !enemyLaser.getData("isDead")) {
            enemyLaser.explode(true);
            enemyLaser.destroy();
            
            lives = lives-1;
            console.log(lives);
            livesText.setText(`Lives: ${lives}`)
            if(lives === 0){
            wall.setData("isDead", "true");
            wall.explode(true);
            wall.onDestroy();
            
            }
          }
        });

      }
        getEnemiesByType(type) {
          var arr = [];
          for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type) {
              arr.push(enemy);
            }
          }
          return arr;
        }        

        update(){

          
          if(this.wall.getData("isDead")){
            this.music.stop();
          }
          if (!this.player.getData("isDead")) {
            this.player.update();
            if (this.keyLEFT.isDown) {
              this.player.moveLeft();
            }
            else if (this.keyRIGHT.isDown) {
              this.player.moveRight();
              
            }
          }
          
          if (!this.shield.getData("isDead")) {
            this.shield.update();
            if (this.keyQ.isDown) {
              this.shield.moveLeft();
            }
            else if (this.keyD.isDown) {
              this.shield.moveRight();
              
            }
          }

        if (this.keySpace.isDown) {
          this.player.setData("isShooting", true);
        }
        else {
          this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
          this.player.setData("isShooting", false);
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
          var enemy = this.enemies.getChildren()[i];
          enemy.update();

          if (enemy.x < -enemy.displayWidth ||
            enemy.x > this.game.config.width + enemy.displayWidth ||
            enemy.y < -enemy.displayHeight * 4 ||
            enemy.y > this.game.config.height + enemy.displayHeight) {
            if (enemy) {
              if (enemy.onDestroy !== undefined) {
                enemy.onDestroy();
              }
              enemy.destroy();
            }
          }
        }

        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
          var laser = this.enemyLasers.getChildren()[i];
          laser.update();
          if (laser.x < -laser.displayWidth ||
            laser.x > this.game.config.width + laser.displayWidth ||
            laser.y < -laser.displayHeight * 4 ||
            laser.y > this.game.config.height + laser.displayHeight) {
            if (laser) {
              laser.destroy();
            }
          }
        }
    
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
          var laser = this.playerLasers.getChildren()[i];
          laser.update();
          
          if (laser.x < -laser.displayWidth ||
            laser.x > this.game.config.width + laser.displayWidth ||
            laser.y < -laser.displayHeight * 8 ||
            laser.y > this.game.config.height + laser.displayHeight) {
            if (laser) {
              laser.destroy();
            }
          }
        }
  

    }
}
