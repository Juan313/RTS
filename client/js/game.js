import {
  loader
} from './common.js';
import {
  houses
} from './house.js';
import {
  mouse
} from './mouse.js';
import {
  buildings
} from './entities/buildings/list.js';
import {
  units
} from './entities/units/list.js';
import {
  terrains
} from './entities/terrains/list.js';
import {
  weapons
} from './entities/weapons/list.js';
import {
  initialGameState
} from './levels.js';
import {
  triggers
} from './triggers.js';
import {
  map
} from './map.js'
import {
  resourcebar
} from './resourcebar.js'

//Set click handlers for spans and buttons
window.onload = () => {
  document.getElementById("startSpan").onclick = () => {
    document.getElementById("saveGame").style.display = "none";
    houses.loadImages();
  }
  document.getElementById("loginSpan").onclick = () => {
    let myUserName = document.getElementById("userName").value;
    let myPassword = document.getElementById("password").value;
    let infoSpan = document.getElementById("infoSpan");
    if (myUserName && myPassword) {
      fetch('/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: myUserName,
          password: myPassword
        })
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            if (data.badPassword) {
              infoSpan.innerHTML = ('Error: the password you entered for this account is incorrect, please try again.');
            } else {
              infoSpan.innerHTML = '';
              game.userName = myUserName;
              game.password = myPassword;
              if (data.newAccount) {
                infoSpan.innerHTML = 'No game save found for the account username,' +
                  ' creating a new account and game with your username and password.';
                setTimeout(() => {
                  infoSpan.innerHTML = '';
                  houses.loadImages();
                }, 5000);
              } else {
                game.load(game.userName, game.password);
              }
            }
          });
        }
      });
    } else {
      infoSpan.innerHTML = 'Error: to login or create a new account please fill out a username and password.';
    }
  }
  document.getElementById("saveGame").addEventListener("click", (e) => {
    e.preventDefault();
    game.save(game.userName, game.password);
  });

  document.getElementById("quitGame").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.reload(true);
  });
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
    this.showScreen("gamestartscreen");
    // var okButton = document.getElementById("messageboxok");
    // var cancelButton = document.getElementById("messageboxcancel");
    // okButton.addEventListener("click", game.messageBoxOK());
    // cancelButton.addEventListener("click", game.messageBoxCancel());
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
      timber: 1100,
    },
    "1": {
      wheat: 5000,
      timber: 5100,
    },
    "2": {
      wheat: 2000,
      timber: 2100,
    },
    "3": {
      wheat: 3000,
      timber: 3100,
    },
    "4": {
      wheat: 4000,
      timber: 4100,
    },
  },

  showScreen: function(id) {
    var screen = document.getElementById(id);
    screen.style.display = "block";
  },

  showSelectDifficulty: function() {
    this.hideScreens();
    this.showScreen("selectDifficultyScreen");
  },

  setDifficulty: function(d) {
    if (d === 'hard') {
      game.difficulty = 'hard';
    } else {
      game.difficulty = 'easy';
    }
    this.showSelectHouse();
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
    game.currentMapImage = loader.loadImage("./images/" + map['plains']['mapImage']);
    game.currentMap = map['plains'];

    game.resetArrays();

    //load villager sprites and castle sprites
    buildings['castle'].load();
    buildings['barrack'].load();
    buildings['stable'].load();

    units['villager'].load();
    units['militia'].load();
    units['knight'].load();

    terrains['field'].load();
    terrains['forest'].load();
    //load special units
    units['direwolf'].load();
    units['melisandre'].load();
    units['dragon'].load();

    weapons['fireball'].load();
    weapons['cannonball'].load();
    weapons['sword'].load();
    weapons['teeth'].load();

    game.economy = Object.assign({}, this.inventory);

    var terrainSetup = initialGameState["terrains"];
    let newEntity = null
    terrainSetup.forEach(function(entity) {
      newEntity = terrains[entity.name].add(entity);
      Object.assign(newEntity, {
        "uid": ++game.counter
      });
      game.items.push(newEntity);
      game[newEntity.type].push(newEntity);
    })

    var userGameSetup = initialGameState[game.userHouse];
    userGameSetup.forEach(function(entity) {
      Object.assign(entity, {
        "team": parseInt(game.userHouse)
      });
      if (entity['type'] === 'buildings') {
        if (entity['name'] === 'castle') {
          entity.x = 65;
          entity.y = 7;
        }
        newEntity = buildings[entity.name].add(entity);
      } else if (entity['type'] === 'units') {
        if (entity['name'] === 'villager') {
          entity.x = 68;
          entity.y = 12;
        }
        newEntity = units[entity.name].add(entity);
      }

      Object.assign(newEntity, {
        "uid": ++game.counter
      });
      game.items.push(newEntity);
      game[newEntity.type].push(newEntity);
    });

    var AIGameSetup = initialGameState[game.AIHouse];
    AIGameSetup.forEach(function(entity) {
      Object.assign(entity, {
        "team": parseInt(game.AIHouse)
      });
      if (entity['type'] == 'buildings') {
        if (entity['name'] === 'castle') {
          entity.x = 13;
          entity.y = 45;
        }
        newEntity = buildings[entity.name].add(entity);
        //newEntity = buildings[entity.name];
      } else {
        if (entity['name'] === 'villager') {
          entity.x = 15;
          entity.y = 43;
        }
        newEntity = units[entity.name].add(entity);
        //newEntity = units[entity.name];
      }
      Object.assign(newEntity, {
        "uid": ++game.counter
      });
      game.items.push(newEntity);
      game[newEntity.type].push(newEntity);
    });
    //console.log(game["units"]);
    resourcebar.initRequirementsForLevel();
    game.createTerrainGrid();
    game.rebuildPassableGrid();
  },

  animationTimeout: 100, // 100 milliseconds or 10 times a second

  animationLoop: function() {
    resourcebar.animate();
    // console.log(game.economy[game.userHouse]);
    game.items.forEach(function(item) {
      if (item.processOrders) {
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

    let gamemessages = document.getElementById("gamemessages");

    gamemessages.innerHTML = "";

    triggers.forEach(function(trigger) {
      game.initTrigger(trigger);
    });
  },

  drawingLoop: function() {
    // Pan the map if the cursor is near the edge of the canvas
    game.handlePanning();

    // // Draw the background whenever necessary
    game.drawBackground();

    // Clear the foreground canvas
    game.foregroundContext.clearRect(0, 0, game.canvasWidth, game.canvasHeight);

    //Start drawing the foreground elements
    game.sortedItems.forEach(function(item) {
      // if (item.name == "villager" || item.name == 'castle'){
      //   item.draw();
      // }
      item.draw();
      //perform passive special unit actions
      if (item.special && item.special.type === 'passive') {
        item.special.action(item);
      }
    });
    game.weapons.forEach(function(weapon) {
      if (weapon.action == "explode") {
        weapon.draw();
      }
    })
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

    if (mouse.x <= game.panningThreshold && mouse.pannable) {
      let panDistance = game.offsetX;
      if (panDistance > 0) {
        game.offsetX -= Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    } else if ((mouse.x >= game.canvasWidth - game.panningThreshold) && mouse.pannable) {
      let panDistance = game.currentMapImage.width - game.offsetX - game.canvasWidth;
      if (panDistance > 0) {
        game.offsetX += Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    }
    if (mouse.y <= game.panningThreshold && mouse.pannable) {
      let panDistance = game.offsetY;
      if (panDistance > 0) {
        game.offsetY -= Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    } else if ((mouse.y >= game.canvasHeight - game.panningThreshold) && mouse.pannable) {
      let panDistance = game.currentMapImage.height - game.offsetY - game.canvasHeight;
      if (panDistance > 0) {
        // console.log(panDistance);
        game.offsetY += Math.min(game.maximumPanDistance, panDistance);
        game.refreshBackground = true;
      }
    }
    if (game.refreshBackground) {
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
    game.terrains = [];

    // Track items that have been selected by the player
    game.selectedItems = [];
    game.weapons = [];

    game.AICastleAlive = true;
    game.userCastleAlive = true;
  },
  add: function(itemDetails) {
    // Set a unique id for the item
    // if (!itemDetails.uid) {
    //     itemDetails.uid = ++game.counter;
    //     console.log(game.counter);
    // }
    itemDetails.uid = ++game.counter;


    // Add the item to the items array
    game.items.push(itemDetails);

    // Add the item to the type specific array
    game[itemDetails.type].push(itemDetails);

    // Reset currentMapPassableGrid whenever the map changes
    if (itemDetails.type === "buildings") {
      game.currentMapPassableGrid = undefined;
    }

    return itemDetails;

  },
  remove: function(item) {
    item.selected = false;
    for (let i = game.selectedItems.length - 1; i >= 0; i--) {
      if (game.selectedItems[i].uid === item.uid) {
        game.selectedItems.splice(i, 1);
        break;
      }
    }

    // Remove item from the items array
    for (let i = game.items.length - 1; i >= 0; i--) {
      if (game.items[i].uid === item.uid) {
        game.items.splice(i, 1);
        break;
      }
    }

    // Remove items from the type specific array
    for (let i = game[item.type].length - 1; i >= 0; i--) {
      if (game[item.type][i].uid === item.uid) {
        game[item.type].splice(i, 1);
        break;
      }
    }

    // Reset currentMapPassableGrid whenever the map changes
    if (item.type === "buildings" || item.type === "terrain") {
      game.currentMapPassableGrid = undefined;
    }
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
  sendCommand: function(uids, details) {

    var toObject;
    if (details.toUid) {
      toObject = game.getItemByUid(details.toUid);
      if (!toObject || toObject.lifeCode == "dead") {
        return;
      }
    }
    uids.forEach(function(id) {
      let item = game.getItemByUid(id);
      if (item && item.lifeCode != "dead") {
        item.orders = Object.assign({}, details);
        //console.log(details);
        if (toObject)
          item.orders.to = toObject;
      }
    });
    // console.log(details);
  },

  getItemByUid: function(uid) {
    for (let i = 0; i < game.items.length; i++) {
      if (game.items[i].uid == uid)
        return game.items[i];
    }
  },

  createTerrainGrid: function() {
    let map = game.currentMap;
    game.currentMapTerrainGrid = new Array(map.mapGridHeight);
    var row = new Array(map.mapGridWidth);
    for (let i = 0; i < map.mapGridWidth; i++) {
      row[i] = 0;
    }

    for (let i = 0; i < map.mapGridHeight; i++) {
      game.currentMapTerrainGrid[i] = row.slice(0);
    }
    map.mapObstructedTerrain.forEach(function(ob) {
      game.currentMapTerrainGrid[ob[1]][ob[0]] = 1;
    });

    game.currentMapPassableGrid = undefined;
    // console.log(game.currentMapTerrainGrid);
  },

  rebuildPassableGrid: function() {
    game.currentMapPassableGrid = game.makeArrayCopy(game.currentMapTerrainGrid);
    //console.log(game.currentMapPassableGrid);
    for (let i = game.items.length - 1; i >= 0; i--) {
      var item = game.items[i];
      // if (item.type == "buildings" || item.type == "terrains") {
      if (item.type == "buildings") {

        for (let y = item.passableGrid.length - 1; y >= 0; y--) {
          for (let x = item.passableGrid[y].length - 1; x >= 0; x--) {
            if (item.passableGrid[y][x]) {
              game.currentMapPassableGrid[item.y + y][item.x + x] = 1;
            }
          }
        }
      }
    };
    //console.log(game.currentMapPassableGrid);
  },

  makeArrayCopy: function(oldArray) {
    let newArray = new Array(oldArray.length);
    for (let y = 0; y < oldArray.length; y++) {
      newArray[y] = oldArray[y].slice(0);
    }
    return newArray;
  },

  rebuildBuildableGrid: function() {
    game.currentMapBuildableGrid = game.makeArrayCopy(game.currentMapTerrainGrid);

    game.items.forEach(function(item) {

      // if (item.type === "buildings" || item.type === "terrains") {
      if (item.type === "buildings") {

        // Mark all squares that the building uses as unbuildable
        for (let y = item.buildableGrid.length - 1; y >= 0; y--) {
          for (let x = item.buildableGrid[y].length - 1; x >= 0; x--) {
            if (item.buildableGrid[y][x]) {
              game.currentMapBuildableGrid[item.y + y][item.x + x] = 1;
            }
          }
        }
      } else if (item.type === "units") {
        // Mark all squares under or near the vehicle as unbuildable
        let radius = item.radius / game.gridSize;
        let x1 = Math.max(Math.floor(item.x - radius), 0);
        let x2 = Math.min(Math.floor(item.x + radius), game.currentMap.mapGridWidth - 1);
        let y1 = Math.max(Math.floor(item.y - radius), 0);
        let y2 = Math.min(Math.floor(item.y + radius), game.currentMap.mapGridHeight - 1);

        for (let x = x1; x <= x2; x++) {
          for (let y = y1; y <= y2; y++) {
            game.currentMapBuildableGrid[y][x] = 1;
          }
        }
      }

    });
  },

  showMessage: function(from, message) {
    let gamemessages = document.getElementById("gamemessages");

    let messageHTML = "<span>" + from + ": </span>" + message + "<br>";
    gamemessages.innerHTML = messageHTML;
    setTimeout(function() {
      gamemessages.innerHTML = "";
    }, 5000);
  },

  messageBoxOKCallback: undefined,
  messageBoxCancelCallback: undefined,
  showMessageBox: function(message, onOK, onCancel) {
    let messageBoxText = document.getElementById("messageboxtext");
    messageBoxText.innerHTML = message.replace(/\n/g, "<br><br>");

    if (typeof onOK === "function") {
      game.messageBoxOKCallback = onOK;
    } else {
      game.messageBoxOKCallback = undefined;
    }

    let cancelButton = document.getElementById("messageboxcancel");

    if (typeof onCancel === "function") {
      game.messageBoxCancelCallback = onCancel;
      cancelButton.style.display = "";
    } else {
      game.messageBoxCancelCallback = undefined;
      cancelButton.style.display = "none";
    }
    game.showScreen("messageboxscreen");
  },

  messageBoxOK: function() {
    game.hideScreen("messageboxscreen");
    if (typeof game.messageBoxOKCallback === "function") {
      game.messageBoxOKCallback();
    }
  },

  messageBoxCancel: function() {

    game.hideScreen("messageboxscreen");
    if (typeof game.messageBoxCancelCallback === "function") {
      game.messageBoxCancelCallback();
    }
  },

  endGame: function(success) {
    clearInterval(game.animationInterval);
    // need to clear trigger!!!!!
    game.running = false;

    if (success) {
      game.showMessageBox("Congratulations! You have won the game.\nThank you for playing!",
        function() {
          game.hideScreens();
          game.showScreen("gamestartscreen");
        });
    } else {
      game.showMessageBox("Sorry, you have lost the game.\nTry again?",
        function() {
          game.hideScreens();
          game.showSelectDifficulty();
        },
        function() {
          game.showScreen("gamestartscreen");
        });
    }
  },

  initTrigger: function(trigger) {
    if (trigger.type === "timed") {
      trigger.timeout = setTimeout(function() {
        game.runTrigger(trigger);
      }, trigger.time);
    } else if (trigger.type === "conditional") {
      trigger.interval = setInterval(function() {
        game.runTrigger(trigger);
      }, 1000);
    }
  },

  runTrigger: function(trigger) {
    if (trigger.type === "timed") {
      // Re initialize the trigger based on repeat settings
      if (trigger.repeat) {
        game.initTrigger(trigger);
      }
      // Call the trigger action
      trigger.action(trigger);
    } else if (trigger.type === "conditional") {
      //Check if the condition has been satisfied
      if (trigger.condition()) {
        // Clear the trigger
        game.clearTrigger(trigger);
        // Call the trigger action
        trigger.action(trigger);
      }
    }
  },

  clearTrigger: function(trigger) {
    if (trigger.timeout !== undefined) {
      clearTimeout(trigger.timeout);
      trigger.timeout = undefined;
    }

    if (trigger.interval !== undefined) {
      clearInterval(trigger.interval);
      trigger.interval = undefined;
    }
  },

  //save the current user's game
  save: function(myUserName, myPassword) {
    fetch('/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: myUserName,
        password: myPassword,
        userHouse: this.userHouse,
        AIHouse: this.AIHouse,
        userWheat: this.inventory[this.userHouse].wheat,
        userTimber: this.inventory[this.userHouse].timber,
        AIWheat: this.inventory[this.AIHouse].wheat,
        AITimber: this.inventory[this.AIHouse].timber,
        sortedItems: this.sortedItems,
        selectedItems: this.selectedItems
      }),
    });
  },

  //load the current user's game
  load: function(myUserName, myPassword) {
    fetch('/load', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: myUserName,
        password: myPassword
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          if (!data.failed) {
            let newItems = [],
              newSortedItems = [],
              newUnits = [],
              newBuildings = [],
              newTerrains = [],
              newWeapons = [],
              newSelectedItems = [];
            //this.resetArrays();
            for (let i = 0; i < data.sortedItems.length; i++) {
              this.counter++;
              let newItem = null;
              if (data.sortedItems[i].type === 'units') {
                newItem = units[data.sortedItems[i].name].add();
                let special = newItem.special;
                Object.assign(newItem, data.sortedItems[i]);
                newItem.special = special ? special : newItem.special;
                newItem.spriteArray = null;
                newItem.load();
                newUnits.push(newItem);
              } else if (data.sortedItems[i].type === 'buildings') {
                newItem = buildings[data.sortedItems[i].name].add();
                Object.assign(newItem, data.sortedItems[i]);
                newItem.spriteArray = null;
                newItem.load();
                newBuildings.push(newItem);
              } else if (data.sortedItems[i].type === 'terrains') {
                newItem = terrains[data.sortedItems[i].name].add();
                Object.assign(newItem, data.sortedItems[i]);
                newItem.spriteArray = null;
                newItem.load();
                newTerrains.push(newItem);
              } else {
                newItem = weapons[data.sortedItems[i].name].add();
                Object.assign(newItem, data.sortedItems[i]);
                newItem.spriteArray = null;
                newItem.load();
                newWeapons.push(newItem);
              }
              if (data.sortedItems[i].selected) {
                newSelectedItems.push(newItem);
              }
              newItems.push(newItem);
              newSortedItems.push(newItem);
            }
            this.userHouse = data.userHouse;
            this.AIHouse = data.AIHouse;
            houses.populateBothHouseScreen(this.userHouse, this.AIHouse);
            this.hideScreens();
            this.showScreen("showSelectedHouses");
            this.loadLevelData();
            this.offsetX = initialGameState[game.userHouse][0].x * game.gridSize - game.canvasWidth / 2;
            this.offsetY = initialGameState[game.userHouse][0].y * game.gridSize - game.canvasHeight / 2;
            this.offsetX = Math.max(0, game.offsetX);
            this.offsetY = Math.max(0, game.offsetY);
            this.offsetX = Math.min(game.currentMap.mapGridWidth * game.gridSize - game.canvasWidth, game.offsetX);
            this.offsetY = Math.min(game.currentMap.mapGridHeight * game.gridSize - game.canvasHeight, game.offsetY);
            setTimeout(() => {
              this.play();
              this.resetArrays();
              this.running = false;
              this.inventory[this.userHouse].wheat = data.userWheat;
              this.inventory[this.userHouse].timber = data.userTimber;
              this.inventory[this.AIHouse].wheat = data.AIWheat;
              this.inventory[this.AIHouse].timber = data.AITimber;
              this.buildings = newBuildings;
              this.units = newUnits;
              this.terrains = newTerrains;
              this.items = newItems;
              this.sortedItems = newSortedItems;
              this.selectedItems = newSelectedItems;
              this.running = true;
            }, 1000);
          }
        });
      }
    });
  },
}

// Intialize game once page has fully loaded
window.addEventListener("load", function() {
  game.resize();
  game.init();
});

export {
  game
};

window.game = game;
