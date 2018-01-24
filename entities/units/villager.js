//Object defintion for villager unit
import Unit from './unit.js';

let health = 150,
	width = 1,
	length = 1,
	sight = 3,
	wheatCost = 50,
	buildTime = 5,
	speed = 2,
	firePower = 0,
	builtFrom =  'Castle',
	skills =  ['Construction', 'Collection', 'Repair'];
			
export let villager = new Unit(health, width, length, sight,
wheatCost, buildTime, speed, firePower, builtFrom, skills);



