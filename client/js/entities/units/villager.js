//Object defintion for villager unit
import {
  game
} from '../../game.js';

import Unit from './unit.js';
let name = 'villager',
  //pixelWidth = 16,
	pixelWidth = 16,
  pixelHeight = 16,
	//pixelHeight = 20,
  //pixelOffsetX = 0,
	pixelOffsetX = 10,
  //pixelOffsetY = 0,
	pixelOffsetY = 10,
	radius =  8,
  sight = 3,
  hitPoints = 150,
  cost = 50,
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	range = 1,
	moveSpeed = 0.25,
	interactSpeed = 1,
	firePower =  0,
	builtFrom = 'castle',
	weaponType = null,
  defaults = {
    buildTime: 5,
    canAttack: false,
    canMove: true,
    processOrders: function() {
			this.lastMovementX = 0;
			this.lastMovementY = 0;
			if (this.orders.to){
				var distanceFromDestination = Math.pow(Math.pow(this.orders.to.x - this.x, 2)+Math.pow(this.orders.to.y - this.y, 2),0.5);
				var radius = this.radius/game.gridSize;
			}
      let item = undefined;
			switch (this.orders.type){
				case "move":
					if (distanceFromDestination < radius){
            for (let i = game.items.length - 1; i >= 0; i--) {
              if ((game.items[i].type == "terrains") && (Math.floor(this.orders.to.x) == game.items[i].x) && (Math.floor(this.orders.to.y) == game.items[i].y)){
                item = game.items[i];
              }
            }
            if (item)
              this.orders = {type: "harvest", to: item};
            else{
              this.orders = {type: "stand"};
            }

					}
					else {
						let moving = this.moveTo(this.orders.to, distanceFromDestination);
            if (!moving){
              for (let i = game.items.length - 1; i >= 0; i--) {
                if ((game.items[i].type == "terrains") && (Math.floor(this.orders.to.x) == game.items[i].x) && (Math.floor(this.orders.to.y) == game.items[i].y)){
                  item = game.items[i];
                }
              }
              if (item)
                this.orders = {type: "harvest", to: item};
              else{
                this.orders = {type: "stand"};
              }
            }
					}
					break;
        case "harvest":
          if (this.orders.to.name == "forest"){
            this.action = "harvest_timber";
          }

          if (this.orders.to.name == "field"){
            this.action = "harvest_wheat";
            // game.economy[game.userHouse]["wheat"] += 2;
          }
          // this.orders = {type: "stand"};
          break;
			}
    },

  };


let villager = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom, weaponType);

export {villager};
