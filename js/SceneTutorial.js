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

    this.subtitle = this.add.text(this.game.config.width * 0.5, 128, "Tutorial", {
      fontFamily:"monospace",
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    
    this.text1 = this.add.text(this.game.config.width * 0.5, 200, "Move with LEFT and RIGHT for turret", {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.text2 = this.add.text(this.game.config.width * 0.5, 300, "Move with Q and D for shield", {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.text3 = this.add.text(this.game.config.width * 0.5, 400, "Spacebar to shoot", {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.text1.setOrigin(.5);
    this.text2.setOrigin(.5);
    this.text3.setOrigin(.5);
    this.subtitle.setOrigin(0.5);
    }
  }

 


