//Object defintion for fireball weapon
import Weapon from './weapon.js';
import { game } from '../../game.js';

let name = 'fireball',
	pixelWidth = 10,
	pixelHeight = 11,
	pixelOffsetX = 5,
	pixelOffsetY = 5,
	radius = 8,
	range = 5,
	damage = 100,
	speed = 2,
	reloadTime = 3,
	spriteImages = [{name: 'fly', count: 1, directions: 4}, {name: 'explode', count: 1}],
	turnSpeed = null;

let fireball = new Weapon(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, radius, range, damage, speed, reloadTime, spriteImages, turnSpeed);

export {fireball};
