class SceneStory extends Phaser.Scene {
    constructor() {
      super({ key: "SceneStory" });
    }
    preload(){
    }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };


    this.btnMenu = this.add.sprite(
      this.game.config.width * 0.1,
      this.game.config.height * 0.1,
      "sprBtnMenu"
    );
    this.btnMenu.setScale(.1);

    this.btnMenu.setInteractive();
    

    this.btnMenu.on("pointerover", function() {
      this.btnMenu.setTexture("sprBtnMenuHover");
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnMenu.on("pointerout", function() {
      this.setTexture("sprBtnMenu");
    });

    this.btnMenu.on("pointerdown", function() {
      this.btnMenu.setTexture("sprBtnMenuDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnMenu.on("pointerup", function() {
      this.btnMenu.setTexture("sprBtnMenu");
      this.scene.start("SceneMainMenu");
    }, this);

    this.subtitle = this.add.text(this.game.config.width * 0.5, 128, "Story", {
      fontFamily:"monospace",
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    
    this.subtitle.setOrigin(0.5);
    this.time.addEvent({
          delay: 1000,
          callback: function() {
            this.scene.start("SceneMain");
            },
          callbackScope: this,
          loop: false
        });
    }
  }

 


