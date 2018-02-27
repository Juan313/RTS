//Object defintion for stable building
import Building from './building.js';
let name = 'stable',
	pixelWidth = 32,
	pixelHeight = 32,
	baseWidth = 32,
	baseHeight = 32,
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	buildableGrid = [[1, 1],
									[1, 1]],
	passableGrid = 	[[1, 1],
									[1, 1]],
	sight = 2,
	hitPoints = 2500,
	cost = 800,
	spriteImages = [{name: 'stand', count: 1, directions: 1}],
	//TODO: get images for stable
	defaults = {
		buildTime: 30,
	};

let stable = new Building(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
	sight, hitPoints, cost, spriteImages, defaults, buildableGrid, passableGrid, baseWidth, baseHeight);

export {stable};
