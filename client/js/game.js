import {loader} from './common.js';
import {houses} from './house.js';
import {mouse} from './mouse.js';
import {buildings} from './entities/buildings/list.js';
import {units} from './entities/units/list.js';
import {terrains} from './entities/terrains/list.js';
import {initialGameState} from './levels.js';
import {map} from './map.js'
import {resourcebar} from './resourcebar.js'

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
    resourcebar.init();
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

	//set up AI and player inventory
	inventory: {
		"0": {
			wheat: 1000,
			timber: 1000,
		},
		"1": {
			wheat: 5000,
			timber: 5000,
		},
    "2": {
			wheat: 2000,
			timber: 2000,
		},
    "3": {
			wheat: 3000,
			timber: 3000,
		},
    "4": {
			wheat: 4000,
			timber: 4000,
		},
	},

	// //function to reset player and AI inventories
	// resetInventories: function(){
	// 	inventory.player.wheat = 0;
	// 	inventory.player.timber = 0;
	// 	inventory.AI.wheat = 0;
	// 	inventory.AI.timber = 0;
	// },

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
    game.currentMapImage = loader.loadImage("./images/"+map['plains']['mapImage']);
    game.currentMap = map['plains'];

    game.resetArrays();

    //load villager sprites and castle sprites
    buildings['castle'].load();
    buildings['barrack'].load();
    buildings['stable'].load();

    units['villager'].load();
    units['militia'].load();
    units['knight'].load();

    game.economy = Object.assign({}, this.inventory);

		//load melisandre for testing
		if(game.userHouse === 2){
			units['melisandre'].load();
		}

		//load direwolf for testing
		if(game.userHouse === 0){
			units['direwolf'].load();
		}

    var userGameSetup = initialGameState[game.userHouse];
		let newEntity = null;
    userGameSetup.forEach(function(entity){
      Object.assign(entity, {"team": parseInt(game.userHouse)});
      if(entity['type'] === 'buildings'){
        newEntity = buildings[entity.name].add(entity);
			}else {
        newEntity = units[entity.name].add(entity);
      }

      Object.assign(newEntity, {"uid": ++game.counter});
      game.items.push(newEntity);
      game[newEntity.type].push(newEntity);
    });

    var AIGameSetup = initialGameState[game.AIHouse];
    AIGameSetup.forEach(function(entity){
      Object.assign(entity, {"team": parseInt(game.AIHouse)});
      if(entity['type'] == 'buildings'){
        newEntity = buildings[entity.name].add(entity);
        //newEntity = buildings[entity.name];
			}else {
        newEntity = units[entity.name].add(entity);
        //newEntity = units[entity.name];
      }
      Object.assign(newEntity, {"uid": ++game.counter});
      game.items.push(newEntity);
      game[newEntity.type].push(newEntity);
    });
    //console.log(game["units"]);
    game.createTerrainGrid();
    game.rebuildPassableGrid();
  },

  animationTimeout: 100, // 100 milliseconds or 10 times a second

  animationLoop: function() {
    resourcebar.animate();
    game.items.forEach(function(item){
      if (item.processOrders){
        item.processOrders();
      }
    })
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

    // // Draw the background whenever necessary
    game.drawBackground();

    // Clear the foreground canvas
    game.foregroundContext.clearRect(0, 0, game.canvasWidth, game.canvasHeight);

    //Start drawing the foreground elements
    game.sortedItems.forEach(function(item){
      // if (item.name == "villager" || item.name == 'castle'){
      //   item.draw();
      // }
      item.draw();
			//perform melisandre's aoe heal every frame
			if(item.name === 'melisandre' || item.name === 'direwolf'){
				console.log(item.name);
				item.special.action(item);
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
      // console.log(game.offsetX);
      // console.log(game.offsetY);
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
  // offsetX: 500,
  // offsetY: 500,
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
    add: function(itemDetails){
      // if (type == "building" or "terrain")
      // game.currentMapPassableGrid = undefined;
    },
    remove: function(item){
      // if (type == "building" or "terrain")
      // game.currentMapPassableGrid = undefined;
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

    createTerrainGrid: function(){
      let map = game.currentMap;
      game.currentMapTerrainGrid = new Array(map.mapGridHeight);
      var row = new Array(map.mapGridWidth);
      for (let i = 0; i< map.mapGridWidth; i++){
        row[i] = 0;
      }

      for (let i = 0; i<map.mapGridHeight; i++){
        game.currentMapTerrainGrid[i] = row.slice(0);
      }
      map.mapObstructedTerrain.forEach(function(ob){
        game.currentMapTerrainGrid[ob[1]][ob[0]] = 1;
      });

      game.currentMapPassableGrid = undefined;
      // console.log(game.currentMapTerrainGrid);
    },

    rebuildPassableGrid: function(){
      game.currentMapPassableGrid = game.makeArrayCopy(game.currentMapTerrainGrid);
      //console.log(game.currentMapPassableGrid);
      for (let i = game.items.length-1; i>=0; i--){
        var item = game.items[i];
        if (item.type == "buildings" || item.type == "terrain"){
          for (let y = item.passableGrid.length - 1; y>=0; y--){
            for (let x = item.passableGrid[y].length-1; x>=0; x--){
              if (item.passableGrid[y][x]){
                game.currentMapPassableGrid[item.y+y][item.x+x] = 1;
              }
            }
          }
        }
      };
      //console.log(game.currentMapPassableGrid);
    },

    makeArrayCopy: function(oldArray){
      let newArray = new Array(oldArray.length);
      for (let y = 0; y<oldArray.length; y++){
        newArray[y] = oldArray[y].slice(0);
      }
      return newArray;
    }


}

// Intialize game once page has fully loaded
window.addEventListener("load", function() {
  game.resize();
  game.init();
});

export {game};
