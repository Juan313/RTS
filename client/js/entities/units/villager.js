//Object defintion for villager unit
import {
  game
} from '../../game.js';

import Unit from './unit.js';
let name = 'villager',
  //pixelWidth = 16,
	pixelWidth = 21,
  //pixelHeight = 16,
	pixelHeight = 20,
  //pixelOffsetX = 0,
	pixelOffsetX = 10,
  //pixelOffsetY = 0,
	pixelOffsetY = 10,
	radius =  8,
  sight = 3,
  hitPoints = 150,
  cost = 50,
	//spriteImages = [{name: 'stand', count: 1, directions: 4}],
	spriteImages = [{name: 'stand', count: 1, directions: 8}],
	range = 1,
	moveSpeed = 1,
	interactSpeed = 1,
	firePower =  0,
	builtFrom = 'castle',
  defaults = {
    turnSpeed: 2,
    buildTime: 5,
		speedAdjustmentWhileTurningFactor: 0.5,
    canAttack: true,
    canMove: true,
    processOrders: function() {
			this.lastMovementX = 0;
			this.lastMovementY = 0;
			if (this.orders.to){
				var distanceFromDestination = Math.pow(Math.pow(this.orders.to.x - this.x, 2)+Math.pow(this.orders.to.y - this.y, 2),0.5);
				var radius = this.radius/game.gridSize;
			}
			switch (this.orders.type){
				case "move":
					if (distanceFromDestination < radius){
						this.orders = {type: "stand"};
					}
					else {
						let moving = this.moveTo(this.orders.to, distanceFromDestination);
            if (!moving){
              this.orders = {type: "stand"};
            }
					}
					break;
			}
    },
  };

let villager = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, 
	sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {villager};
