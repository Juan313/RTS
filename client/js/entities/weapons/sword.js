//Object defintion for sword weapon
import Weapon from './weapon.js';
import { game } from '../../game.js';

let name = 'sword',
	pixelWidth = 10,
	pixelHeight = 11,
	pixelOffsetX = 5,
	pixelOffsetY = 5,
	radius = 8,
	range = 5,
	damage = 10,
	speed = 1,
	reloadTime = 15,
	spriteImages = [{name: 'fly', count: 1, directions: 8}, {name: 'explode', count: 7}],
	turnSpeed = 2;

let sword = new Weapon(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, radius, range, damage, speed, reloadTime, spriteImages, turnSpeed);

export {sword};
