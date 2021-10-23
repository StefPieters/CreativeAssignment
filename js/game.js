let config = {
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
    SceneTutorial,
    SceneGameOver,
    SceneGameWon,
    SceneStory,
  ],
  pixelArt: true,
  roundPixels: true
};

let game = new Phaser.Game(config);