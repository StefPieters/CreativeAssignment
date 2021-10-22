class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }
    preload(){
      this.load.image("sprBtnPlay", "assets/ButtonPlay.png");
      this.load.image("sprBtnPlayHover", "assets/ButtonPlayHover.png");
      this.load.image("sprBtnPlayDown", "assets/ButtonPlayDown.png");
      this.load.image("sprBtnRestart", "assets/ButtonRestart.png");
      this.load.image("sprBtnRestartHover", "assets/ButtonRestartHover.png");
      this.load.image("sprBtnRestartDown", "assets/ButtonRestartDown.png"); /* button restart */
      this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
      this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");
      this.load.image("Background", "assets/Background.png");
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnPlay"
    );
    this.btnPlay.setScale(.2);


    this.btnPlay.setInteractive();

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
      this.scene.start("SceneMain");
    }, this);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "Protecto", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.subtitle = this.add.text(this.game.config.width * 0.5, 240, "Sound may be loud - Lower your volume", {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
    this.subtitle.setOrigin(0.5);
    }
  }

 


