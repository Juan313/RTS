//Object defintion for castle building
import Building from './building.js';
let name = 'castle',
	//TODO: determine building sizes
	pixelWidth = 0,
	pixelHeight = 0,
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
	hitPoints = 3000,
	cost = 0,
	//TODO: get images for castle
	spriteImages = null,
	defaults = {
		buildTime: 0
	}

let castle = new Building(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {castle};

