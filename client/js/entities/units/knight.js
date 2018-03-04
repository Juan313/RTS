//Object defintion for knight unit
import Unit from './unit.js';
import {
  game
} from '../../game.js';

let name = 'knight',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 8,
	pixelOffsetY = 8,
	radius = 8,
	sight = 15,
	hitPoints = 400,
	cost = 200,
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	range = 13,
	moveSpeed = 1.5,
	interactSpeed = 1,
	firePower = 50,
	builtFrom = 'stable',
	defaults = {
    buildTime: 15,
    canAttack: true,
    canMove: true,
  };

let knight = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {knight};
