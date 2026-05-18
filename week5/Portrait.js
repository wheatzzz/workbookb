let stamps = [];
let currentColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pickNewColor();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200, 215, 235);

  let cx = width / 2;
  let cy = height / 2;
  let s = min(width, height) / 400;


  push();
  translate(cx, cy);
  scale(s);

 
  fill(255, 238, 215);
  stroke(70);
  strokeWeight(2);
  ellipse(0, 0, 220, 250);


  fill(120, 90, 70);
  noStroke();
  rect(-65, -30, 40, 8, 2);
  rect(25, -30, 40, 8, 2);


  fill(50);
  ellipse(-40, -5, 16, 16);
  ellipse(40, -5, 16, 16);


  fill(255);
  ellipse(-40, -5, 6, 6);
  ellipse(40, -5, 6, 6);


  noFill();
  stroke(90, 70, 50);
  rect(-6, 15, 12, 40, 3);


  noStroke();
  fill(255, 180, 190, 140);
  ellipse(-55, 45, 35, 28);
  ellipse(50, 50, 28, 24);


  fill(255, 170, 150);
  stroke(90);
  beginShape();
  vertex(-20, 85);
  vertex(0, 75);
  vertex(25, 85);
  vertex(0, 100);
  endShape(CLOSE);

  pop();


  noStroke();
  for (let s of stamps) {
    fill(s.col); 
    ellipse(s.x, s.y, s.size);
  }


  fill(50);
  textAlign(CENTER);
  textSize(22);
  text("Draw me a cool hairstyle", width / 2, 40);

  textSize(14);
  fill(80);
 text("Press C to clear  ·  Press S to save", width / 2, height - 30);

}


function mouseDragged() {
  stamps.push({
    x: mouseX,
    y: mouseY,
    size: random(15, 30),
    col: currentColor
  });
}

function mousePressed() {
  pickNewColor();
}


function pickNewColor() {
  currentColor = color(
    random([100, 255]),
    random([100, 255]),
    random([100, 255])
  );
}


function keyPressed() {
  if (key === 'c' || key === 'C') {
    stamps = [];
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    stamps = [];
  }
  if (key === 's' || key === 'S') {
    saveCanvas('mai-new-hair', 'png');
  }
}