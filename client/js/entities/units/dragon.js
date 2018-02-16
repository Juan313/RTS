//Object defintion for dragon unit, only constructable by House Targaryen
import Unit from './unit.js';

let name = 'dragon',
	pixelWidth = 16,
	pixelHeight = 16,
	//TODO: determine base offset
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	//TODO: determine dragon radius
	radius = 0,
	sight = 5,
	hitPoints = 750,
	cost = 0,
	//TODO: get sprite images
	spriteImages = null,
	range = 5,
	moveSpeed = 5,
	interactSpeed = 1,
	firePower = 100,
	defaults = {
		buildTime : 30,
		house: 'Targaryen',
		state: 'egg',
		//Dragons can only attack
		repair: null,
		construct: null,
	};	

defaults.special = { 
	description: 'This dragon will hatch from an egg once you acquire 200 timber and 200 wheat'
}
/*If there is a dragon in the game call dragon.special.action(playerWheat, playerTimber) 
 * every time the player's wheat or timber change to allow the dragon to change it's state and be drawn*/
defaults.special.action = function(self){
	return function(wheat, timber){
		if(wheat > 199 && timber > 199){
			self.state = 'hatched';	
			self.draw();
		}
	}
}

let dragon = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, null);

export {dragon};
