//Object defintion for knight unit
import Unit from './unit.js';
let name = 'knight',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	radius = 8,
	sight = 3,
	hitPoints = 400,
	cost = 200,
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



