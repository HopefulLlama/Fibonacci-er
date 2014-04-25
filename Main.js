var canvas;
var ctx;

var sequenceCounter, threshold;
var stepEvent, drawEvent;
var grids;
var scale, width, trueWidth;
var centreX, centreY, minX, maxX, minY, maxY;
var darkBlue, lightBlue, red;

var debug=false;
var mouseX, mouseY;

// In ms.
var refreshRate = 30;
var version = "Release 1.0.0";
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
	
	resizeCanvas();
	
	scale = 1;
	width = 30;
	trueWidth = scale * width;
	grids = new Array();
	numbers = new Array();
	
	setCentre();
	
	// Measured as an offset from centre
	minX = -trueWidth/2;
	maxX = trueWidth/2;
	minY = -trueWidth/2;
	maxY = trueWidth/2;
	
	grids[0] = new Grid(minX, minY, trueWidth, 1, 0);
	numbers[0]=1;
	sequenceCounter = 0;
	threshold = 50;
	drawEvent = setInterval(function(){draw();}, refreshRate);
}

function stepForward(){
	sequenceCounter++;
	addGrid(sequenceCounter);
	updateNumbers();
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