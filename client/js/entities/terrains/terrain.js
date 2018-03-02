//shared terrain class defintion file
import Entity from '../entity.js';
import { game } from '../../game.js';

export default class Terrain extends Entity {
	/*	Additional parameters:
	 *	baseWidth, baseHeight - rectangluar area of terain relative to map size
	 *	buildableGrid, passableGrid - grid spaces on map for pathfinding */
	constructor(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
	sight, spriteImages, defaults, buildableGrid, passableGrid, baseWidth, baseHeight) {
		super(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, sight, null, null, spriteImages, defaults);
		this.type = 'terrains';
		this.baseWidth = baseWidth;
		this.baseHeight = baseHeight;
		this.buildableGrid = buildableGrid;
		this.passableGrid = passableGrid;
	}

	animate(){
		this.processActions();
	}
	
	//terrain does not have life values or selectablity
	add(details){
		let that = super.add(details);	
		that.selectable = false;
		delete that.drawLifeBar;
		delete that.life;
		delete that.cost;
		delete that.hitPoints;
		delete that.selected;
		return that;
	}

	processActions(){
		this.imageList = this.spriteArray[this.action];
		this.imageOffset = this.imageList.offset;
	}

	drawSprite(){
		let x = this.drawingX;
		let y = this.drawingY;
		let colorOffset = 0;
		this.imageOffset = 0;
		game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight);
	}
}
