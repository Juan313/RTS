//Object defintion for militia unit
import Unit from './unit.js';
let name = 'militia',
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
	sight = 2,
	health = 250,
	cost = 100,
	buildTime = 10,
	//TODO: get sprite images
	spriteImages = null,
	range = 2,
	moveSpeed = 0.75,
	interactSpeed = 1,
	firePower = 30,
	builtFrom = 'barracks',
	special = null,
	directions = 8;

export let militia = new Unit(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, 
buildableGrid, passableGrid, sight, health, cost, buildTime, spriteImages, range, moveSpeed, interactSpeed, 
firePower, builtFrom, special, directions);


