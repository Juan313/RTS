//Shared unit class definition file

class Unit {
	/* Parameters -
	 * width, length : determines size for map drawing
	 * sight : how much of the map is revealed around unit in square area
	 * range : how far a unit can interact with buildings / units in square area
	 * wheatCost : how much wheat player needs to construct unit
	 * buildTime: how long the player waits in seconds to construct the unit
	 * speed : Multiplier for base unit speed to determine how many squares on map can be moved per second
	 * firePower: attack damage per second dealt to targeted units / buildings  
	 * builtFrom: building this item must be constructed from,
	 * skills: array of actions a unit can do
	 */
	constructor(health, width, length, sight, range, wheatCost, buildTime, speed, firePower, builtFrom, skills){
		this.health = health;
		this.width = width;
		this.length = length;
		this.sight = sight;
		this.attackRange = attackRange;
		this.wheatCost = wheatCost;
		this.buildTime = buildTime;
		this.speed = speed;
		this.firePower = firePower;
		this.builtFrom = builtFrom;
		this.skills = skills;
	}
	//If the unit can be built from the fromBuilding parameter return the time required to build the unit, otherwise return -1
	build(fromBuilding){
		if(fromBuilding === this.builtFrom){
			return this.buildTime;
		}
		return -1;
	}
	/*If the player has enough wheat given the parameter wheat return the remaining wheat 
	 * after purchasing to player, otherwise return -1*/
	buy(wheat){	
		if(wheat >= this.wheatCost){
			return wheat - this.wheatCost;
		}
		return -1;
	}

	attack(entity){
		entity.getAttacked(this.firePower);	
	}
	
	getAttacked(firePower){
		this.health -= firePower;
		return this.health;
	}
}
export default Unit;
