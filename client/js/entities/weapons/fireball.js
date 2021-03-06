//Object defintion for fireball weapon
import Weapon from './weapon.js';
import { game } from '../../game.js';

let name = 'fireball',
	pixelWidth = 10,
	pixelHeight = 11,
	pixelOffsetX = 5,
	pixelOffsetY = 5,
	radius = 8,
	range = 15,
	damage = 20,
	speed = 1,
	reloadTime = 30,
	spriteImages = [{name: 'fly', count: 1, directions: 8}, {name: 'explode', count: 7}],
	turnSpeed = 2;

let fireball = new Weapon(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, radius, range, damage, speed, reloadTime, spriteImages, turnSpeed);

export {fireball};
