//Shared entity class definition file

class Entity {
	/* Parameters -
	 * health: health points for determining if entity still alive
	 * width, length : determines size for map drawing
	 * x, y : map position of entity
	 * sight : how much of the map is revealed around unit in square area
	 * cost : how much of wheat/timber player needs to construct entity
	 * buildTime: how long the player waits in seconds to construct the entity
	 */
	constructor(health, width, length, x, y, sight, cost, buildTime){
		this.health = health;
		this.width = width;
		this.length = length;
		this.sight = sight;
		this.cost = cost;
		this.buildTime = buildTime;
		this.speed = speed;
		this.firePower = firePower;
		this.builtFrom = builtFrom;
		this.skills = skills;
	}

	/*If the player has enough in their inventory return the remaining inventory
	 * after purchasing to player, otherwise return -1*/
	buy(inventory){	
		if(inventory >= this.cost){
			return inventory - this.cost;
		}
		return -1;
	}	
	get coordinates(){
		return [this.x, this.y];
	}
	//receive attacks from units, decreasing health accordingly
	getAttacked(firePower){
		this.health -= firePower;
		return this.health;
	}
}
export default Unit;
