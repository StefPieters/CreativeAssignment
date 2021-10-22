var config = {
  type: Phaser.WEBGL,
  width: 1080,
  height: 720,
  backgroundColor: "black",
  autoCenter: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver,
    SceneGameWon
  ],
  pixelArt: true,
  roundPixels: true
};

var game = new Phaser.Game(config);