//Object defintion for stable building
import Building from './building.js';
let name = 'stable',
	//TODO: determine building sizes
	pixelWidth = 0,
	pixelHeight = 0,
	//TODO: determine base proportions
	baseWidth = 0,
	baseHeight = 0,
	//TODO: determine base offset
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	//TODO: determine grid dimensions
	buildableGrid = 0,
	passableGrid = 0,
	sight = 2,
	hitPoints = 2500,
	cost = 800,
	//TODO: get images for stable
	spriteImages = null,
	defaults = {
		buildTime: 30,
		drawSprite: function(){
			console.log("drawing from stable")
		}
	};

let stable = new Building(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY,
buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {stable};
