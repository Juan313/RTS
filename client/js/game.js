export default var game = {
  init: function() {
    // document.getElementById("gamecontainer").style.width = document.body.clientWidth+"px";
    game.canvas = document.getElementById("gamecanvas");
    game.canvas.width = 1120;
    game.canvas.height = 630;
    houses.init();
    loader.init();
    this.hideScreens();
    // this.showScreen("gamestartscreen");
    this.showScreen("gamestartscreen"); 

  },
  hideScreens: function() {
    var screens = document.getElementsByClassName("gamelayer");
    for (var i = 0; i < screens.length; i++) {
      screens[i].style.display = "none";
    }
  },
  hideScreen: function(id) {
    var screen = document.getElementById(id);

    screen.style.display = "none";
  },

  showScreen: function(id) {
    var screen = document.getElementById(id);
    screen.style.display = "block";
  },

  showSelectHouse: function() {
    this.hideScreens();
    this.showScreen("selectHouseScreen");
  },

  resize: function() {
    var maxWidth = Math.min(window.innerWidth, 1024);
    var maxHeight = window.innerHeight;

    var scale = Math.max(Math.min(maxWidth / 640, maxHeight / 480), 1);
    game.scale = scale;
    console.log(game.scale);
    var gameContainer = document.getElementById("gamecontainer");
    gameContainer.style.width = 640 * scale + "px";
    gameContainer.style.height = 480 * scale + "px";
  },

  loadLevelData: function() {
    game.currentMapImage = loader.loadImage("./images/world_map_wallpaper.png");
  },

  animationTimeout: 100, // 100 milliseconds or 10 times a second

  animationLoop: function() {

  },

  play: function() {
    game.animationLoop();
    // Start the animation loop interval
    game.animationInterval = setInterval(game.animationLoop, game.animationTimeout);

    game.start();
  },

  start: function() {
    game.hideScreens();
    game.showScreen("gameinterfacescreen");

    game.running = true;
    game.refreshBackground = true;
    game.canvasResized = true;

    game.drawingLoop();
  },

  drawingLoop: function() {
    // Pan the map if the cursor is near the edge of the canvas
    // game.handlePanning();
    //
    // // Draw the background whenever necessary
    game.drawBackground();

    // Call the drawing loop for the next frame using request animation frame
    if (game.running) {
      requestAnimationFrame(game.drawingLoop);
    }
  },
  drawBackground: function(){
    // game.backgroundContext.drawImage(game.currentMapImage, game.offsetX, game.offsetY, game.canvasWidth, game.canvasHeight, 0, 0, game.canvasWidth, game.canvasHeight);
  }

}

// Intialize game once page has fully loaded
window.addEventListener("load", function() {
  game.resize();
  game.init();
});
