//Object defintion for castle building
import Building from './building.js';
import {game} from '../../game.js';

let name = 'castle',
	//TODO: determine building sizes
	pixelWidth = 60,
	pixelHeight = 60,
	//TODO: determine base proportions
	baseWidth = 40,
	baseHeight = 40,
	//TODO: determine base offset
	pixelOffsetX = 0,
	pixelOffsetY = 20,
	//TODO: determine grid dimensions
	buildableGrid = [
                [1, 1],
                [1, 1]],
	passableGrid = [
                [1, 1],
                [1, 1]
            ],
	sight = 3,
	hitPoints = 3000,
	cost = 500,
	//TODO: get images for castle
	spriteImages = [
                { name: "healthy", count: 4 },
                { name: "damaged", count: 1 },
                { name: "constructing", count: 3 }
            ],
	defaults = {
		buildTime: 0,
		drawSprite: function(){
			let x = this.drawingX;
      let y = this.drawingY;

      // All sprite sheets will have blue in the first row and green in the second row
      let colorIndex = (this.team === "blue") ? 0 : 1;
      let colorOffset = colorIndex * this.pixelHeight;
			// imageOffset needs to be set from animate() function
			this.imageOffset = 0;
      // Draw the sprite at x, y
      game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight);
			// console.log("spritesheet "+this.spriteSheet);
			// console.log("imageOffset "+this.imageOffset);
			// console.log("pixelWidth "+this.pixelWidth);
			// console.log("colorOffset "+colorOffset);
			// console.log("pixelWidth "+this.pixelWidth);
			// console.log("pixelHeight "+this.pixelHeight);
			// console.log("x "+x);
			// console.log("y "+y);
			// console.log("pixelwidth "+this.pixelWidth);
			// console.log("pixelheight "+this.pixelHeight);
			// console.log();
		}
	};


let castle = new Building(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {castle};
