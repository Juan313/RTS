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
		this.directions = 8;
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
		let maximumMovement = this.speed * this.speedAdjustmentWhileTurningFactor;

		let movement = maximumMovement;
		let angleRadians = - (this.direction / this.directions) * 2 * Math.PI;
		this.lastMovementX = -(movement * Math.sin(angleRadians));
		this.lastMovementY = -(movement * Math.cos(angleRadians));

		this.x = this.x + this.lastMovementX;
		this.y = this.y + this.lastMovementY;
		this.distanceTravelled += movement;
    // console.log("this.x is " + this.x);
    // console.log("this.y is " + this.y);
    // console.log("distance travelled is " + this.distanceTravelled);
    // console.log("speed" + this.speed);
    // console.log("speedAdjustmentFactor" + this.speedAdjustmentWhileTurningFactor);
    // console.log("movement" + movement);
    // console.log("radians" + angleRadians);
    // console.log("lastx" + this.lastMovementX);
    // console.log("lasty" + this.lastMovementY);
    //
    // console.log("x"+this.x);
    // console.log("y"+this.y);
	}

	//boolean  whether or not the weapon has reached its target
	reachedTarget(){
		let item = this.target;
		if(item.type === 'buildings'){
      // console.log("debugging reachedTarget function:");
      // console.log("item.x" + item.x);
      // console.log("this.x" + this.x);
      // console.log(this.x-item.baseWidth / game.gridSize);
      // console.log("item.y" + item.y);
      // console.log("this.y" + this.y);
      // console.log(this.y-item.baseHeight / game.gridSize);
      // console.log(item.x <= this.x);
      // console.log(item.x >= this.x - item.baseWidth / game.gridSize);
      // console.log(item.y <= this.y);
      // console.log(item.y >= this.y - item.baseHeight / game.gridSize);
			return(item.x <= this.x && item.x >= this.x - item.baseWidth / game.gridSize && item.y <= this.y &&
			item.y >= this.y - item.baseHeight / game.gridSize);
		}else if (item.type === 'units'){
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
				if(this.distanceTravelled > this.range || (reachedTarget = this.reachedTarget())){
					if(reachedTarget){
            console.log("ready to explode!")
						this.target.life -= this.damage;
						this.orders = {type: 'explode' };
						this.action = 'explode'
						this.animationIndex = 0;
					}else{
            console.log("game.remove");
						game.remove(this);
					}
				}else{
          console.log("move to target!");
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
				this.imageOffset = this.imageList.offset;

				break;
			case 'explode':
				this.imageList = this.spriteArray['explode'];
				this.imageOffset = this.imageList.offset + this.animationIndex;
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
    // console.log(this.imageOffset);

		game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight);
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

  draw() {
    this.drawingX = (this.x * game.gridSize) - game.offsetX - this.pixelOffsetX;
    this.drawingY = (this.y * game.gridSize) - game.offsetY - this.pixelOffsetY;
    // console.log("pixelOffset is " + this.pixelOffsetY);
    // console.log(this.x );
    this.drawSprite();

  }
  findAngleForFiring(target) {
          var dy = target.y - this.y;
          var dx = target.x - this.x;

          // Adjust dx and dy to point towards center of target
          if (target.type === "buildings") {
              dy += target.baseWidth / 2 / game.gridSize;
              dx += target.baseHeight / 2 / game.gridSize;
          }
          // else if (target.type === "aircraft") {
          //     dy -= target.pixelShadowHeight / game.gridSize;
          // }

          // Adjust dx and dy to start from center of source
          if (this.type === "buildings") {
              dy -= this.baseWidth / 2 / game.gridSize;
              dx -= this.baseHeight / 2 / game.gridSize;
          }

          // else if (this.type === "aircraft") {
          //     dy += this.pixelShadowHeight / game.gridSize;
          // }

          // Convert arctan to value between (0 - directions)
          var angle = this.directions / 2 - (Math.atan2(dx, dy) * this.directions / (2 * Math.PI));

          angle = (angle + this.directions) % this.directions;

          return angle;
      }
      turnTo(newDirection) {
        // console.log("direction in turnTo function "+this.direction);
        let difference = this.angleDiff(newDirection);
        let turnAmount = this.turnSpeed * this.speedAdjustmentWhileTurningFactor;

        if (Math.abs(difference) > turnAmount) {
          this.direction += turnAmount * Math.abs(difference) / difference;
          this.direction = (this.direction + this.directions) % this.directions;
          this.turning = true;
          // console.log("still turning!!!!");

        } else {
          this.direction = newDirection;
          this.turning = false;
          // console.log("turned!!!!");
        }
      }
      angleDiff(newDirection) {
        let currDirection = this.direction;
        // console.log("direction in angleDiff function "+this.direction);
        let directions = this.directions;

        if (currDirection >= directions / 2) {
          currDirection -= directions;
        }

        if (newDirection >= directions / 2) {
          newDirection -= directions;
        }

        var diff = newDirection - currDirection;

        if (diff < -directions / 2) {
          diff += directions;
        }

        if (diff > directions / 2) {
          diff -= directions;
        }
        // console.log(diff);
        return diff;
      }

}
