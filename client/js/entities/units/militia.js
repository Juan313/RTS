//Object defintion for militia unit
import Unit from './unit.js';
import {
  game
} from '../../game.js';

let name = 'militia',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 8,
	pixelOffsetY = 8,
	radius = 8,
	range = 10,
	sight = 4,
	hitPoints = 250,
	cost = 250,
	moveSpeed = 0.5,
	interactSpeed = 1,
	firePower = 10,
	builtFrom = 'barrack',
	weaponType = 'sword',
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	defaults = {
    buildTime: 100,
    canAttack: true,
    canMove: true,
  };

let militia = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, sight, hitPoints, cost, spriteImages,
	defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom, weaponType);

export {militia};
