//Object defintion for villager unit
import Unit from './unit.js';
let name = 'villager',
	pixelWidth = 16,
	pixelHeight = 16,
	//TODO: determine base proportions
	baseWidth = 0,
	baseHeight = 0,
	//TODO: determine base offset
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	//TODO: determine grid dimensions
	buildableGrid = 0,
	passableGrid = 0,
	sight = 1,
	health = 150,
	cost = 50,
	buildTime = 5,
	//TODO: get sprite images
	spriteImages = null,
	range = 1,
	moveSpeed = 1,
	interactSpeed = 1,
	firePower = 0,
	builtFrom = 'castle',
	special = null,
	directions = 8;

export let villager = new Unit(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, 
buildableGrid, passableGrid, sight, health, cost, buildTime, spriteImages, range, moveSpeed, interactSpeed, 
firePower, builtFrom, special, directions);


