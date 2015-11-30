int xPos = 300;
int yPos = 300;
int dy = 4;

void setup() { 
  size(600,600);
}

void draw() {
  background(255);
  fill(255,0,0);
  ellipse(xPos, yPos,10,10);
  
  //make it bounce
  yPos += dy;  //yPos = yPos + dy;
  if (yPos > height) {
    dy *= -1;  //dy = dy * -1
  }
  if (yPos < height/2) {
    dy *= -1;  //dy = dy * -1
  }
  
}

