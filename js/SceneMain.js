class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }
    preload(){
    
    }
    create() {
      
        let score = 0;
        let scoreText;
        let lives = 5;
        let livesText;
        let monsterKills = 200;
        let levelText;
        let bossLives = 30;
        let BossActive = "false";
        let bossLivesText;

        this.music = this.sound.add('Music', {volume:0.2});
        this.BossMusic = this.sound.add('BossMusic', {volume:0.4});

        this.music.play();
        
        this.bg = this.add.sprite(540,300, "Background")
        this.bg.displayWidth = this.sys.canvas.width;
        this.bg.displayHeight = 750;
        this.bg.setInteractive();

      this.anims.create({
            key: "EnemyBoss",
            frames: this.anims.generateFrameNumbers("EnemyBoss"),
            frameRate: 20,
            repeat: -1
          });
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
              this.sound.add("sndExplode0", {volume:0.2}),
              this.sound.add("sndExplode1", {volume:0.5})
            ],
            laser: this.sound.add("sndLaser", {volume:0.2}),
            WallHit: this.sound.add("sndWallHit", {volume:0.2}),
            ShieldHit: this.sound.add("sndShieldHit", {volume:0.2}),
            WinGame: this.sound.add("sndWinGame", {volume:0.2}),
            LoseGame: this.sound.add("sndLoseGame", {volume:0.2}),
            HeartPing: this.sound.add("HeartPing",{volume:0.4})
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
        this.bossEnemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();
        this.hearts = this.add.group();

    
          //BOSS LEVEL
          this.time.addEvent({
          delay: 1000,
          callback: function() {
             var bossEnemy = null;
             
            //BOSS LEVEL
          if(BossActive === "false"){
          if(monsterKills >= 200){
            console.log(bossLives);
            BossActive = "true";
            this.music.stop();
            this.BossMusic.play();
            levelText.destroy();
            bossLivesText = this.add.text(20, 60, "HP BOSS: 100", {
                fontFamily: 'monospace',
                fontSize: '30px',
                fontStyle: 'bold',
                color: 'red',
                boundsAlignH: "center",
                boundsAlignV: "middle"
              });
            levelText = this.add.text(390, 200, "BOSS LEVEL", {
                fontFamily: 'monospace',
                fontSize: '50px',
                fontStyle: 'bold',
                color: '#ffffff',
                boundsAlignH: "center",
                boundsAlignV: "middle"
              });
            console.log("bossenemy")
              bossEnemy = new EnemyBoss(
                this,
                540,
                0
              )
          }
          this.time.addEvent({
          delay: 1000,
          callback: function() {
            var laser = null;
          if(bossLives > 30 && bossLives < 50){
            console.log("LASERATTACK")
            var laser = new EnemyLaser(
            this,
            400,
            0
          );
          if (bossEnemy !== null) {
            laser.setScale(1.5);
          this.enemyLasers.add(laser);
          }
          }
          },
          callbackScope: this,
          loop: true
         });
         this.time.addEvent({
          delay: 1000,
          callback: function() {
          if(bossLives > 50 && bossLives < 70){
            console.log("LASERATTACK")
            var laser = new EnemyLaser(
            this,
            800,
            0
          );

          if (bossEnemy !== null) {
            laser.setScale(1.5);
          this.enemyLasers.add(laser);
          }
          }
          },
          callbackScope: this,
          loop: true
         });
          }
           if (bossEnemy !== null) {
              bossEnemy.setScale(5); //scale enemies
              this.bossEnemies.add(bossEnemy);
              }
            },
          callbackScope: this,
          loop: true
        });

          this.time.addEvent({
          delay: 2000,
          callback: function() {
             var enemy = null;
             var bigEnemy = null;
            //LEVEL 8 part3
          if(monsterKills >= 130 && monsterKills < 170){
              enemy = new RedEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );

          }
          //LEVEL 9 part3
          if(monsterKills >= 150 && monsterKills < 200){
              bigEnemy = new BlackEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );

          }
           if (enemy !== null) {
              enemy.setScale(Phaser.Math.Between(15, 16) *.1); //scale enemies
              this.enemies.add(enemy);
              }
            if (bigEnemy !== null) {
              bigEnemy.setScale(Phaser.Math.Between(13, 15)*.1); //scale bigEnemies
              this.enemies.add(bigEnemy);
            }
            },
          callbackScope: this,
          loop: true
        });


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
            //LEVEL 7 part 2
            if(monsterKills >= 100 && monsterKills < 130){
            levelText.setText(`Level 7`)
            if (Phaser.Math.Between(0, 10) >= 5) {
              enemy = new RedEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
              
            }
            else if (Phaser.Math.Between(0, 10) >= 5) {
              if (this.getEnemiesByType("GreenEnemy").length < 5) {
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
          //LEVEL 8 part2
          if(monsterKills >= 130 && monsterKills < 150){
              enemy = new PinkEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );

          }

          //LEVEL 9 part2
          if(monsterKills >= 150 && monsterKills < 200){
              enemy = new GreenEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );

          }
            if (enemy !== null) {
              enemy.setScale(Phaser.Math.Between(15, 16) *.1); //scale enemies
              this.enemies.add(enemy);
              }
            if (bigEnemy !== null) {
              bigEnemy.setScale(Phaser.Math.Between(13, 15)*.1); //scale bigEnemies
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
            //LEVEL 7
            if(monsterKills >= 100 && monsterKills < 130){
            levelText.setText(`Level 7`)
            if (Phaser.Math.Between(0, 10) >= 5) {
              enemy = new RedEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
              
            }
            else if (Phaser.Math.Between(0, 10) >= 5) {
              if (this.getEnemiesByType("GreenEnemy").length < 5) {
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
          //LEVEL 8
          if(monsterKills >= 130 && monsterKills < 150){
            levelText.setText(`Level 8`)
              bigEnemy = new BlackEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );

          }
          //LEVEL 9
          if(monsterKills >= 150 && monsterKills < 200){
            levelText.setText(`Level 9`)
              enemy = new RedEnemy(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );

          }
            if (enemy !== null) {
              enemy.setScale(Phaser.Math.Between(16, 17)*.1); //scale enemies
              this.enemies.add(enemy);
              }
            if (bigEnemy !== null) {
              bigEnemy.setScale(Phaser.Math.Between(13, 15)*.1); //scale bigEnemies
              this.enemies.add(bigEnemy);
            }


           

          },
          callbackScope: this,
          loop: true
        });

        // HEART POWERUP -----------------------------------
        this.time.addEvent({
          delay: 50000,
          callback: function() {
            var heart = null;
            heart = new Heart(
                this,
                Phaser.Math.Between(20, this.game.config.width-20),
                0
              );
              if (heart !== null) {
              heart.setScale(.08); //scale enemies
              this.hearts.add(heart);
              }
            },
          callbackScope: this,
          loop: true
        });

        // WIN GAME ------------------------------------

        this.time.addEvent({
          delay: 3000,
          callback: function() {
          
          if(bossLives >= 100){
          
          
          this.time.addEvent({
          delay: 100,
          callback: function() {
          this.wall.winGame();
          this.BossMusic.stop();
          console.log("you win")
          this.bg.setTexture("city");
          levelText.setText('');
          livesText.setText('');
          lives = 100;
          this
          this.finalScoreText = this.add.text(this.game.config.width * 0.5, 328, `Final score:`, { fontFamily: 'monospace',fontStyle: 'bold', fontSize: '30px', fill: 'white' });
          this.score = this.add.text(this.game.config.width * 0.5, 378, `${score}`, { fontFamily: 'monospace', fontSize: '30px', fill: 'white' });
          this.title = this.add.text(this.game.config.width * 0.5, 228, "YOU WON", {
            fontFamily: 'monospace',
            fontSize: 80,
            fontStyle: 'bold',
            color: 'Black',
            align: 'center'
          });
          
          this.title.setOrigin(0.5);
          this.finalScoreText.setOrigin(.5);
          this.score.setOrigin(.5);
          

          this.time.addEvent({ 
          delay: 6000,
          callback: function() {
            this.wall.winGame();
            console.log("new scene")
            this.scene.start("SceneGameWon");

          },
          callbackScope: this,
          loop: false
          });
          },
          callbackScope: this,
          loop: false
          });
          }
          
          },
          callbackScope: this,
          loop: true
        });
          
      scoreText = this.add.text(20, 30, 'Score: 0', { fontFamily: 'monospace', fontSize: '30px', fill: 'white' });
        livesText = this.add.text(900, 30, `Lives: ${lives}`, { fontFamily: 'monospace', fontSize: '30px', fill: 'white' });
        levelText = this.add.text(450, 30, "Level 1", {
        fontFamily: 'monospace',
        fontSize: '50px',
        fontStyle: 'bold',
        color: '#ffffff',
        boundsAlignH: "center",
        boundsAlignV: "middle"
      });
      
        this.physics.add.overlap(this.playerLasers, this.bossEnemies, function(playerLaser, bossEnemy) {
          if (bossEnemy) {
            if (bossLives === 100) {
              bossEnemy.onDestroy();
              bossEnemy.destroy();
              score += 1000;
              bossLives +=1;
              bossLivesText.setText('');
             
            }
            if(bossLives <= 100){
            bossLivesText.setText('HP BOSS: ' + (100-bossLives));
            }
            playerLaser.explode();
            bossLives += 1;
            console.log(bossLives)
            playerLaser.destroy();
            score += 10;
            monsterKills += 1;
            scoreText.setText('Score: ' + score);
          }
        });

        this.physics.add.overlap(this.wall, this.bossEnemies, function(wall, bossEnemy) {
          if (!wall.getData("isDead") &&
              !bossEnemy.getData("isDead")) {
            bossEnemy.explode(true);
            wall.stopMusic();
            wall.setData("isDead", "true");
            wall.explode(true);
            wall.onDestroy();
            
          }
        });
      
          
        

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
        
        this.physics.add.collider(this.playerLasers, this.hearts, function(playerLaser, heart) {
          if (heart) {
            if (heart.onDestroy !== undefined) {
              heart.onDestroy(); 

            }
            
            playerLaser.destroy();
            lives = lives+1;
            console.log(lives);
            heart.Ping();
            heart.explode(true);
            livesText.setText(`Lives: ${lives}`)
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
            score += 5;
            enemyLaser.explode(true);
          }
        });

        this.physics.add.collider(this.playerLasers, this.enemyLasers, function(playerLaser, enemyLaser) {
          if (enemyLaser) {
            if (enemyLaser.onDestroy !== undefined) {
              enemyLaser.onDestroy();
            }
            enemyLaser.explode(true);
            score += 5;
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
            wall.wallHit();
            if(lives === 0){
            wall.setData("isDead", "true");
            wall.explode(true);
            wall.onDestroy();
            wall.stopMusic();
            
            }
          }
        });

        this.physics.add.overlap(this.wall, this.hearts, function(wall, heart) {
          if (!wall.getData("isDead") &&
              !heart.getData("isDead")) {
            heart.shieldHit();
            heart.destroy();
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
          if (this.keySpace.isDown) {
          this.player.setData("isShooting", true);
        }
        else {
          this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
          this.player.setData("isShooting", false);
        }
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
