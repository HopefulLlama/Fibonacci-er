var canvas;
var ctx;

var sequenceCounter, threshold;
var stepEvent, drawEvent;
var grids;
var scale, width, trueWidth;
var centreX, centreY, minX, maxX, minY, maxY;
var darkBlue, lightBlue, red;

var debug=true;
var mouseX, mouseY;

window.onresize = function(event) {
    resizeCanvas();
    setCentre();
};
/*
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x : evt.clientX - rect.left,
		y : evt.clientY - rect.top
	};
}*/

function init(){
	canvas = document.getElementById("canvas");
	
	/*
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		mouseX=mousePos.x; 
		mouseY=mousePos.y;
	}, false); */
	
	darkBlue = "#40A6FF";
	lightBlue = "#00FFFF";
	red = "#FF0000";
	ctx = canvas.getContext("2d");
	ctx.font="16px Arial";
	
	resizeCanvas();
	
	scale = 1;
	width = 1;
	trueWidth = scale * width;
	grids = new Array();
	numbers = new Array();
	
	setCentre();
	
	// Measured as an offset from centre
	minX = -trueWidth/2;
	maxX = trueWidth/2;
	minY = -trueWidth/2;
	maxY = trueWidth/2;
	
	grids[0] = new Grid(minX, minY, trueWidth, 1);
	grids[0].animated = true;
	numbers[0]=1;
	sequenceCounter = 1;
	threshold = 50;
	drawEvent = setInterval(function(){draw();}, 30);
}



function resizeCanvas(){
	var windowWidth = 0, windowHeight = 0;
	if ( typeof (window.innerWidth ) == 'number') {
		//Non-IE
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight )) {
		//IE 6+ in 'standards compliant mode'
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body && (document.body.clientWidth || document.body.clientHeight )) {
		//IE 4 compatible
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}
	canvas.width = windowWidth;
	canvas.height = windowHeight - document.getElementById("numbers").clientHeight;
}

function setCentre(){
	centreX = canvas.width/2;
	centreY = canvas.height/2;
}

function stepForward(){
	addGrid();
	updateNumbers();
	sequenceCounter++;
	/*
	if (sequenceCounter >= threshold){
		clearInterval(stepEvent);
	}
	*/
}

function updateNumbers(){
	var output = "";
	for (var i = 0; i < grids.length; i++){
		output += grids[i].value + ", ";
	}
	document.getElementById("numbers").innerHTML = output; 
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	scaleDrawing();
	for (var i = 0; i < grids.length; i++){
		// If it cannot be seen, do not attempt to draw it
		if(grids[i].width*scale >= 1) {
			ctx.strokeStyle = darkBlue;
			ctx.beginPath();
			ctx.rect(centreX+grids[i].xOffset*scale, centreY+grids[i].yOffset*scale, grids[i].width*scale, grids[i].width*scale);
			ctx.stroke();
			ctx.closePath();
			/*
			 * 0: Down	-	NW -> SE
			 * 1: Right - 	SW -> NE
			 * 2: Up 	-	SE -> NW 
			 * 3: Left 	- 	NE -> SW
			 */
			switch (i % 4){
				case 0:
					ctx.strokeStyle = lightBlue;
					ctx.beginPath();
					
					var lineStartX = centreX+grids[i].xOffset*scale;
					var lineStartY = centreY+grids[i].yOffset*scale; 
					ctx.moveTo(lineStartX, lineStartY);
					if(Math.abs(grids[i].xLineTo)!=grids[i].width){
						grids[i].xLineTo++;
						grids[i].yLineTo--;
					} else if (Math.abs(grids[i].xLineTo)==grids[i].width){
						grids[i].animated == true;
						
					}
					ctx.lineTo(lineStartX+grids[i].xLineTo*scale, lineStartY+grids[i].yLineTo*scale);
					ctx.stroke();
					ctx.closePath();
					break;
				case 1:
					ctx.strokeStyle = lightBlue;
					ctx.beginPath();
					
					var lineStartX = centreX+grids[i].xOffset*scale;
					var lineStartY = centreY+grids[i].yOffset*scale; 
					ctx.moveTo(lineStartX, lineStartY);
					if(Math.abs(grids[i].xLineTo)!=grids[i].width){
						grids[i].xLineTo++;
						grids[i].yLineTo++;
					} else if (Math.abs(grids[i].xLineTo)==grids[i].width){
						grids[i].animated == true;
						
					}
					ctx.lineTo(lineStartX+grids[i].xLineTo*scale, lineStartY+grids[i].yLineTo*scale);
					ctx.stroke();
					ctx.closePath();
				case 2:
					ctx.strokeStyle = lightBlue;
					ctx.beginPath();
					
					var lineStartX = centreX+grids[i].xOffset*scale;
					var lineStartY = centreY+grids[i].yOffset*scale; 
					ctx.moveTo(lineStartX, lineStartY);
					if(Math.abs(grids[i].xLineTo)!=grids[i].width){
						grids[i].xLineTo--;
						grids[i].yLineTo++;
					} else if (Math.abs(grids[i].xLineTo)==grids[i].width){
						grids[i].animated == true;
						
					}
					ctx.lineTo(lineStartX+grids[i].xLineTo*scale, lineStartY+grids[i].yLineTo*scale);
					ctx.stroke();
					ctx.closePath();
					break;
				case 3:
					ctx.strokeStyle = lightBlue;
					ctx.beginPath();
					
					var lineStartX = centreX+grids[i].xOffset*scale;
					var lineStartY = centreY+grids[i].yOffset*scale; 
					ctx.moveTo(lineStartX, lineStartY);
					if(Math.abs(grids[i].xLineTo)!=grids[i].width){
						grids[i].xLineTo--;
						grids[i].yLineTo--;
					} else if (Math.abs(grids[i].xLineTo)==grids[i].width){
						grids[i].animated == true;
						
					}
					ctx.lineTo(lineStartX+grids[i].xLineTo*scale, lineStartY+grids[i].yLineTo*scale);
					ctx.stroke();
					ctx.closePath();
				default:
					break;
			}
		}
		
		/*
		if(grids[i].isMouseOver()){
			ctx.fillStyle=lightBlue;
			ctx.fillText(this.value, mouseX + 10, mouseY - 10);
		}*/
	}
	drawDebug();
	if(grids[grids.length].animated){
		stepForward();
	}
}

function scaleDrawing(){
    if ((centreX+(minX*scale)<canvas.width*0.05) || (centreX+(maxX*scale)>canvas.width*0.95) || (centreY+(minY*scale)<canvas.height*0.05) || (centreY+(maxY*scale)>canvas.height*0.95)) {
		if (scale > 0) {
			scale=scale*0.9;
		}
	}
}

function drawDebug(){
	if(debug){
		ctx.fillStyle=red;
		ctx.fillText("scale: " + scale + "\nmouseX: " + mouseX + "\nmouseY:" + mouseY, 15, 15);
	}
}

/*
 *
switch (i % 4){
		case 0:
			ctx.strokeStyle = lightBlue;
			ctx.beginPath();
			ctx.moveTo(centreX+grids[i].xOffset*scale, centreY+grids[i].yOffset*scale);
			ctx.lineTo(centreX+grids[i].xOffset*scale+grids[i].width*scale, centreY+grids[i].yOffset*scale+grids[i].width*scale);
			ctx.stroke();
			ctx.closePath();
			break;
		case 1:
			ctx.strokeStyle = lightBlue;
			ctx.beginPath();
			ctx.moveTo(centreX+grids[i].xOffset*scale+grids[i].width*scale, centreY+grids[i].yOffset*scale);
			ctx.lineTo(centreX+grids[i].xOffset*scale, centreY+grids[i].yOffset*scale+grids[i].width*scale);
			ctx.stroke();
			ctx.closePath();
			break;
		case 2:
			ctx.strokeStyle = lightBlue;
			ctx.beginPath();
			ctx.moveTo(centreX+grids[i].xOffset*scale, centreY+grids[i].yOffset*scale);
			ctx.lineTo(centreX+grids[i].xOffset*scale+grids[i].width*scale, centreY+grids[i].yOffset*scale+grids[i].width*scale);
			ctx.stroke();
			ctx.closePath();
			break;
		case 3:
			ctx.strokeStyle = lightBlue;
			ctx.beginPath();
			ctx.moveTo(centreX+grids[i].xOffset*scale+grids[i].width*scale, centreY+grids[i].yOffset*scale);
			ctx.lineTo(centreX+grids[i].xOffset*scale, centreY+grids[i].yOffset*scale+grids[i].width*scale);
			ctx.stroke();
			ctx.closePath();
			break;
		default:
			break;
	}
*/