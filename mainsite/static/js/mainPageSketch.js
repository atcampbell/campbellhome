var cx, cy;
var freq01, mod01, sinAngle01, amp01;
var freq02, mod02, sinAngle02, amp02;
var circRad;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  // createCanvas(windowWidth, windowHeight);
	canvas.parent('mainSketch');

  cx = windowWidth/2;
  cy = windowHeight/2;

	amp01 = 0.2;
	sinAngle01 = 0;
	mod01 = 0;
	freq01 = 0.004;

	amp02 = -0.3;
	sinAngle02 = 0;
	mod02 = 0;
	freq02 = 0.003;

	// TODO this:
	circRad = 325;
	strokeWeight(4);
	// or this if smaller
	// circRad = 300;
	// strokeWeight(3);

	stroke(255);
}

function draw() {
  background(46, 0, 238);

	// TODO make a circle class which calls the line draw function
  // and updates its sin values
  // OR do array of these values and update each one...
	mod01 = sin(sinAngle01);
	sinAngle01 += freq01;
	mod01 *= amp01;

	mod02 = sin(sinAngle02);
	sinAngle02 += freq02;
	mod02 *= amp02;

  push();
  translate(cx ,cy);
  rotate(mod01);
  lineDraw(5.0, circRad, 0, 0);
  pop();

  push();
  translate(cx+50,cy-50);
  rotate(mod02);
  lineDraw(4.5, circRad, 0, 0)
  pop();
}

// could store these in an array and then rotate them
// would be more efficient
function lineDraw(angle, radius, cx, cy) {
  for (var i = -180; i < 0; i+=angle) {
    if (i > -170 && i < -10) {
      line((cx + cos(radians(i)) * radius),
        (cy + sin(radians(i)) * radius),
        (cx + cos(radians(-i)) * radius),
        (cy + sin(radians(-i)) * radius));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	cx = windowWidth/2;
	cy = windowHeight/2;
}
