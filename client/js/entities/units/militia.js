//Object defintion for militia unit
import Unit from './unit.js';
let name = 'militia',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	radius = 8,
	range = 1,
	sight = 2,
	hitPoints = 250,
	cost = 100,
	moveSpeed = 0.75,
	interactSpeed = 1,
	firePower = 30,
	builtFrom = 'barrack',
	spriteImages = [{name: 'alive', count: 1, directions: 4}],
	defaults = {
		buildTime : 10,
	};

let militia = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, sight, hitPoints, cost, spriteImages, 
	defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {militia};
