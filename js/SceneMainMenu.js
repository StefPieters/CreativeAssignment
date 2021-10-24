class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }
    preload(){
      let progressBar = this.add.graphics();
            let progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(370, 330, 320, 50);
            
            let width = this.cameras.main.width;
            let height = this.cameras.main.height;
            let loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: 'white',
                    align: 'center'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            let percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: 'white'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            let assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(380, 340, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });

            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
      this.load.image("instructions", "assets/sprites/instructions.png");
      this.load.image("ProtectoTitle", "assets/sprites/ProtectoTitle.png");
      this.load.image("sprBtnMenu", "assets/sprites/ButtonMenu.png");
      this.load.image("sprBtnMenuHover", "assets/sprites/ButtonMenuHover.png");
      this.load.image("sprBtnMenuDown", "assets/sprites/ButtonMenuDown.png");

      this.load.image("sprBtnTutorial", "assets/sprites/ButtonTutorial.png");
      this.load.image("sprBtnTutorialHover", "assets/sprites/ButtonTutorialHover.png");
      this.load.image("sprBtnTutorialDown", "assets/sprites/ButtonTutorialDown.png");

      this.load.image("sprBtnPlay", "assets/sprites/ButtonPlay.png");
      this.load.image("sprBtnPlayHover", "assets/sprites/ButtonPlayHover.png");
      this.load.image("sprBtnPlayDown", "assets/sprites/ButtonPlayDown.png");

      this.load.image("sprBtnSkip", "assets/sprites/ButtonSkip.png");
      this.load.image("sprBtnSkipHover", "assets/sprites/ButtonSkipHover.png");
      this.load.image("sprBtnSkipDown", "assets/sprites/ButtonSkipDown.png");
      
      this.load.image("sprBtnRestart", "assets/sprites/ButtonRestart.png");
      this.load.image("sprBtnRestartHover", "assets/sprites/ButtonRestartHover.png");
      this.load.image("sprBtnRestartDown", "assets/sprites/ButtonRestartDown.png"); /* button restart */
      this.load.audio("sndBtnOver", "assets/sound/sndBtnOver.wav");
      this.load.audio("sndBtnDown", "assets/sound/sndBtnDown.wav");
      this.load.image("Background", "assets/sprites/Background.png");
      
      //preload game
      this.load.spritesheet("RedEnemy", "assets/sprites/RedEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("GreenEnemy", "assets/sprites/GreenEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        });  
        this.load.spritesheet("PinkEnemy", "assets/sprites/PinkEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        }); 
        this.load.spritesheet("BlackEnemy", "assets/sprites/BlackEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        }); 
        this.load.spritesheet("EnemyBoss", "assets/sprites/EnemyBoss.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("Explosion", "assets/sprites/Explosion.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image("BossWall", "assets/sprites/BossWall.png");
        this.load.image("Star", "assets/sprites/star.png");
        this.load.image("Heart", "assets/sprites/heart.png");
        this.load.image("lostcity", "assets/sprites/lostcity.png");
        this.load.image("LaserPlayer", "assets/sprites/LaserPlayer.png");
        this.load.image("LaserEnemy", "assets/sprites/LaserEnemy.png");
        this.load.image("Shield", "assets/sprites/Shield.png");
        this.load.image("Wall", "assets/sprites/Wall.png");
        this.load.image("Background", "assets/sprites/Background.png");
        this.load.image("MenuBackground", "assets/sprites/menuBackground.png");
        this.load.image("story1", "assets/sprites/story1.png");
        this.load.image("story2", "assets/sprites/story2.png");
        this.load.image("story3", "assets/sprites/story3.png");
        this.load.image("Player", "assets/sprites/Player.png", {
            frameWidth: 32,
            frameHeight: 32
          });
        this.load.image("city", "assets/sprites/city.png");

        this.load.audio("sndExplode0", "assets/sound/sndExplode0.wav");
        this.load.audio("sndExplode1", "assets/sound/sndExplode1.wav");
        this.load.audio("sndLaser", "assets/sound/sndLaser.wav");
        this.load.audio("sndLoseGame", "assets/sound/sndLoseGame.wav");
        this.load.audio("sndWinGame", "assets/sound/sndWinGame.wav");
        this.load.audio("sndWallHit", "assets/sound/sndWallHit.wav");
        this.load.audio("sndShieldHit", "assets/sound/sndShieldHit.wav");
        this.load.audio("Music", "assets/sound/Chiptronical.ogg");
        this.load.audio("BossMusic", "assets/sound/HyruleCastle.mp3");
        this.load.audio("StoryMusic", "assets/sound/Dangerous.mp3");
        this.load.audio("HeartPing", "assets/sound/heartPing.wav");
  }

  create() {
    this.bgMenu = this.add.image(540,250, "MenuBackground")
        this.bgMenu.displayWidth = this.sys.canvas.width;
        this.bgMenu.displayHeight = 1100;
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver",{volume:0.2}),
      btnDown: this.sound.add("sndBtnDown",{volume:0.2})
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.44,
      "sprBtnPlay"
    );
    this.btnPlay.setScale(.2);

    
    

    this.btnPlay.on("pointerover", function() {
      this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnPlay.on("pointerout", function() {
      this.setTexture("sprBtnPlay");
    });

    this.btnPlay.on("pointerdown", function() {
      this.btnPlay.setTexture("sprBtnPlayDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnPlay.on("pointerup", function() {
      this.btnPlay.setTexture("sprBtnPlay");
      this.scene.start("SceneStory");
    }, this);
    this.btnPlay.setInteractive();

    
    

    this.btnTutorial = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.63,
      "sprBtnTutorial"
    );
    this.btnTutorial.setScale(.2);

   


    this.btnTutorial.on("pointerover", function() {
      this.btnTutorial.setTexture("sprBtnTutorialHover");
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnTutorial.on("pointerout", function() {
      this.setTexture("sprBtnTutorial");
    });

    this.btnTutorial.on("pointerdown", function() {
      this.btnTutorial.setTexture("sprBtnTutorialDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnTutorial.on("pointerup", function() {
      this.btnTutorial.setTexture("sprBtnTutorial");
      this.scene.start("SceneTutorial");
    }, this);
     this.btnTutorial.setInteractive();

    this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.2,
      "ProtectoTitle"
    );
    }
  }

 


