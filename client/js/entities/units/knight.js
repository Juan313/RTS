//Object defintion for knight unit
import Unit from './unit.js';
let name = 'knight',
	pixelWidth = 16,
	pixelHeight = 16,
	//TODO: determine base offset
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	//TODO: determine radius
	radius = 0,
	sight = 3,
	hitPoints = 400,
	cost = 200,
	//TODO: get sprite images
	spriteImages = [{name: 'alive', count: 1, directions: 4}],
	range = 3,
	moveSpeed = 2,
	interactSpeed = 1,
	firePower = 50,
	builtFrom = 'stable',
	defaults = {
		buildTime : 15,
	};

let knight = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {knight};



