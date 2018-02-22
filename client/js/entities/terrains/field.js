//Object defintion for wheat field terrain
import Terrain from './terrain.js';
let name = 'field',
	pixelWidth = 32,
	pixelHeight = 32,
	baseWidth = 32,
	baseHeight = 32,
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	buildableGrid = [1, 1],
	passableGrid = [[1, 1],
									[1, 1]],
	sight = 3,
	spriteImages = [{name: 'stand', count: 1, directions: 1}];

let field = new Terrain(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
	sight, spriteImages, null, buildableGrid, passableGrid, baseWidth, baseHeight);

export {field};
