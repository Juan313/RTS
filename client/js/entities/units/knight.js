//Object defintion for knight unit
import Unit from './unit.js';
let name = 'knight',
	//TODO: determine image size
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
	health = 400,
	cost = 200,
	buildTime = 15,
	moveSpeed = 2,
	interactSpeed = 1,
	firePower = 50,
	builtFrom = 'stable',
	special = null;

export let knight = new Unit(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, 
buildableGrid, passableGrid, sight, health, cost, buildTime, spriteImages, range, moveSpeed, interactSpeed, 
firePower, builtFrom, special);


