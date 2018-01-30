//Shared entity class definition file
import loader from '../common.js';
export default class Entity {
	/* Parameters -
	 * name: name of entity
	 * pixelWidth, pixelHeight - sprite dimensions
	 * baseWidth, baseHeight - base area dimensions
	 * pixelOffsetX, pixelOffsetY - base area offset from top-left sprite corner
	 * buildableGrid - grid squares for building entity,
	 * passableGrid - grid squres obstructed or passable for pathfinding
	 * sight - how far around entity is revealed on map
	 * health - total health pool of entity
	 * currentHP - current hits point of entity
	 * cost - how much in wheat or timber required to build entity
	 * buildTime - how long in seconds required to build the entity
	 * spriteImages - Definitions for sprite images used for animations
	 * spriteArray - loaded array of sprites after calling the load method, default: null
	 * spriteSheet - sprite sheet image, default: null
	 * directions - number of directions entity can face, default: 1
	 * direction - current direction of entity, default: 0 (up)
	 * selected - whether or not the entity is selected in the game: default: false
	 */
	constructor(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
	sight, health, cost, buildTime, spriteImages, spriteArray = null, spriteSheet = null, directions = 1, direction = 0, 
		selected = false){
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
		this.currentHP = this.health;
		this.cost = cost;
		this.buildTime = buildTime;
		this.spriteImages = spriteImages;
		this.spriteArray = spriteArray;
		this.directions = directions;
		this.direction = directions;
		this.selected = selected;
	}
	//load the sprite images for the entity	
	load(){
		//if we haven't loaded the sprites for the entity load them
		if(!this.spriteArray){
			//load each sprite sheet from the 'images/sprites/entityName.png' file
			this.spriteSheet = loader.loadImage('images/sprites/' + this.name + '.png');
			this.spriteCount = 0;	
			//iterate through each sprite image defintion and assign it values in the sprite array for each direction of the sprite
			for(let spriteImage of this.spriteImages){
				let imgCount = spriteImage.count;
				for(let i = 0; i < this.directions; i++){
						let imgName = spriteImage.name + '-' + i;
						this.spriteArray[imgName] = {
							name: imgName,
							count: imgCount,
							offset: this.spriteCount
						};
						item.spriteCount += imgCount;
				}
			}
		}
	}
}
