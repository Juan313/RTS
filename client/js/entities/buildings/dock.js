//Object defintion for dock building, only constructable by Greyjoy
import Building from './building.js';
let name = 'dock',
	pixelWidth = 32,
	pixelHeight = 32,
	baseWidth = 32,
	baseHeight = 32,
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	buildableGrid = [1, 1],
	passableGrid = [1, 1],
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
