function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textSize(60);
  frameRate(10);
}


function draw() {
  background(0, 16);
  random(105), random(105), random(105);
  circle(mouseX, mouseY, random(120));
  textSize(random(70));
  stroke(255);
  strokeWeight(5);

}
