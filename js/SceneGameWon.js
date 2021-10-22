class SceneGameWon extends Phaser.Scene {
    constructor() {
      super({ key: "SceneGameWon" });
    }
    preload(){
      this.load.image("city", "assets/city.png");
    }
    create() {
      this.bgGameWon = this.add.image(540,300, "city")
      this.bgGameWon.displayWidth = this.sys.canvas.width;
      this.bgGameWon.displayHeight = this.sys.canvas.height;
      
      this.title = this.add.text(this.game.config.width * 0.5, 128, "THANK YOU HERO", {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: 'black',
        align: 'center'
      });
      this.title.setOrigin(0.5);
      this.text = this.add.text(this.game.config.width * 0.5, 190, "You killed all the incoming monsters!", {
        fontFamily: 'monospace',
        fontSize: 24,
        fontStyle: 'bold',
        color: 'black',
        align: 'center'
      });
      this.text.setOrigin(0.5);

      this.sfx = {
        btnOver: this.sound.add("sndBtnOver"),
        btnDown: this.sound.add("sndBtnDown")
      };
  
      this.btnRestart = this.add.sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "sprBtnRestart"
      );
      this.btnRestart.setScale(.2);
      this.btnRestart.setInteractive();
  
      this.btnRestart.on("pointerover", function() {
        this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      }, this);
  
      this.btnRestart.on("pointerout", function() {
        this.setTexture("sprBtnRestart");
      });
  
      this.btnRestart.on("pointerdown", function() {
        this.btnRestart.setTexture("sprBtnRestartDown");
        this.sfx.btnDown.play();
      }, this);
  
      this.btnRestart.on("pointerup", function() {
        this.btnRestart.setTexture("sprBtnRestart");
        this.scene.start("SceneMain");
      }, this);

    }
  }