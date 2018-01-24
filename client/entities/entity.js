//Shared entity class definition file
class Entity {
	/* Parameters -
	 * health: health points for determining if entity still alive
	 * width, length : determines size for map drawing
	 * x, y : map position of entity starting from the lowest it's lowest left point
	 * sight : how much of the map is revealed around entity in square area
	 * cost : how much of wheat/timber player needs to construct entity
	 * buildTime: how long the player waits in seconds to construct the entity
	 */
	constructor(health, width, length, x, y, sight, cost, buildTime){
		this.health = health;
		this.width = width;
		this.length = length;
		this.x = x;
		this.y = y
		this.sight = sight;
		this.cost = cost;
		this.buildTime = buildTime;
	}
	/*If the player has enough in their inventory return the remaining inventory
	 * after purchasing to player, otherwise return -1*/
	buy(inventory){	
		if(inventory >= this.cost){
			return inventory - this.cost;
		}
		return -1;
	}	
	//receive attacks from units, decreasing health accordingly
	getAttacked(firePower){
		this.health -= firePower;
		return this.health;
	}
	//return the entity to the player after waiting for the given build time
	build(){
		setTimeOut(() => this, this.buildTime);
	}
}
export default Entity;
