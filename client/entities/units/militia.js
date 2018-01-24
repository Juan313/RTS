//Object defintion for militia unit
import Unit from './unit.js';

	let health = 250,
	width = 1,
	length = 1,
	sight = 4,
	wheatCost = 100,
	buildTime = 10,
	speed = 3,
	firePower = 30,
	builtFrom = 'Barrack',
	skills = ['Construction', 'Collection', 'Repair', 'Battle'];

export let militia = new Unit(health, width, length, sight,
wheatCost, buildTime, speed, firePower, builtFrom, skills);

