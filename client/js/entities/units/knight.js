//Object defintion for knight unit
import Unit from './unit.js';
import {
  game
} from '../../game.js';

let name = 'knight',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 8,
	pixelOffsetY = 8,
	radius = 8,
	sight = 3,
	hitPoints = 400,
	cost = 200,
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	range = 3,
	moveSpeed = 1.5,
	interactSpeed = 1,
	firePower = 50,
	builtFrom = 'stable',
	defaults = {
    turnSpeed: 2,
    buildTime: 15,
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

let knight = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {knight};
