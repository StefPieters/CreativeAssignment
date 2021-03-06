class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
    
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0); 
        this.setData("type", type);
        this.setData("isDead", false);
        
    }
    wallHit(){
    this.scene.sfx.WallHit.play();
    }
    Ping(){
      this.scene.sfx.Ping.play();
    }
    shieldHit(){
    this.scene.sfx.ShieldHit.play();
    }
    winGame(){
      this.scene.sfx.WinGame.play();
    }
    explode(canDestroy) {
      if (!this.getData("isDead")) {
        // Set the texture to the explosion image
        this.setTexture("Explosion"); 
        this.play("Explosion"); // play the animation
        // pick a random explosion sound
        this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();
        if (this.shootTimer !== undefined) {
          if (this.shootTimer) {
            this.shootTimer.remove(false);
          }
        }
        this.setAngle(0);
        this.body.setVelocity(0, -350);
        this.on('animationcomplete', function() {
          if (canDestroy) {
            this.destroy();
          }
          else {
            this.setVisible(false);
          }
        }, this);
        this.setData("isDead", true);
      }
    }
}

class Player extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");
        this.setData("speed", 500); //speed player
        this.setData("isShooting", false);
        this.setData("timerShootDelay", 30);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
        
    }

    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }
    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    update(){
        this.body.setVelocity(0, 0);
        this.x = Phaser.Math.Clamp(this.x, 28, this.scene.game.config.width-28); //player can't walk out off screen
        
        if (this.getData("isShooting")) {
          if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
            this.setData("timerShootTick", this.getData("timerShootTick") + 1); 
          }
          else { 
            var laser = new PlayerLaser(this.scene, this.x, this.y);
            this.scene.playerLasers.add(laser);
            this.scene.sfx.laser.play(); // play the laser sound effect
            this.setData("timerShootTick", 0);
          }
        }
        
    }
}
class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "LaserPlayer");
    this.body.velocity.y = -300;
  }
}

class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "LaserEnemy");
    this.body.velocity.y = 60;
  }
}

class Shield extends Entity {
  constructor(scene, x, y, key) {
      super(scene, x, y, key, "Shield");
      this.setData("speed", 400); //speed shield
      
  }

  moveLeft() {
      this.body.velocity.x = -this.getData("speed");
  }
  moveRight() {
      this.body.velocity.x = this.getData("speed");
  }

  update(){
    if(!this.getData("isDead")){
      this.body.setVelocity(0, 0);
      this.x = Phaser.Math.Clamp(this.x, 64, this.scene.game.config.width-64); //shield can't go off screen
    }
  }
}

class Wall extends Entity{
  constructor(scene, x, y, key){
    super(scene, x, y, key, "Wall");
    this.setData("score", 100);
  }
  onDestroy() {
    this.scene.sfx.LoseGame.play();
    this.scene.scene.start("SceneGameOver");
  }
  stopMusic(){
    this.scene.BossMusic.stop();
  }
  
}
class EnemyBoss extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "EnemyBoss", "EnemyBoss");
      this.body.velocity.y = 2;
      this.shootDelay = 2000;
      this.shootTimer = this.scene.time.addEvent({
        delay: this.shootDelay,
        callback: function() {
          var laser = new EnemyLaser(
            this.scene,
            Phaser.Math.Between(30, 1050),
            this.y
          );
          laser.setScale(this.scaleX*.35);
          this.scene.enemyLasers.add(laser);
        },
        callbackScope: this,
        loop: true
      });
      this.play("EnemyBoss");
    }
    onDestroy(){
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
    }
  }

class BlackEnemy extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "BlackEnemy", "BlackEnemy");
      this.body.velocity.y = Phaser.Math.Between(40, 45);
      this.body.velocity.x = Phaser.Math.Between(-460,460);
      this.play("BlackEnemy");
    }
    update(){
      
      if(this.x < 40){

        this.body.setVelocity(this.body.velocity.x*-1.1,this.body.velocity.y*1.3);
      
      }else if(this.x > this.scene.game.config.width-40){
      
        this.body.setVelocity(this.body.velocity.x*-1.1,this.body.velocity.y*1.3);

      }
    }
    
  }
class RedEnemy extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "RedEnemy", "RedEnemy");
      this.body.velocity.y = Phaser.Math.Between(60, 90);
      this.play("RedEnemy");
    }
  }

class BossWall extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "BossWall", "BossWall");
      this.body.velocity.y = 200; 
      this.body.velocity.x = 0; 
    }
    update(){
        if(this.y > 400){
          this.body.velocity.y = 0;
        }
  }
}

class Heart extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "Heart", "heart");
      this.body.velocity.y = 200;
    }
  }

class Star extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "Star", "Star");
      this.body.velocity.y = 250;
    }
  }

class PinkEnemy extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "PinkEnemy", "PinkEnemy");
      this.body.velocity.y = Phaser.Math.Between(10, 30);
      this.shootDelay = 3000;
      this.shootTimer = this.scene.time.addEvent({
        delay: this.shootDelay,
        callback: function() {
          var laser = new EnemyLaser(
            this.scene,
            this.x,
            this.y
          );
          laser.setScale(this.scaleX);
          this.scene.enemyLasers.add(laser);
        },
        callbackScope: this,
        loop: true
      });
      this.play("PinkEnemy");
    }
    onDestroy(){
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
    }
  }

class GreenEnemy extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "GreenEnemy", "GreenEnemy");
      this.body.velocity.y = Phaser.Math.Between(70, 90);
      this.states = {
        MOVE_DOWN: "MOVE_DOWN",
        SLIDE: "SLIDE"
      };
      this.state = this.states.MOVE_DOWN;
      this.play("GreenEnemy");
    }

    update(){
      if (!this.getData("isDead") && this.scene.player) {
        if (Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.scene.player.x,
          this.scene.player.y
        ) < 700) {
          this.state = this.states.SLIDE;
        }
        if (this.state == this.states.SLIDE) {
          var dx = this.scene.player.x - this.x;
          var dy = this.scene.player.y - this.y;
          var angle = Math.atan2(dy, dx);
          var speed = 300;
          this.body.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
          );
        }
      }
    }
    
  }

