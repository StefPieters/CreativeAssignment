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
    this.musicStory = this.sound.add('StoryMusic', {volume:0.1});
    this.musicStory.play();
    this.bgstory = this.add.image(540,360, "story1")
        this.bgstory.displayWidth = this.sys.canvas.width;
        this.bgstory.displayHeight = this.sys.canvas.height;
    this.bgstory.setInteractive();
    this.btnMenu = this.add.sprite(
      this.game.config.width * 0.1,
      this.game.config.height * 0.05,
      "sprBtnMenu"
    );
    this.btnMenu.setScale(.1);
    this.btnMenu.setInteractive();

    this.btnSkip = this.add.sprite(
      this.game.config.width * 0.9,
      this.game.config.height * 0.05,
      "sprBtnSkip"
    );
    this.btnSkip.setScale(.1);
    this.btnSkip.setInteractive();



    

    
    

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
      this.musicStory.stop();
      this.scene.start("SceneMainMenu");
    }, this);

    this.btnSkip.on("pointerover", function() {
      this.btnSkip.setTexture("sprBtnSkipHover");
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnSkip.on("pointerout", function() {
      this.setTexture("sprBtnSkip");
    });

    this.btnSkip.on("pointerdown", function() {
      this.btnSkip.setTexture("sprBtnSkipDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnSkip.on("pointerup", function() {
      this.btnSkip.setTexture("sprBtnSkip");
      this.musicStory.stop();
      this.scene.start("SceneMain");
    }, this);
    
      this.text = this.add.text(this.game.config.width * 0.5, 580, "It was like they came out of nowhere,", {
        fontFamily: 'monospace',
        fontSize: 24,
        color: '#ffffff',
        align: 'center'
      });
      this.text2 = this.add.text(this.game.config.width * 0.5, 620, "In the beginning you could see a little star in the sky", {
        fontFamily: 'monospace',
        fontSize: 24,
        color: '#ffffff',
        align: 'center'
      });
    this.text.setOrigin(.5);
    this.text2.setOrigin(.5);
    this.time.addEvent({
          delay: 7000,
          callback: function() {
          this.bgstory.setTexture("story2");
          this.text.setText("It grew bigger everyday, It started emitting light,")
          this.text2.setText("Thats when we started to reinforce the city with a wall")

            },
          callbackScope: this,
          loop: false
        });
    this.time.addEvent({
          delay: 15000,
          callback: function() {
          this.bgstory.setTexture("story3");
          this.text.setText("Those are a lot of monsters! Good that we put a wall,")
          this.text2.setText("Help us hero you are the only one that can save our city!")


            },
          callbackScope: this,
          loop: false
        });

    this.time.addEvent({
          delay: 23000,
          callback: function() {
            this.musicStory.stop();
            this.scene.start("SceneMain");
            },
          callbackScope: this,
          loop: false
        });
    }
  }

 


