//Shared unit class definition file
import Entity from '../entity.js';

class Unit extends Entity {
	/* Parameters -
	 * range : How far a unit can interact with buildings / units in square area
	 * speed : Multiplier for base unit speed to determine how many squares on map can be moved per second
	 * firePower: attack damage per second dealt to targeted units / buildings  
	 * builtFrom: building this item must be constructed from,
	 * skills: array of actions a unit can do
	 */
	constructor(){
		super();
		this.range = range;
		this.speed = speed;
		this.firePower = firePower;
		this.builtFrom = builtFrom;
		this.skills = skills;
	}
	//If the unit can be built from the fromBuilding parameter return the time required to build the unit, otherwise return -1
	build(fromBuilding){
		if(fromBuilding === this.builtFrom){
			super.build();
		}else return null;
	}
	//attack another entity if the entity is within the unit's range and the unit has positive firepower, otherwise return null
	attack(entity){
		if(this.firePower > 0){
			//TODO: implement range check
			entity.getAttacked(this.firePower);	
		}
		return null;
	}
}
export default Unit;
