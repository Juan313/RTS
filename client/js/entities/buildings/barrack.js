//Object defintion for barrack building
import Building from './building.js';
let name = 'barrack',
	pixelWidth = 32,
	pixelHeight = 32,
	baseWidth = 32,
	baseHeight = 32,
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	buildableGrid = [[1, 1],
									[1, 1]],
	passableGrid = [[1, 1],
									[1, 1]],
	sight = 3,
	hitPoints = 2000,
	cost = 500,
	spriteImages = [{name: 'stand', count: 1, directions: 1}],
	//TODO: get images for barrack
	defaults = {
		buildTime: 40
	};

let barrack = new Building(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
	sight, hitPoints, cost, spriteImages, defaults, buildableGrid, passableGrid, baseWidth, baseHeight);

export {barrack};
