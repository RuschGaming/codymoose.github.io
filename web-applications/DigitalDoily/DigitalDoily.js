var sectors = 30;
var sectorAngle = 360 / sectors;
var pMX;
var pMY;
var myCanvas;
var resetBtn;
var sectorSlider;
var sectorDiv;
var r = 255;
var g = 255;
var b = 255;
var rSlider;
var rDiv;
var gSlider;
var gDiv;
var bSlider;
var bDiv;
var downloadBtn;
var toggleBtn;
var w = window.innerWidth;
var h = window.innerHeight;

function setup(){
	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	angleMode(DEGREES);
	myCanvas = createCanvas(600,600);
	translate(width / 2, height / 2);
	reset();
	resetBtn = createButton("Reset");
	resetBtn.position(5, height + 5);
	resetBtn.mousePressed(reset);
	sectorSlider = createSlider(1,45,30,1);
	sectorSlider.position(resetBtn.x, resetBtn.y + resetBtn.height + 5)
	sectorDiv = createDiv("Sectors: " + sectors);
	sectorDiv.position(sectorSlider.x + sectorSlider.width + 5, sectorSlider.y);

	rSlider = createSlider(0,255,255,1);
	rSlider.position(sectorSlider.x, sectorSlider.y + sectorSlider.height + 5)
	rDiv = createDiv("Red: " + r);
	rDiv.position(rSlider.x + rSlider.width + 5, rSlider.y);

	gSlider = createSlider(0,255,255,1);
	gSlider.position(rSlider.x, rSlider.y + rSlider.height + 5)
	gDiv = createDiv("Green: " + g);
	gDiv.position(gSlider.x + gSlider.width + 5, gSlider.y);

	bSlider = createSlider(0,255,255,1);
	bSlider.position(gSlider.x, gSlider.y + gSlider.height + 5)
	bDiv = createDiv("Blue: " + b);
	bDiv.position(bSlider.x + bSlider.width + 5, bSlider.y);
	
	toggleBtn = createButton("Toggle Canvas Size");
	toggleBtn.position(bSlider.x, bSlider.y + bSlider.height + 5);
	toggleBtn.mousePressed(toggleSize);
	
	downloadBtn = createButton("Download");
	downloadBtn.position(toggleBtn.x + toggleBtn.width + 5, bSlider.y + bSlider.height + 5);
	downloadBtn.mousePressed(download);
}

function draw() {
	translate(width/2,height/2);
	if(sectors != sectorSlider.value()){
		sectors = sectorSlider.value();
		sectorAngle = 360 / sectors;
		sectorDiv.html("Sectors: " + sectors);
		reset();
	}
	
	if(r != rSlider.value() || g != gSlider.value() || b != bSlider.value()){
		r = rSlider.value();
		g = gSlider.value();
		b = bSlider.value();
		rDiv.html("Red: " + r);
		gDiv.html("Green: " + g);
		bDiv.html("Blue: " + b);
	}
	stroke(r,g,b);
	pMX = mouseX - width / 2;
	pMY = mouseY - height / 2;
}

function mouseDragged() {
	if(mouseX <= width && mouseY <= height) {
		push();
		for(var i = 0; i < sectors; i++){
			line(pMX, pMY, mouseX - width / 2, mouseY - height / 2);
			rotate(sectorAngle);
		}
		pop();
		
		push();
		for(var i = 0; i < sectors; i++){
			line(pMY, pMX, mouseY - height / 2, mouseX - width / 2);
			rotate(sectorAngle);
		}
		pop();
	}
}

function reset(){
	background(51);
	stroke(100);	
	push();
	for(var i = 0; i < sectors; i++){
		line(0, 0, width, height);
		rotate(sectorAngle);
	}
	pop();
}

function download() {
	saveCanvas(myCanvas,'DigitalDoily', 'jpg');
}

function toggleSize() {
	if(myCanvas.width == 600){
		myCanvas.size(w, h);
	} else {
		myCanvas.size(600, 600);	
	}
	translate(width/2,height/2);
	reset();
	

	resetBtn.position(5, height + 5);
	sectorSlider.position(resetBtn.x, resetBtn.y + resetBtn.height + 5)
	sectorDiv.position(sectorSlider.x + sectorSlider.width + 5, sectorSlider.y);
	rSlider.position(sectorSlider.x, sectorSlider.y + sectorSlider.height + 5)
	rDiv.position(rSlider.x + rSlider.width + 5, rSlider.y);
	gSlider.position(rSlider.x, rSlider.y + rSlider.height + 5)
	gDiv.position(gSlider.x + gSlider.width + 5, gSlider.y);
	bSlider.position(gSlider.x, gSlider.y + gSlider.height + 5)
	bDiv.position(bSlider.x + bSlider.width + 5, bSlider.y);
	toggleBtn.position(bSlider.x, bSlider.y + bSlider.height + 5);
	downloadBtn.position(toggleBtn.x + toggleBtn.width + 5, bSlider.y + bSlider.height + 5);
}