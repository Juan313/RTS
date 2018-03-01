//Object defintion for teeth weapon
import Weapon from './weapon.js';
import { game } from '../../game.js';

let name = 'teeth',
	pixelWidth = 10,
	pixelHeight = 11,
	pixelOffsetX = 5,
	pixelOffsetY = 5,
	radius = 8,
	range = 1,
	damage = 40,
	speed = 1,
	reloadTime = 1,
	spriteImages = [{name: 'fly', count: 1, directions: 4}, {name: 'explode', count: 1}],
	turnSpeed = 2;

let teeth = new Weapon(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, radius, range, damage, speed, reloadTime, spriteImages, turnSpeed);

export {teeth};
