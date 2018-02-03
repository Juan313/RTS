//Object defintion for villager unit
import Unit from './unit.js';
let name = 'villager',
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
	sight = 1,
	hitPoints = 150,
	cost = 50,
	//TODO: get sprite images
	spriteImages = null,
	defaults = {
		buildTime : 5,
		range : 1,
		moveSpeed : 1,
		interactSpeed : 1,
		firePower : 0,
		builtFrom : 'castle',
		special : null
	};

let villager = new Unit(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, 
pixelOffsetY, buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {villager};


