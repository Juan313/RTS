//Object defintion for villager unit
import {
  game
} from '../../game.js';

import Unit from './unit.js';
let name = 'villager',
  //pixelWidth = 16,
	pixelWidth = 16,
  pixelHeight = 16,
	//pixelHeight = 20,
  //pixelOffsetX = 0,
	pixelOffsetX = 10,
  //pixelOffsetY = 0,
	pixelOffsetY = 10,
	radius =  8,
  sight = 3,
  hitPoints = 150,
  cost = 50,
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	range = 1,
	moveSpeed = 0.75,
	interactSpeed = 1,
	firePower =  0,
	builtFrom = 'castle',
  defaults = {
    buildTime: 5,
    canAttack: false,
  };

let villager = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {villager};
