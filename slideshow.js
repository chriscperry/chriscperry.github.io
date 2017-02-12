var slides = [];
var bg = 255

var desX = 0,
    imgX = 0;

var index = 0;


function preload() {
println("loading images...")
slides = [loadImage("assets/portableEnvironmentsCover.png"),createVideo("assets/Broccoli.mp4"),createVideo("assets/wis.mp4")]
titles = ["Portable","Scale in","Procedural"]

slides[1].loop();
slides[1].hide();

slides[2].loop();
slides[2].hide();

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
	setupCanvas();
    rectMode(CENTER);
    drawSlides();
    drawTitle(index);


}



function mousePressed() {
    desX -= width;
    index++;
}

function drawSlides() {
    imgX += .05 * (desX - imgX);
    push();
    noStroke();
    translate(imgX, 0);
    rectMode(CENTER)
    textAlign(CENTER);
    for(var x = 0; x < slides.length; x++){
    	drawSlide(x,width * x,0)
    }
    pop();
}

function drawSlide(n,x,y){
    image(slides[n],x,y,width,height)
}

function drawTitle(n){
    fill(255);
    textSize(100);
    textAlign(RIGHT);
    t = ""
    if(n < titles.length){
        t = titles[n]
    }
    text(t,width * .45, height*.5);
    textAlign(LEFT);
    text(" Environments",width * .45, height*.5);





}