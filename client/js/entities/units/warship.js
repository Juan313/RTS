//Object defintion for warship unit, only constructable by House Greyjoy
import Unit from './unit.js';
import {game} from '../../game.js';
import {mouse} from '../../mouse.js';

let name = 'warship',
	pixelWidth = 16,
	pixelHeight = 16,
	//TODO: determine base proportions
	baseWidth = 0,
	baseHeight = 0,
	//TODO: determine base offset
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	//TODO: determine grid dimensions
	buildableGrid = 0,
	passableGrid = 0,
	sight = 3,
	hitPoints = 400,
	cost = 200,
	//TODO: get sprite images
	spriteImages = null,
	defaults = {
		buildTime : 30,
		range : 10,
		moveSpeed : 3,
		interactSpeed : 1,
		firePower : 50,
		builtFrom : 'dock',
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

let warship = new Unit(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, 
pixelOffsetY, buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {warship};



