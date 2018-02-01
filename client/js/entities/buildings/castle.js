//Object defintion for castle building
import Unit from './building.js';
let name = 'castle',
	//TODO: determine building sizes
	pixelWidth = 0,
	pixelHeight = 0,
	//TODO: determine base proportions
	baseWidth = 0,
	baseHeight = 0;
	//TODO: determine base offset
	pixelOffsetX = 0,
	piexlOffsetY = 0,
	//TODO: determine grid dimensions
	buildableGrid = 0,
	passableGrid = 0,
	sight = 3,
	health = 3000,
	cost = 0,
	buildTime = 0,
	//TODO: get images for castle
	spriteImages = null;

export let castle = new Building(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, 
buildableGrid, passableGrid, sight, health, cost, buildTime, spriteImages);


