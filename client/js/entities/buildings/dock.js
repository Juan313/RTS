//Object defintion for dock building, only constructable by Greyjoy
import Building from './building.js';
let name = 'dock',
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
	hitPoints = 2500,
	cost = 750,
	//TODO: get images for dock
	spriteImages = null,
	defaults = {
		buildTime: 30,
		house: 'Greyjoy'
	};


let dock = new Building(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
	sight, hitPoints, cost, spriteImages, defaults, buildableGrid, passableGrid, baseWidth, baseHeight);

export {dock};
