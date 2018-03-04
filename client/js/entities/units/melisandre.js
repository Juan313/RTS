//Object defintion for Melisandre special unit
import Unit from './unit.js';
import {game} from '../../game.js';

let name = 'melisandre',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 10,
	pixelOffsetY = 10,
	radius = 8,
	sight = 5,
	hitPoints = 500,
	cost = 500,
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	range = 2,
	moveSpeed = 1,
	interactSpeed = 1,
	firePower = 100,
	builtFrom = 'castle',
	weaponType = 'sword',
	defaults = {
		buildTime : 5,
		canAttack: true,
    canMove: true,
		special : {
			type: 'passive',
			description: 'Heal any militia unit within a 4 block distance from her at a rate of ~5 life per second',
			action : function(self){
				if(game && game.sortedItems){
					if(self.life > 0){
						for(let item of game.sortedItems){
							if(item.team == 2 && item.name === 'militia' && item.life > 0  && (item.life < item.hitPoints)){
								if(Math.sqrt(Math.pow(self.x - item.x, 2) + Math.pow(self.y - item.y, 2)) < 4){
									item.life = Math.min(item.life + .17, item.hitPoints);
								}
							}
						}
					}
				}
			}
		}
	};


let melisandre = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom, weaponType);

export {melisandre};
