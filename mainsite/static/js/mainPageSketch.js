// function setup() {
// 	fill(255,50,50);
// 	createCanvas(600,400);
// 	line(25, 15, 400, 400);
// }

// function setup() {
// 	var canvas = createCanvas(windowWidth,windowHeight);
// 	// canvas.position(0,0);
// 	canvas.parent('ske');
// 	background(255,100,100);
// 	// fill(0,100,255);
// 	// ellipse(100,100,width,height);
// }

var ccx, ccy;
var rad, angle, thick;
var freq, mod, sinAngle, amp;
var grad1, grad2;

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('mainSketch');
	strokeWeight(2);
	rad = 300;
	ccx = width/2;
	ccy = height/2;
	angle= 5;

	amp = 0.2;

	sinAngle = 0;
	mod = 0;
	freq = 0.09;

	// light yellow - blue
	// grad1 = color(200, 220, 172);
	// grad2 = color(143, 214, 218);

	// aqua - pink 02
 	// grad1 = color(161, 209, 195);
	// grad2 = color(220, 199, 182);

	// aqua - pink
	// grad1 = color(124, 207, 187);
	// grad2 = color(255, 154, 167);

	// light blue - purple
	grad1 = color(180, 235, 235);
	grad2 = color(235, 210, 235);
}

function draw() {
	//   sinFreq01 = sinFreq01 * 0.09 + 0.04;

	//   sinModulate = sin(sinAngle);
	//   sinAngle += sinFreq01;

	// background(255);

	// first attempt at lerp()
	// var grad1L = color(Math.ceil(lerp(180, 161, 0.5)), Math.ceil(lerp(235, 209, 0.5)), Math.ceil(lerp(235, 195, 0.9)));
	// var grad2L = color(Math.ceil(lerp(235, 220, 0.5)), Math.ceil(lerp(210, 199, 0.5)), Math.ceil(lerp(235, 182, 0.1)));

	setGradient(0, 0, width/2, height, grad1, grad2);
  setGradient(0, 0, width, height, grad1, grad2);
	// setGradient(0, 0, width, height, grad1L, grad2L);


	// make this into a function so can have several
	freq = freq * 0.09 + 0.04;
	mod = sin(sinAngle);
	sinAngle += freq;

	mod *= amp;

	// console.log(mod);
	var rampMod = map(mod, -0.2, 0.2, -0.5, 0.5);
	rad += rampMod;

	push();
	translate(20,20);
	stroke(0);
	bezCircle(angle, rad, ccx, ccy, mod);
	pop();

	// // thickness changin here
	// // set strokeWeight to whatever it is
	// translate(width/2-20 height/2+20);
	// push();
	// // so think this should be coming from a different sine
	// // rotate()
	// // had more radius changing stuff in here
	// // bezierCircle
	// pop();
}

function setGradient(x, y, w, h, c1, c2) {

	noFill();

	for (var i = y; i <= y+h; i++) {
  		var inter = map(i, y, y+h, 0, 1);
  		var c = lerpColor(c1, c2, inter);
  		stroke(c);
  		line(x, i, x+w, i);
	}
}

function bezCircle(angle,radius,cx,cy,sinIn) {

	for (var i = -180; i < 180; i += angle) {

		// calculate line lineLength
		var lineLength = (cy + sin(radians(i)) * (radius)) - (cy + sin(radians(-i)) * (radius));
		// var lineLength = 10;

		// this misses out a couple of lines?? maybe just chenge bounds but it looks ok...
		if (i > -170 && i < -10) {
		// else {
			bezier (
				(cx + cos(radians(i)) * (radius)),
				(cy + sin(radians(i)) * (radius)),

	      		(cx + cos(radians(i)) * (radius)) + ((lineLength/4) * sinIn),
	      		(cy + sin(radians(i)) * (radius)) - ((lineLength/4)),

	      		(cx + cos(radians(-i)) * (radius)) - ((lineLength/4) * sinIn),
	      		(cy + sin(radians(-i)) * (radius)) + ((lineLength/4)),

	      		(cx + cos(radians(-i)) * (radius)),
	      		(cy + sin(radians(-i)) * (radius))
			)
		}
	}
}
