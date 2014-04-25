function setCentre(){
	centreX = canvas.width/2;
	centreY = canvas.height/2;
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

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	scaleDrawing();
	for (var i = 0; i < grids.length; i++){
		// If it cannot be seen, do not attempt to draw it
		if(grids[i].width*scale >= 1) {
			ctx.strokeStyle = darkBlue;
			ctx.globalAlpha = grids[i].opacity;
			ctx.beginPath();
				ctx.rect(centreX+grids[i].xOffset*scale, centreY+grids[i].yOffset*scale, grids[i].width*scale, grids[i].width*scale);
				ctx.stroke();
			ctx.closePath();
			
			ctx.strokeStyle = lightBlue;
			ctx.globalAlpha = 1;
			ctx.beginPath();
				var lineStartX = centreX+grids[i].xLineStart*scale;
				var lineStartY = centreY+grids[i].yLineStart*scale; 
				ctx.moveTo(lineStartX, lineStartY);
				if(!grids[i].animated){
					grids[i].incrementLineLength();
					grids[i].incrementOpacity();
				}
				ctx.lineTo(lineStartX+grids[i].xLineTo*scale, lineStartY+grids[i].yLineTo*scale);
				ctx.stroke();
			ctx.closePath();
		}
		
		/*
		if(grids[i].isMouseOver()){
			ctx.fillStyle=lightBlue;
			ctx.fillText(this.value, mouseX + 10, mouseY - 10);
		}*/
	}
	if(grids[grids.length-1].animated){
		stepForward();
	}
	drawTitle();
	drawVersion();
	drawDebug();
}

function scaleDrawing(){
    if ((centreX+(minX*scale)<canvas.width*0.05) || (centreX+(maxX*scale)>canvas.width*0.95) || (centreY+(minY*scale)<canvas.height*0.05) || (centreY+(maxY*scale)>canvas.height*0.95)) {
		if (scale > 0) {
			scale=scale*0.9;
		}
	}
}

function drawTitle(){
	ctx.fillStyle=lightBlue;
	ctx.font="42px Arial";
	ctx.beginPath();	
		ctx.fillText("Fibonnaci-er", 15, 45);
	ctx.closePath();
}

function drawVersion(){
	ctx.fillStyle=red;
	ctx.font="10px Arial";
	ctx.beginPath();
		ctx.fillText(version, 15, canvas.height-15);
	ctx.closePath();
}

function drawDebug(){
	if(debug){
		ctx.fillStyle=red;
		ctx.font="10px Arial";
		ctx.beginPath();
			ctx.fillText("scale: " + scale, 15, 15);
			ctx.fillText("grids[" + (grids.length-1) + "]: " + grids[grids.length-1].orientation, 15, 30);
			ctx.fillText("xLineTo: " + grids[grids.length-1].xLineTo, 15, 45);
			ctx.fillText("yLineTo: " + grids[grids.length-1].yLineTo, 15, 60);
			ctx.fillText("width:" + grids[grids.length-1].width, 15, 75);
			ctx.fillText("animated: " + grids[grids.length-1].animated, 15, 90);
		ctx.closePath();
	}
}