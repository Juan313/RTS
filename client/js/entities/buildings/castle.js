//Object defintion for castle building
import Building from './building.js';
import {game} from '../../game.js';

let name = 'castle',
	pixelWidth = 64,
	pixelHeight = 64,
	baseWidth = 64,
	baseHeight = 64,
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	buildableGrid = [
										[1, 1, 1, 1],
										[1, 1, 1, 1],
										[1, 1, 1, 1]
									],
	passableGrid = [[0, 1, 1, 0],
									[1, 1, 1, 1],
									[1, 1, 1, 1]
								],
	sight = 3,
	hitPoints = 3000,
	cost = 500,
	spriteImages = [{name: 'stand', count: 1, directions: 1}],
	defaults = {
		buildTime: 30,
	};

let castle = new Building(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
	sight, hitPoints, cost, spriteImages, defaults, buildableGrid, passableGrid, baseWidth, baseHeight);

export {castle};
