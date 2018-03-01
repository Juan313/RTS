//Weapon class definition file
import { loader } from '../../common.js';
import { game } from '../../game.js';

export default class Weapon {
  /* Parameters -
   * name: name of weapon
   * pixelWidth, pixelHeight - sprite dimensions
   * pixelOffsetX, pixelOffsetY - base area offset from top-left sprite corner
	 * radius - radius of weapon on map
	 * range - how far the weapon can travel
	 * damage - how much damage the weapon can do
	 * speed - how fast the weapon travels
	 * reloadTime - how long it takes to reload the weapon
   * spriteImages - Definitions for sprite images used for animations
   * turnSpeed - If a weapon turns when firing how fast it turns
   */
  constructor(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, radius, range, damage, speed,
		reloadTime, spriteImages, turnSpeed){
    this.name = name;
    this.pixelWidth = pixelWidth;
    this.pixelHeight = pixelHeight;
    this.pixelOffsetX = pixelOffsetX;
    this.pixelOffsetY = pixelOffsetY;
		this.radius = radius;
		this.range = range;
		this.damage = damage;
		this.speed = speed;
		this.reloadTime = reloadTime;
    this.spriteImages = spriteImages;
    this.turnSpeed = turnSpeed;
    this.spriteArray = null;
		this.type = 'weapons';
		this.canMove = true;
		this.distanceTravelled = 0;
		this.directions = 4;
		this.action = 'fly';
		this.selected = false;
		this.selectable = false;
		this.orders = { type: 'fire' };
		this.speedAdjustmentWhileTurningFactor = 1;
		this.animationIndex = 0;
		this.imageOffset = 0;
  }

  //load the sprites for the given weapon
  load() {
    if (this.spriteArray) {
      return;
    }
    this.spriteSheet = loader.loadImage(`../images/${this.type}/${this.name}.png`);
    this.spriteArray = [];
    this.spriteCount = 0;
    for (let spriteImage of this.spriteImages) {
      let constructImageCount = spriteImage.count;
      let constructDirectionCount = spriteImage.directions;
      if (constructDirectionCount) {
        for (let i = 0; i < constructDirectionCount; i++) {
          let constructImageName = spriteImage.name + '-' + i;
          this.spriteArray[constructImageName] = {
            name: constructImageName,
            count: constructImageCount,
            offset: this.spriteCount
          };
          this.spriteCount += constructImageCount;
        }
      } else {
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
	//move the weapon to a new destination
	moveTo(destination){
	 if(this.turnSpeed){
		 let newDirection = this.findAngleForFiring(destination);
		 this.turnTo(newDirection);
		}
		let maximumMovement = this.speed * this.speedAdjustmentFactor;
		let movement = maximumMovement;
		let angleRadians = - (this.direction / this.directions) * 2 * Math.PI;
		this.lastMovementX = -(movement * Math.sin(angleRadians));
		this.lastMovementY = -(movement * Math.cos(angleRadians));
		this.x = this.x + this.lastMovementX;
		this.y = this.y = this.lastMovementY;
		this.distanceTraveleed += movement;
	}

	//boolean  whether or not the weapon has reached its target
	reachedTarget(){
		let item = this.target;
		if(item.type === 'buildings'){
			return(item.x <= this.x && item.x >= this.x - item.baseWidth / game.gridSize && item.y <= this.y &&
			item.y >= this.y - item.baseHeight / game.gridSize);
		}else{
			return(Math.pow(item.x - this.x, 2) + Math.pow(item.y - this.y, 2) < Math.pow((item.radius) / game.gridSize, 2));
		}
	}
	//Handle weapon orders
	processOrders(){
		this.lastMovementX = 0;
		this.lastMovementY = 0;
		switch(this.orders.type){
			case 'fire':
				var reachedTarget = false;
				if(this.distanceTraveled > this.range || (reachedTarget = this.reachedTarget())){
					if(reachedTarget){
						this.target.life -= this.damage;
						this.orders = {type: 'explode' };
						this.action = 'explode'
						this.animationIndex = 0;
					}else{
						game.remove(this);
					}
				}else{
					this.moveTo(this.target);
				}
				break;
		}
	}
		
	animate(){
		this.processActions();
	}

	//set spirtes based on current actions	
	processActions(){
		let direction = Math.round(this.direction) % this.directions;
		switch(this.action){
			case 'fly':
				this.imageList = this.spriteArray['fly-' + direction];
				this.imageOffset = this.imageList.offest;
				break;
			case 'explode':
				this.imageList = this.spriteArray['explode'];
				this.imageOffset = this.imageList.offst + this.animationIndex;
				this.animationIndex++;
				if(this.animationIndex >= this.imageList.count){
					game.remove(this);
				}
		}
	}
	//draw the weapon onto the canvas
	drawSprite(){
		let x = this.drawingX;
		let y = this.drawingY;
		let colorOffset = 0;
		game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidht, this.pixelHeight);
	}

  //returns a weapon based on default properties, details, and base properties
  add(details){
    //create a copy of the current object, apply properties and return it to the caller
    let that = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    Object.assign(that, that.defaults);
    delete that.defaults;
    Object.assign(that, details);
    return that;
  }
}
