 var data = {};
var txtObject = [];
var cnt = 0;

function temboo(keyword) {
	println(keyword);
	var temboo = new TembooProxy('proxy-server.php');
	var tweetsChoreo = temboo.addChoreo('jsTweets');
	// Add inputs
	tweetsChoreo.setInput('Query', 'enditall');
	tweetsChoreo.setInput('ConsumerKey', 'DZ6qUWHf9frRExGtsRgcwJNIm');
	tweetsChoreo.setInput('AccessToken', '522627179-T25msQQsv0nRbT0xCpSksBdXEPXKPLgRWW3asl18');
	tweetsChoreo.setInput('ConsumerSecret', 'nghiCHUpvNUIzO2N5ZBHYw8o2GDeEzBIRwOa63JttImli8JtyQ');
	tweetsChoreo.setInput('AccessTokenSecret', 'RAjtoXuycMmbzfR4FX3cMm8YjNFC3QrPF1Z2NslIaza8y');

	// Success callback
	var showResult = function(outputs, outputFilters) {
		data = JSON.parse(outputs.Response);
		println(data);
		dobj = data.statuses;
		for (var i = 0; i < dobj.length; i++) {
			println(dobj[i].text);
			txtObject[cnt] = {
				t: dobj[i].text,
				x: random(windowWidth),
				y: random(windowHeight),
				t: data.statuses[i].text,
				r: data.statuses[i].text.split(" ").length,
				ax: random(-1,1),
				ay: random(-1,1),

				render: function() {
					this.x += this.ax;
					this.y += this.ay;
					if(this.x<this.r*.5 || this.x > width-this.r*.5) this.ax *= -1;
					if(this.y<this.r*.5 || this.y > height-this.r*.5) this.ay *= -1;

					push();
					noFill();
					stroke(255);
					strokeWeight(2);
					ellipse(this.x,this.y,this.r);
					pop();
					if(dist(mouseX,mouseY,this.x,this.y)<10){
						text(this.t,this.x,this.y+20)
					}
					// for (var j = 0; j < words.length; j++) {
					// 	text(words[j], this.x, this.y + ln);
					// 	ln += 12;
					// }
				}
			}
			cnt++;
		}
	};

	// var showResult = function(outputs, outputFilters) {
	// 	data = JSON.parse(outputs.Response);
	// 	println(data);

	// };

	var showError = function(error) {
		if (error.type === 'DisallowedInput') {
			console.log(error.type + ' error: ' + error.inputName);
		} else {
			console.log(error.type + ' error: ' + error.message);
		}
	};
	tweetsChoreo.execute(showResult, showError);
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	textAlign(CENTER);
	fill(255);
	if (data != null) console.log(data);
}
var counter = 0;
var queries = ["Nothing", "Anything", "Someone", "Help"];

function mousePressed() {
	temboo(queries[counter]);
	counter++;
}

function draw() {
	background("#EAC8E8");
	for (var i = 0; i < txtObject.length; i++) {
		txtObject[i].render();
	}
}