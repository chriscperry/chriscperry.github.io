var img;
var boxes = [];

function preload() {
    img = loadImage("./assets/politics.png");
    //myFont = loadFont('assets/open_sans/OpenSans-Regular.ttf');

}

function setup() {
    createCanvas(900, 300);
    colorMode(HSB,100);
    createHashtag();
    background("#4D4D4D");
    rectMode(CENTER);
    for (var i = 0; i < boxes.length; i++){
        drawBox(boxes[i]);
    }
    println(boxes.length);
}

function draw() {
    background("#4D4D4D");
    rectMode(CENTER);
    for (var i = 0; i < boxes.length; i++){
        moveBox(boxes[i]);
        drawBox(boxes[i]);
        pushBox(boxes[i]);
        resizeBox(boxes[i]);
        bringForward(i);
    }
}

function mouseMoved() {

    // for (var i = 0; i < boxes.length; i++){
    //     pushBox(boxes[i]);
    // }
}

function createHashtag() {
    img.resize(width, height);
    for (var x = 10; x < width; x += 10) {
        for (var y = 10; y < height; y += 10) {
            ox = x + random(-3,3);
            oy = y + random(-3,3);
            
            if (img.get(ox, oy)[0] < 10) {
                boxes.push(createBox(ox, oy));
            }
        }
    }
}

function bringForward(i){
    if(boxes[i].w > 200 && i < boxes.length-2){
        boxes.push(boxes.splice(i,1)[0]);
    }
}

function resizeBox(b){
    b.w2 = min(500,max(b.wh,1/dist(b.cx,b.cy,mouseX,mouseY)*1000))
    b.h2 = min(100,max(b.wh,1/dist(b.cx,b.cy,mouseX,mouseY)*200))
}

function pushBox(b){
 b.md = dist(b.x,b.y,mouseX,mouseY);
 b.t = - Math.atan2(mouseX-b.x,mouseY-b.y) - PI/2;
 
 /*
 if(abs(x-d)>.01) x += a*(d-x);
 
 */
}

function moveBox(b){
    b.x += b.v * Math.cos(b.t);
    b.y += b.v * Math.sin(b.t);
    //b.v = .03
    b.x = (2 * b.x + b.cx) / 3;
    b.y = (2 * b.y + b.cy) / 3;
    b.w = (2 * b.w + b.w2) / 3;
    b.h = (2 * b.h + b.h2) / 3;

}

function drawBox(b) {
    fill("#4D4D4D");
    stroke(b.f);
    strokeWeight(constrain((b.h)*.1,0,10));
    rect(b.x,b.y,b.w,b.h);
    fill(100);
    textSize(b.h/4);
    noStroke();
    text(b.txt,b.x,b.y,b.w*.9,b.h*.8);
}

function createBox(x, y) {
    colorMode(HSB)
    wh = 10 + random(-3,3);
    return {
        x: x,
        y: y,
        cx: x,
        cy: y,
        md: 0, // distance from mouse
        a: 0, // accelleration
        v: 5, // velocity
        t: 0, // theta
        wh: wh,
        w: wh, // width
        h: wh, // height
        w2: wh,
        h2: wh,
        f: color(random(50,100), 50, 100),
        s: color(100), // stroke
        sw: .5,
        txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
    }
}