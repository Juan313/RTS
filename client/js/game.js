import {loader} from './common.js';
import {houses} from './house.js';
import {mouse} from './mouse.js';
import {buildings} from './entities/buildings/list.js';
import {units} from './entities/units/list.js';
import {initialGameState} from './levels.js';

//load house images when clicking span on start screen
window.onload = ()=> {
    document.getElementById("startSpan").onclick = ()=> {
			houses.loadImages();
		}
}

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

    game.resetArrays();

    buildings['castle'].load();
    units['villager'].load();

    var userGameSetup = initialGameState[game.userHouse];

    userGameSetup.forEach(function(entity){
      Object.assign(entity, {"team": parseInt(game.userHouse)});
      if (entity['type'] == 'buildings')
        var newEntity = buildings[entity.name].add(entity);
      if (entity['type'] == 'units')
        var newEntity = units[entity.name].add(entity);

      Object.assign(newEntity, {"uid": ++game.counter});

      //console.log(newEntity);
      game.items.push(newEntity);
      game[newEntity.type].push(newEntity);
    })
    var AIGameSetup = initialGameState[game.AIHouse];

    AIGameSetup.forEach(function(entity){
      Object.assign(entity, {"team": parseInt(game.AIHouse)});
      if (entity['type'] == 'buildings')
        var newEntity = buildings[entity.name].add(entity);
      if (entity['type'] == 'units')
        var newEntity = units[entity.name].add(entity);
      Object.assign(newEntity, {"uid": ++game.counter});
      game.items.push(newEntity);
      game[newEntity.type].push(newEntity);

    })
    // console.log(game.items);
    //console.log(game.buildings);
  },

  animationTimeout: 100, // 100 milliseconds or 10 times a second

  animationLoop: function() {
    game.items.forEach(function(item) {
            item.animate();
        });

        // Sort game items into a sortedItems array based on their x,y coordinates
        game.sortedItems = Object.assign([], game.items);
        game.sortedItems.sort(function(a, b) {
            return a.y - b.y + ((a.y === b.y) ? (b.x - a.x) : 0);
        });
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

    // Clear the foreground canvas
    game.foregroundContext.clearRect(0, 0, game.canvasWidth, game.canvasHeight);

    //Start drawing the foreground elements
    game.sortedItems.forEach(function(item) {
      if (item["name"] == "castle"){
        //console.log(item.spriteSheet);
        item.draw();
      }
      if (item["name"] == "villager"){
        //console.log(item.spriteSheet);
        item.draw();
      }
    });

    // Draw the mouse
    mouse.draw();

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
        // console.log(panDistance);
        game.offsetY += Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    }
    if (game.refreshBackground){
      mouse.calculateGameCoordinates();
    }

  },
  resetArrays: function() {
        // Count items added in game, to assign them a unique id
        game.counter = 0;

        // Track all the items currently in the game
        game.items = [];
        game.buildings = [];
        game.units = [];

        // Track items that have been selected by the player
        game.selectedItems = [];
    },
    clearSelection: function() {
        while (game.selectedItems.length > 0) {
            game.selectedItems.pop().selected = false;
        }
    },
    selectItem: function(item, shiftPressed) {
        // Pressing shift and clicking on a selected item will deselect it
        if (shiftPressed && item.selected) {
            // Deselect item
            item.selected = false;

            for (let i = game.selectedItems.length - 1; i >= 0; i--) {
                if (game.selectedItems[i].uid === item.uid) {
                    game.selectedItems.splice(i, 1);
                    break;
                }
            }

            return;
        }

        if (item.selectable && !item.selected) {
            item.selected = true;
            game.selectedItems.push(item);
            // console.log(game.selectedItems);
        }
    },
    sendCommand: function(uids, details){
      var toObject;
      if (details.toUid){
        toObject = game.getItemByUid(details.toUid);
        if (!toObject || toObject.lifeCode == "dead"){
          return;
        }
      }
      uids.forEach(function(id){
        let item = game.getItemByUid(id);
        // console.log(item);
        if (item && item.lifeCode != "dead"){
          item.orders = Object.assign({}, details);
          //console.log(details);
          if (toObject)
            item.orders.to = toObject;
        }
      });
    },

    getItemByUid: function(uid){
      for (let i = 0; i< game.items.length; i++){
        if (game.items[i].uid == uid)
          return game.items[i];
      }
    },




}

// Intialize game once page has fully loaded
window.addEventListener("load", function() {
  game.resize();
  game.init();
});

export {game};
