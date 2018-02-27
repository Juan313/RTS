import {
  game
} from './game.js';
import {
  buildings
} from './entities/buildings/list.js';
import {
  units
} from './entities/units/list.js';
import {
  requirements
} from './requirements.js';
import {
  mouse
} from './mouse.js';

var selectedSpecialIds = [];
var activatedSpecialIds = [];
var changedSpecial = false;

var resourcebar = {
  init: function() {
    this.wheat = document.getElementById("wheat");
    this.timber = document.getElementById("timber");
    let buttons = document.getElementById("buildOption").getElementsByTagName("input");
    Array.prototype.forEach.call(buttons, function(button) {
      button.addEventListener("click", function() {
        // The input button id is the name of the object that needs to be constructed
        let name = this.id;
        let details = resourcebar.constructables[name];
        if (details.type === "buildings") {
          resourcebar.constructBuildings(details);
        } else {
          resourcebar.constructUnits(details);
        }
      });
    });
  },

  animate: function() {
    // Display the current cash balance value
    this.updateResource(game.economy[game.userHouse]);
    this.displaySpecialInfo();
    this.enableButtons();

    if (this.deployBuilding) {
      this.checkBuildingPlacement();
    }
  },
  //add special unit buttons and text to the resource bar when they are selected
  displaySpecialInfo: function() {
    //When a user selects a special item add it to the selectedSpecialIds array or remove it when it is no longer selected
    if (game.sortedItems) {
      game.sortedItems.forEach(function(item) {
        if (item.special && item.team == game.userHouse) {
          if (item.selected) {
            if (!selectedSpecialIds.includes(item.uid)) {
              changedSpecial = true;
              selectedSpecialIds.push(item.uid);
            }
          } else {
            selectedSpecialIds.forEach(function(id, index) {
              if (id === item.uid) {
                changedSpecial = true;
                selectedSpecialIds.splice(index, 1);
              }
            });
          }
        }
      });
    }
    activatedSpecialIds.forEach(function(id, index) {
      let item = game.getItemByUid(id);
      if (item.special.ready) {
        changedSpecial = true;
        activatedSpecialIds.splice(index, 1);
      }
    });
    if (changedSpecial) {
      let specialContainer = document.getElementById('specialContainer');
      specialContainer.innerHTML = '';
      //for each selected special include its description and a button to activate it if the special is active
      selectedSpecialIds.forEach(function(id) {
        let item = game.getItemByUid(id);
        let specialItem = document.createElement('div');
        let specialInfo = item.name + ' ' + item.uid + ': ' + item.special.description;
        let specialText = document.createTextNode(specialInfo);
        specialItem.appendChild(specialText);
        if (item.special.type === 'active') {
          let specialButton = document.createElement('button');
          let buttonText = document.createTextNode('Activate');
          specialButton.appendChild(buttonText);
          if (item.special.ready) {
            specialButton.addEventListener('click', function(event) {
              changedSpecial = true;
              event.preventDefault();
              item.special.action(item);
            });
          } else {
            specialButton.disabled = true;
            activatedSpecialIds.push(item.uid);
          }
          specialButton.style.position = 'relative';
          specialItem.appendChild(specialButton);
        }
        specialContainer.appendChild(specialItem);
      });
      changedSpecial = false;
    }
  },
  _resource: undefined,
  updateResource: function(r) {

    if (this.resource != r) {
      this._resource = r;
      this.wheat.innerHTML = "W: " + Math.floor(r.wheat).toLocaleString();
      this.timber.innerHTML = "T: " + Math.floor(r.timber).toLocaleString();
    }

  },
  constructables: undefined,

  initRequirementsForLevel: function() {
    this.constructables = {};

    let constructableTypes = [buildings, units];

    constructableTypes.forEach(function(type) {
      for (var name in type) {
        let details = type[name];
        let typeName = details.type;
        let isInRequirements = requirements[game.userHouse][typeName].indexOf(name) > -1;
        resourcebar.constructables[name] = {
          name: name,
          type: typeName,
          permitted: isInRequirements,
          cost: details.cost,
          constructedIn: resourcebar.builtFrom(name)
        };
        if (!isInRequirements) {
          let button = document.getElementById(name);
          button.style.display = "none";
        }

      }

    });
  },
  builtFrom: function(name) {
    switch (name) {
      case "barrack":
        return "castle"
        break;
      case "stable":
        return "castle"
        break;
      case "dock":
        return "castle"
        break;
      case "villager":
        return "castle"
        break;
      case "militia":
        return "barrack"
        break;
      case "knight":
        return "stable"
        break;
      case "warship":
        return "dock"
        break;
      case "direwolf":
        return "stable"
        break;
      default:
        return ""
    }
  },
  constructBuildings: function(details) {
    resourcebar.deployBuilding = details;
    console.log("construction building " + details.name);
  },

  constructUnits: function(details) {
    console.log("construction units " + details.name);
    let buildingEntity;

    for (let i = game.selectedItems.length - 1; i >= 0; i--) {
      let item = game.selectedItems[i];

      if (item.type === "buildings" && item.team == game.userHouse &&
        item.lifeCode === "alive" && item.action === "stand") {

        buildingEntity = item;
        break;
      }
    }


    // If an eligible starport is found, tell it to make the unit
    if (buildingEntity) {
      game.sendCommand([buildingEntity.uid], {
        type: "construct-unit",
        details: details
      });
    }
  },
  enableButtons: function() {
    let economy = game.economy[game.userHouse];

    for (let name in this.constructables) {
      let item = this.constructables[name];
      if (item.permitted) {
        let sufficientMoney = false;
        let correctBuilding = false;

        let button = document.getElementById(name);

        if (item.type === "buildings")
          sufficientMoney = economy.timber >= item.cost;
        if (item.type === "units")
          sufficientMoney = economy.wheat >= item.cost;
        if ((game.selectedItems.length == 1) && (game.selectedItems[0].lifeCode === "alive") && (game.selectedItems[0].name === item.constructedIn))
          correctBuilding = true;

        button.disabled = !(sufficientMoney && correctBuilding);
      }
    }
  },

  checkBuildingPlacement: function() {

    let name = resourcebar.deployBuilding.name;
    let details = buildings[name].add();

    // Create a buildable grid to identify where building can be placed
    game.rebuildBuildableGrid();

    // Use buildableGrid to identify whether we can place the building
    let canDeployBuilding = true;
    let placementGrid = game.makeArrayCopy(details.buildableGrid);

    for (let y = placementGrid.length - 1; y >= 0; y--) {
      for (let x = placementGrid[y].length - 1; x >= 0; x--) {

        // If a tile needs to be buildable for the building
        if (placementGrid[y][x] === 1) {
          // Check whether the tile is inside the map and buildable
          if (mouse.gridY + y >= game.currentMap.mapGridHeight ||
            mouse.gridX + x >= game.currentMap.mapGridWidth ||
            game.currentMapBuildableGrid[mouse.gridY + y][mouse.gridX + x]) {
            // Otherwise mark tile as unbuildable
            canDeployBuilding = false;
            placementGrid[y][x] = 2;
          }
        }
      }
    }

    resourcebar.placementGrid = placementGrid;
    resourcebar.canDeployBuilding = canDeployBuilding;

  },

  cancelDeployingBuilding: function() {
        resourcebar.deployBuilding = undefined;
        resourcebar.placementGrid = undefined;
        resourcebar.canDeployBuilding = false;
    },

    finishDeployingBuilding: function() {
        // Search for a selected base which can construct the unit
        let base;

        for (let i = game.selectedItems.length - 1; i >= 0; i--) {
            let item = game.selectedItems[i];


            if (item.name === "castle" && item.team == game.userHouse
                && item.lifeCode === "alive" && item.action === "stand") {

                base = item;
                break;
            }
        }

        // If an eligible base is found, tell it to make the unit
        if (base) {
            let name = resourcebar.deployBuilding.name;
            let details = buildings[name].add();
            details.x = mouse.gridX;
            details.y = mouse.gridY;
            details.team = parseInt(game.userHouse);
            // let details = {
            //     name: name,
            //     type: "buildings",
            //     x:
            //     y: mouse.gridY
            // };
            console.log(details);
            game.sendCommand([base.uid], { type: "construct-building", details: details });
        }

        // Clear deploy building variables
        resourcebar.cancelDeployingBuilding();

    },
}
export {
  resourcebar
};
