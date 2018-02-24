//Object defintion for dragon unit, only constructable by House Targaryen
import Unit from './unit.js';
import {game} from '../../game.js';

let name = 'dragon',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 10,
	pixelOffsetY = 10,
	radius = 8,
	sight = 5,
	hitPoints = 750,
	cost = 0,
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	range = 5,
	moveSpeed = 3,
	interactSpeed = 1,
	firePower = 100,
	defaults = {
		state: 'egg',
		//Dragons can only attack
		repair: null,
		construct: null,
		canMove: false,
		special : { 
			type: 'passive',
			description: 'This dragon will hatch from an egg once you harvest 200 wheat and 200 timber',
			checkedInventory: false,
			action: function(self){
				if(game){
					if(!self.special.checkedInventory){
							self.special.wheat = game.economy["4"].wheat;
							self.special.timber = game.economy["4"].timber;
							self.special.checkedInventory = true;
					}else if(game.economy["4"].wheat - self.special.wheat > 199 && game.economy["4"].timber - self.special.timber > 199){
						self.state = 'hatched';
						console.log('hatched dragon');
						self.canMove = true;
						self.description = '';
						self.special.action = null;
					}
				}
			}
		}
	};

let dragon = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, null);

export {dragon};
