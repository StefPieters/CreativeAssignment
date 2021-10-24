class SceneTutorial extends Phaser.Scene {
    constructor() {
      super({ key: "SceneTutorial" });
    }
    preload(){
    }

    create() {
    this.bgMenu = this.add.image(540,250, "MenuBackground")
        this.bgMenu.displayWidth = this.sys.canvas.width;
        this.bgMenu.displayHeight = 1100;
    this.instructions = this.add.image(600,370, "instructions");
    this.instructions.setOrigin(0.5);
    
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver", {volume:0.2}),
      btnDown: this.sound.add("sndBtnDown", {volume:0.2})
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

    this.subtitle = this.add.text(this.game.config.width * 0.5, 128, "Instructions", {
      fontFamily:"monospace",
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    
    this.text1 = this.add.text(80, 700, "Made by Stef", {
      fontFamily: 'monospace',
      fontSize: 18,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    
    this.text1.setOrigin(.5);
    this.subtitle.setOrigin(0.5);
    }
  }

 


