//Object defintion for warship unit, only constructable by House Greyjoy
import Unit from './unit.js';
import {game} from '../../game.js';
import {mouse} from '../../mouse.js';

let name = 'warship',
	pixelWidth = 64,
	pixelHeight = 64,
	//TODO: determine pixel offsets
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	sight = 3,
	hitPoints = 400,
	cost = 200,
	spriteImages = [{name: 'alive', count: 1, directions: 4}],
	//TODO: determine radius
	radius = 0,
	range = 10,
	moveSpeed = 3,
	interactSpeed = 1,
	firePower = 50,
	builtFrom = 'dock',
	defaults = {
		buildTime : 30,
		house: 'Greyjoy',
		//Warship is only capable of attack and unit transport
		repair: null,
		construct: null,
		transportList: []
	};	

defaults.special = { description: 'The warship can transport up to 10 militia or knight units across a body of water.'}
	
//Store units in its unit list and remove them from the game until they are dropped off
defaults.special.transport = function(self){
	return function(unit){
		if(self.transportList.length < 10 && (unit.name === 'militia' || unit.name === 'knight') && unit.house === 'Greyjoy'){
			self.transportList.push(unit);	
			game.remove(unit);
		}
	}
}

//Release unit from a given index in the warship's transport list and draw them where the user clicks within a 2 space range
defaults.special.release = function(self){
	return function(unitIndex){
		if(!mouse.itemUnderMouse() && (Math.pow(self.x - mouse.gameX, 2) + Math.pow(self.y - mouse.gameY, 2) <= 4)) {
			unit = transportList(unitIndex);	
			transportList.splice(unitIndex, 1);
			//TODO: implement draw method which draws a unit at a given game x and y locations
			unit.draw(mouse.gameX, mouse.gameY);
		}
	}
}

let warship = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {warship};



