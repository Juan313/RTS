//Object defintion for stable building
import Building from './building.js';
let name = 'stable',
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
	sight = 2,
	health = 2500,
	cost = 800,
	buildTime = 30,
	//TODO: get images for stable
	spriteImages = null;

export let stable = new Building(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, 
buildableGrid, passableGrid, sight, health, cost, buildTime, spriteImages);


