var game = {
  init: function() {
    // document.getElementById("gamecontainer").style.width = document.body.clientWidth+"px";
    game.canvas = document.getElementById("gamecanvas");
    game.canvas.width = 1120;
    game.canvas.height = 630;
    houses.init();
    loader.init();
    mouse.init();
    game.initCanvases();
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
    var gameContainer = document.getElementById("gamecontainer");
    // gameContainer.style.transform = "translate(-50%, -50%)" + "scale("+scale+")";
    gameContainer.style.width = 640 * scale + "px";
    gameContainer.style.height = 480 * scale + "px";
  },

  loadLevelData: function() {
    game.currentMapImage = loader.loadImage("./images/base-map-tiled-with-grid.png");
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
    game.handlePanning();
    //
    // // Draw the background whenever necessary
    game.drawBackground();

    // Call the drawing loop for the next frame using request animation frame
    if (game.running) {
      requestAnimationFrame(game.drawingLoop);
    }
  },
  drawBackground: function() {
    if (game.refreshBackground) {
      game.backgroundContext.drawImage(game.currentMapImage, game.offsetX, game.offsetY, game.canvasWidth, game.canvasHeight, 0, 0, game.canvasWidth, game.canvasHeight);
      game.refreshBackground = false;
    }
  },
  canvasWidth: 640,
  canvasHeight: 360,
  initCanvases: function() {
    game.backgroundCanvas = document.getElementById("gamebackgroundcanvas");
    game.backgroundContext = game.backgroundCanvas.getContext("2d");

    game.foregroundCanvas = document.getElementById("gameforegroundcanvas");
    game.foregroundContext = game.foregroundCanvas.getContext("2d");

    game.backgroundCanvas.width = game.canvasWidth;
    game.backgroundCanvas.height = game.canvasHeight;

    game.foregroundCanvas.width = game.canvasWidth;
    game.foregroundCanvas.height = game.canvasHeight;
  },
  gridSize: 16,
  offsetX: 100,
  offsetY: 100,
  panningThreshold: 60,
  maximumPanDistance: 5,

  handlePanning: function() {
    if (!mouse.insideCanvas) {
      return;
    }
    if (mouse.x <= game.panningThreshold) {
      let panDistance = game.offsetX;
      if (panDistance > 0) {
        game.offsetX -= Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    } else if (mouse.x >= game.canvasWidth - game.panningThreshold) {
      let panDistance = game.currentMapImage.width - game.offsetX - game.canvasWidth;
      if (panDistance > 0) {
        game.offsetX += Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    }
    if (mouse.y <= game.panningThreshold) {
      let panDistance = game.offsetY;
      if (panDistance > 0) {
        game.offsetY -= Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    } else if (mouse.y >= game.canvasHeight - game.panningThreshold) {
      let panDistance = game.currentMapImage.height - game.offsetY - game.canvasHeight;
      if (panDistance > 0) {
        console.log(panDistance);
        game.offsetY += Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    }
    if (game.refreshBackground){
      mouse.calculateGameCoordinates();
    }

  }

}

// Intialize game once page has fully loaded
window.addEventListener("load", function() {
  game.resize();
  game.init();
});
