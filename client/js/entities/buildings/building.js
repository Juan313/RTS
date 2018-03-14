//shared entity class defintion file
import Entity from '../entity.js';
import {
  units
} from '../units/list.js';
import {
  game
} from '../../game.js';

export default class Building extends Entity {
  /*	Additional parameters:
   *	baseWidth, baseHeight - rectangluar area of building relative to map size
   *	buildableGrid, passableGrid - grid spaces on map for pathfinding */
  constructor(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, buildableGrid, passableGrid, baseWidth, baseHeight) {
    super(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, sight, hitPoints, cost, spriteImages, defaults);
    //set the list of buildable units based on each units builtFrom property
    this.unitList = [];
    //add all the units that the building can build to its unit list
    for (let unit in units) {
      if (units.hasOwnProperty(unit)) {
        if (units[unit].builtFrom === this.name) {
          this.unitList.push(units[unit]);
        }
      }
    }
    this.defaults.unitList = this.unitList;
    //set default building specific properties
    this.defaults.type = 'buildings';
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
    this.buildableGrid = buildableGrid;
    this.passableGrid = passableGrid;
    this.imageOffset = 0;
    this.animationIndex = 0;
  }
  //construct a given unit and return it
  construct(unit) {
    constructedUnit = unit.create();
    return constructedUnit;
  }

  //default drawSprite for buildings
  drawSprite() {
    let x = this.drawingX;
    let y = this.drawingY;
    let colorIndex = 0;
    let colorOffset = colorIndex * this.pixelHeight;
    this.imageOffset = 0;
    game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight);
  }

  processOrders() {
    if (this.reloadTimeLeft == undefined){
      this.reloadTimeLeft = this.buildTime;
    }
    switch (this.orders.type) {
      case "construct-unit":
        if (this.lifeCode !== "alive") {
          // If the building isn't healthy, ignore the order
          this.orders = {
            type: "stand"
          };
          break;
        }

        var unitOnTop = this.isUnitOnTop();
        var cash = game.economy[this.team].wheat;
        var cost = this.orders.details.cost;

        if (unitOnTop) {
          // Check whether there is a unit standing on top of the building
          if (this.team == game.userHouse) {
            // console.log("Warning! Cannot build unit while " + this.name + " is occupied.");
            game.showMessage("system", "Warning! Cannot build " +this.orders.details.name +" while " + this.name +" is occupied.");

          }

        } else if (cash < cost) {
          // Check whether player has insufficient cash
          if (this.team == game.userHouse) {
            // console.log("Warning! Insufficient Funds. Need " + cost + " wheat.");
            game.showMessage("system", "Warning! Insufficient Funds. Need " + cost + " wheat.");
          }
        } else {
          if (this.reloadTimeLeft > 0){
            this.reloadTimeLeft--;
            break;
          } else {
            this.reloadTimeLeft = undefined;
            let itemDetails = units[this.orders.details.name].add();

            // let itemDetails = Object.assign({}, this.orders.details);

            // Position new unit above center of starport
            itemDetails.x = this.x + 0.5 * this.pixelWidth / game.gridSize;
            itemDetails.y = this.y + 1 * this.pixelHeight / game.gridSize;

            // Subtract the cost from player cash
            game.economy[this.team].wheat -= cost;

            // Set unit to be teleported in once it is constructed
            itemDetails.action = "stand";
            itemDetails.team = this.team;
            // console.log(itemDetails);
            game.add(itemDetails);
            console.log("building!!!!!");
            // itemDetails = undefined;
          }

        }

        this.orders = {
          type: "stand"
        };

        break;
      case "construct-building":
        if (this.lifeCode !== "alive") {
          // If the building isn't healthy, ignore the order
          this.orders = {
            type: "stand"
          };
          break;
        }

        // Teleport in building and subtract the cost from player cash
        var itemDetails = this.orders.details;

        var cash = game.economy[this.team].timber;
        var cost = this.orders.details.cost;
        // console.log(game.economy[this.team]);

        if (cash < cost){
          if (this.team == game.userHouse) {
            // console.log("Warning! Cannot build unit while " + this.name + " is occupied.");
            game.showMessage("system", "Warning! Insufficient Funds. Need " + cost + " timber.");

          }
        } else {
          itemDetails.team = this.team;
          itemDetails.action = "stand";

          var item = game.add(itemDetails);
          game.economy[this.team].timber -= item.cost;
          this.orders = {
            type: "stand"
          };
        }
        // console.log(game.economy[this.team]);

        break;
    }
  }
  isUnitOnTop() {
    let unitOnTop = false;

    for (let i = game.items.length - 1; i >= 0; i--) {
      let item = game.items[i];

      if (item.name === this.orders.details.name) {
        if (item.x == this.x + 0.5 * this.pixelWidth / game.gridSize &&
          item.y == this.y + 1 * this.pixelHeight / game.gridSize) {
          unitOnTop = true;
          break;
        }
      }
    }

    return unitOnTop;
  }

}
