var images = [];
var bg = "#FF00FF"

function preload() {

}

function setupCanvas(){
	w = min(windowWidth,1920);
	h = w * (9/16);
	var canvas = createCanvas(w,h);
	canvas.parent('sketch-holder');
	background(bg);
}

function setup() {
	setupCanvas()
}

function draw() {
	setupCanvas()

}