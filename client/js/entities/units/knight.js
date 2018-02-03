//Object defintion for knight unit
import Unit from './unit.js';
let name = 'knight',
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
		buildTime : 15,
		range : 3,
		moveSpeed : 2,
		interactSpeed : 1,
		firePower : 50,
		builtFrom : 'stable',
		special : null
	};

let knight = new Unit(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, 
pixelOffsetY, buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {knight};



