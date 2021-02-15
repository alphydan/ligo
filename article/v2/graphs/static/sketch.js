//make some simple axes with tick marks
//assumes a square canvas, but that could probably be changed

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250);
  translate(width/2,height/2)
  //primary axes
  drawTickAxes(0,2,20,0,0)

  text("y", -12, -width/2+12)
  text("x", width/2-12, 12)
  text("z", -14, 14)

  ellipse(0, 0, 15)
  ellipse(0, 0, 2)

  stroke(200,0,0)
  line(Math.sqrt(15)+2, -Math.sqrt(15)-2, 60, -60)
  ellipse(60,-60,2)
  stroke(0)
}

function drawTickAxes(lineColor, thickness, spacing, xoffset, yoffset) {
 
	this.lineColor = lineColor;
  this.thickness = thickness;
  this.spacing = spacing;
  this.xoffset = xoffset;
  this.yoffset = yoffset;
 
	push();
	translate(this.xoffset,this.yoffset)
  stroke(this.lineColor)
  
  for (var i = 0; i<height/2; i+=this.spacing){
    
     
    //vertical tickmarks
    stroke(this.lineColor);
     line(+3,i,-3,i);
     line(+3,-i,-3,-i);
		
			stroke(120,120,120,40);
      strokeWeight(1);
      line(-width/2, i, +width/2, i)
      line(-width/2, -i, +width/2, -i)
		
    stroke(this.lineColor);
		//horizontal tickmarks
     line(3*i,+3,3*i,-3)
     line(-3*i,+3,-3*i,-3)
      
     stroke(120,120,120,30);
      strokeWeight(1);
      line(3*i, -width/2, 3*i,  +width/2);
      line(-3*i, -width/2, -3*i,  +width/2);
		
  }
  
	stroke(this.lineColor)
  strokeWeight(this.thickness);
  //horizontal line
  line(-width/2,0,+width/2,0)
  //vertical line
  line(0,height/2,0,-height/2)

  pop();

}

function keyTyped() {
  if (key === 's') {
    saveCanvas('axes', 'png')
  }
}
