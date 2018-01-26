//Shared entity class definition file
export default class Entity {
	/* Parameters -
	 * name: name of entity
	 * pixelWidth, pixelHeight - sprite dimensions
	 * baseWidth, baseHeight - base area dimensions
	 * pixelOffsetX, pixelOffsetY - base area offset from top-left sprite corner
	 * buildableGrid - grid squares for building entity,
	 * passableGrid - grid squres obstructed or passable for pathfinding
	 * sight - how far around entity is revealed on map
	 * health - hit point of entity
	 * cost - how much in wheat or timber required to build entity
	 * buildTime - how long in seconds required to build the entity
	 * spriteImages - Images used to display entity
	 */
	constructor(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
	sight, health, cost, buildTime, spriteImages){
		this.name = name;
		this.pixelWidth = pixelWidth;
		this.pixelHeight = pixelHeight;
		this.baseWidth = baseWidth;
		this.baseHeight = baseHeight;
		this.pixelOffsetX = pixelOffsetX;
		this.pixelOffsetY = pixelOffsetY;
		this.buildableGrid = buildableGrid;
		this.passableGrid = passableGrid;
		this.sight = sight;
		this.health = health;
		this.cost = cost;
		this.buildTime = buildTime;
		this.spriteImages = spriteImages;
	}

	
}
