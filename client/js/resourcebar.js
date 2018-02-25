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
    this.enableButtons();
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
        if (!isInRequirements){
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
        console.log("construction building " + details.name);
    },

  constructUnits: function(details) {
        console.log("construction units " + details.name);
    },
  enableButtons: function() {
        let economy = game.economy[game.userHouse];

        for (let name in this.constructables) {
            let item = this.constructables[name];
            if (item.permitted){
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
}
export {
  resourcebar
};
