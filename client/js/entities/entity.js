//Shared entity class definition file
import {loader} from '../common.js';
import {game} from '../game.js';

export default class Entity {
	/* Parameters -
	 * name: name of entity
	 * pixelWidth, pixelHeight - sprite dimensions
	 * baseWidth, baseHeight - base area dimensions
	 * pixelOffsetX, pixelOffsetY - base area offset from top-left sprite corner
	 * buildableGrid - grid squares for building entity,
	 * passableGrid - grid squres obstructed or passable for pathfinding
	 * sight - how far around entity is revealed on map
	 * hitPoints - total health pool of entity
	 * cost - how much in wheat or timber required to build entity
	 * spriteImages - Definitions for sprite images used for animations
	 * defaults - default information for the given entity
	 */
	constructor(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
	sight, hitPoints, cost, spriteImages, defaults){
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
		this.hitPoints = hitPoints;
		this.cost = cost;
		this.spriteImages = spriteImages;
		this.defaults = defaults;
		this.spriteArray = null;
	}
	//load the sprites for the given entity
	load(){
		if(this.spriteArray){
			return;
		}
		this.spriteSheet = loader.loadImage(`../images/${this.defaults.type}/${this.name}.png`);
		this.spriteArray = [];
		this.spriteCount = 0;
		for(let spriteImage of this.spriteImages){
			let constructImageCount = spriteImage.count;
			let constructDirectionCount = spriteImage.directions;
			if(constructDirectionCount){
				for(let i = 0; i < constructDirectionCount; i++){
					let constructImageName = spriteImage.name + '-' + i;
					this.spriteArray[constructImageName] = {
						name: constructImageName,
						count: constructImageCount,
						offset: this.spriteCount
					};
					this.spriteCount += constructImageCount;
				}
			}else{
				let constructImageName = spriteImage.name;
				this.spriteArray[constructImageName] = {
					name: constructImageName,
					count: constructImageCount,
					offset: this.spriteCount
				};
				this.spriteCount += constructImageCount;
			}
		}
	}
	//return an entity based on default properties, details, and base properties
	add(details){
		//create a copy of the current object, apply properties and return it to the caller
		let that = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
		that.animationIndex = 0;
		that.direction = 0;
		that.selected = false;
		that.selectable = true;
		that.orders = {type: 'stand'};
		that.action = 'stand';
		that.life = this.hitPoints;
		//apply entity defaults and details
		Object.assign(that, that.defaults);
		delete that.defaults;
		Object.assign(that, details);
		return that;
	}
	//animate the entity setting its life code based on life, removing it from the game if it is dead
	animate(){
		this.lifeCode = 'alive';
		if(this.life < 0){
			this.lifeCode = 'dead';
			game.remove(this);
			return;
		}
		//process current action
		this.processActions();
	}

	//draw the entity
	draw(){
		this.drawingX = (this.x * game.gridSize) - game.offsetX - this.pixelOffsetX;
		this.drawingY = (this.y * game.gridSize) - game.offsetY - this.pixelOffsetY;
		this.drawSprite();

	}

	drawSprite(){
		console.log("drawing from entity");
	}

	processActions(){

	}
  //
	// test(){
	// 	console.log("test function being called");
	// }
}
