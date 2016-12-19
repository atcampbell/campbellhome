var cx, cy;
var freq01, mod01, sinAngle01, amp01;
var freq02, mod02, sinAngle02, amp02;
var circRad;

function setup() {
  // init canvas and assign to container
  var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('mainSketch');

  // centre the circles for transform
  cx = windowWidth/2;
  cy = windowHeight/2;

  // parameters for rotating the circles
	amp01 = 0.2;
	sinAngle01 = 0;
	mod01 = 0;
	freq01 = 0.004;

	amp02 = -0.3; // - for reverse direction
	sinAngle02 = 0;
	mod02 = 0;
	freq02 = 0.003;

  // radius of circles
	circRad = 325;

  // thickness and colour of lines
  strokeWeight(4);
	stroke(255);
}

function draw() {
  background(46, 0, 238);

  // mod variables used to rotate circles using sin function
	mod01 = sin(sinAngle01);
	sinAngle01 += freq01;
	mod01 *= amp01;

	mod02 = sin(sinAngle02);
	sinAngle02 += freq02;
	mod02 *= amp02;

  // transform circles
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

// draw line between points around circle
function lineDraw(angle, radius, cx, cy) {
  for (var i = -180; i < 0; i+=angle) {
    // cuts dense lines at circle edges
    if (i > -170 && i < -10) {
      line((cx + cos(radians(i)) * radius),
        (cy + sin(radians(i)) * radius),
        (cx + cos(radians(-i)) * radius),
        (cy + sin(radians(-i)) * radius));
    }
  }
}

// redraw on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	cx = windowWidth/2;
	cy = windowHeight/2;
}
