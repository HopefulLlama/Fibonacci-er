var timePerGrid = 2000;

function Grid(xOffset, yOffset, width, value, orientation){
	/*
	 * 0: Down	-	NW -> SE
	 * 1: Right - 	SW -> NE
	 * 2: Up 	-	SE -> NW 
	 * 3: Left 	- 	NE -> SW
	 */
	this.orientation = orientation;
	
	this.xOffset = xOffset;
	this.yOffset = yOffset;
	this.width = width;	
	this.value = value;
	this.animated = false;

	this.opacity = 0;
	this.incrementOpacity = incrementOpacity;
	function incrementOpacity(){
		this.opacity += 1/(timePerGrid/refreshRate);
		if(this.opacity > 1){
			this.opacity = 1;
		}
	}
	
	this.xLineStart;
	this.yLineStart;

	switch(orientation){
		case 0:
			this.xLineStart = this.xOffset;
			this.yLineStart = this.yOffset;
			break;
		case 1:
			this.xLineStart = this.xOffset;
			this.yLineStart = this.yOffset + this.width;
			break;
		case 2:
			this.xLineStart = this.xOffset + this.width;
			this.yLineStart = this.yOffset + this.width;
			break;
		case 3:
			this.xLineStart = this.xOffset + this.width;
			this.yLineStart = this.yOffset;
			break;
		default:
			break;			
	}
	
	this.xLineTo = 0;
	this.yLineTo = 0;
	
	// Increment the line so that it completes the width in 2 seconds (repeating the 'drawing' every 30 ms);
	this.incrementLineLength = incrementLineLength;
	function incrementLineLength(){
		if(Math.abs(this.xLineTo) < this.width){
			var lineIncreaseAmount = width/(timePerGrid/refreshRate);
			switch(orientation){
				case 0:
					this.xLineTo += lineIncreaseAmount;
					this.yLineTo += lineIncreaseAmount;
					break;
				case 1:
					this.xLineTo += lineIncreaseAmount;
					this.yLineTo -= lineIncreaseAmount;
					break;
				case 2:
					this.xLineTo -= lineIncreaseAmount;
					this.yLineTo -= lineIncreaseAmount;
					break;
				case 3:
					this.xLineTo -= lineIncreaseAmount;
					this.yLineTo += lineIncreaseAmount;
					break;
				default:
					break;
			}
		} else if (Math.abs(this.xLineTo) >= this.width){
			switch(orientation){
				case 0:
					this.xLineTo = this.width;
					this.yLineTo = this.width;
					break;
				case 1:
					this.xLineTo = this.width;
					this.yLineTo = -this.width;
					break;
				case 2:
					this.xLineTo = -this.width;
					this.yLineTo = -this.width;
					break;
				case 3:
					this.xLineTo = -this.width;
					this.yLineTo = this.width;
					break;
				default:
					break;
			}
			this.animated = true;
		}
	}
	/*
	this.isMouseOver = isMouseOver;
	function isMouseOver(){
		var temp = false;
		if(mouseX >= xOffset*scale && mouseX < (xOffset+width)*scale && mouseY >= yOffset*scale && mouseY < (yOffset+height)*scale){
			temp = true;		
		}
		return temp;
	}*/
}


function addGrid(x){
	var prevNumber = grids[x-1].value;
	var prevPrevNumber;
	if (x < 2){
		prevPrevNumber = 0;
	} else {
		prevPrevNumber = grids[x-2].value;
	}
	var value = parseInt(prevNumber) + parseInt(prevPrevNumber);
	/*
	 * 0: Down	-	NW -> SE
	 * 1: Right - 	SW -> NE
	 * 2: Up 	-	SE -> NW 
	 * 3: Left 	- 	NE -> SW
	 */
	var thisWidth;
	var orientation = x % 4;
	switch(orientation){
		case 0:
			thisWidth = maxX-minX;
			grids[grids.length] = new Grid(minX, maxY, thisWidth, value, orientation);
			maxY += thisWidth;
			break;
		case 1:
			thisWidth = maxY-minY;
			grids[grids.length] = new Grid(maxX, minY, thisWidth, value, orientation);
			maxX += thisWidth;
			break;
		case 2: 
			thisWidth = maxX-minX;
			grids[grids.length] = new Grid(minX, minY-thisWidth, thisWidth, value, orientation);
			minY -= thisWidth;
			break;
		case 3:
			thisWidth = maxY-minY;
			grids[grids.length] = new Grid(minX-thisWidth, minY, thisWidth, value, orientation);
			minX -= thisWidth;
			break;
		default:
			break;
	}
}