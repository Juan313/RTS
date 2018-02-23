//Object defintion for militia unit
import Unit from './unit.js';
import {
  game
} from '../../game.js';

let name = 'militia',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 8,
	pixelOffsetY = 8,
	radius = 8,
	range = 1,
	sight = 2,
	hitPoints = 250,
	cost = 100,
	moveSpeed = 1,
	interactSpeed = 1,
	firePower = 30,
	builtFrom = 'barrack',
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	defaults = {
    turnSpeed: 2,
    buildTime: 10,
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

let militia = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, sight, hitPoints, cost, spriteImages,
	defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {militia};
