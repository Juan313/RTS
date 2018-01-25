//Object defintion for knight unit
import Unit from './unit.js';

let	health = 400,
	width = 1,
	length = 2,
	sight = 5,
	wheatCost = 200,
	buildTime = 15,
	speed = 4,
	firePower = 50,
	builtFrom = 'Stable',
	skills = ['Construction', 'Collection', 'Repair', 'Battle']

export let knight = new Unit(health, width, length, sight, 
wheatCost, buildTime, speed, firePower, builtFrom, skills);


