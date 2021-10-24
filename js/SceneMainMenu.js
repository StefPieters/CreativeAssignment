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
      this.load.image("instructions", "assets/instructions.png");
      this.load.image("ProtectoTitle", "assets/ProtectoTitle.png");
      this.load.image("sprBtnMenu", "assets/ButtonMenu.png");
      this.load.image("sprBtnMenuHover", "assets/ButtonMenuHover.png");
      this.load.image("sprBtnMenuDown", "assets/ButtonMenuDown.png");

      this.load.image("sprBtnTutorial", "assets/ButtonTutorial.png");
      this.load.image("sprBtnTutorialHover", "assets/ButtonTutorialHover.png");
      this.load.image("sprBtnTutorialDown", "assets/ButtonTutorialDown.png");

      this.load.image("sprBtnPlay", "assets/ButtonPlay.png");
      this.load.image("sprBtnPlayHover", "assets/ButtonPlayHover.png");
      this.load.image("sprBtnPlayDown", "assets/ButtonPlayDown.png");

      this.load.image("sprBtnSkip", "assets/ButtonSkip.png");
      this.load.image("sprBtnSkipHover", "assets/ButtonSkipHover.png");
      this.load.image("sprBtnSkipDown", "assets/ButtonSkipDown.png");
      
      this.load.image("sprBtnRestart", "assets/ButtonRestart.png");
      this.load.image("sprBtnRestartHover", "assets/ButtonRestartHover.png");
      this.load.image("sprBtnRestartDown", "assets/ButtonRestartDown.png"); /* button restart */
      this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
      this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");
      this.load.image("Background", "assets/Background.png");
      
      //preload game
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
        this.load.spritesheet("EnemyBoss", "assets/EnemyBoss.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("Explosion", "assets/Explosion.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image("BossWall", "assets/BossWall.png");
        this.load.image("Star", "assets/star.png");
        this.load.image("Heart", "assets/heart.png");
        this.load.image("lostcity", "assets/lostcity.png");
        this.load.image("LaserPlayer", "assets/LaserPlayer.png");
        this.load.image("LaserEnemy", "assets/LaserEnemy.png");
        this.load.image("Shield", "assets/Shield.png");
        this.load.image("Wall", "assets/Wall.png");
        this.load.image("Background", "assets/Background.png");
        this.load.image("MenuBackground", "assets/menuBackground.png");
        this.load.image("story1", "assets/story1.png");
        this.load.image("story2", "assets/story2.png");
        this.load.image("story3", "assets/story3.png");
        this.load.image("Player", "assets/Player.png", {
            frameWidth: 32,
            frameHeight: 32
          });
        this.load.image("city", "assets/city.png");

        this.load.audio("sndExplode0", "assets/sndExplode0.wav");
        this.load.audio("sndExplode1", "assets/sndExplode1.wav");
        this.load.audio("sndLaser", "assets/sndLaser.wav");
        this.load.audio("sndLoseGame", "assets/sndLoseGame.wav");
        this.load.audio("sndWinGame", "assets/sndWinGame.wav");
        this.load.audio("sndWallHit", "assets/sndWallHit.wav");
        this.load.audio("sndShieldHit", "assets/sndShieldHit.wav");
        this.load.audio("Music", "assets/Chiptronical.ogg");
        this.load.audio("BossMusic", "assets/HyruleCastle.mp3");
        this.load.audio("StoryMusic", "assets/Dangerous.mp3");
        this.load.audio("HeartPing", "assets/heartPing.wav");
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

 


