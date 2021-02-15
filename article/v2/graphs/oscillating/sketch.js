//make some simple axes with tick marks
//assumes a square canvas, but that could probably be changed

let dx = 0;
let dy = 0;


function setup() {
  createCanvas(200, 200);
  frameRate(30)
  createLoop({duration:5, gif:true})
}

function draw() {
  background(250);
  translate(width/2,height/2)
  //primary axes
  
  drawTickAxes(0,2,20,0,0, dx, dy)

  text("y", -12, -width/2+12)
  text("x", width/2-12, 12)
  text("z", -14, 14)

  ellipse(0, 0, 15)
  ellipse(0, 0, 2)

  stroke(200,0,0)
  line(Math.sqrt(15)+2, -Math.sqrt(15)-2, 60, -60)
  ellipse(60,-60,2)
  stroke(0)

  dx += 0.2
  dy += 0.2
}

function drawTickAxes(lineColor, thickness, spacing, xoffset, yoffset, dx,dy) {
 
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
    wiggle = (2 + cos(dx/5))
    stroke(this.lineColor);
     line(+3,i*wiggle,-3,i*wiggle);
     line(+3,-i*wiggle,-3,-i*wiggle);
		
			stroke(120,120,120,40);
      strokeWeight(1);
      line(-width/2, i*wiggle, +width/2, i*wiggle)
      line(-width/2, -i*wiggle, +width/2, -i*wiggle)
		
    stroke(this.lineColor);
    //horizontal tickmarks
    wiggle = (2 + 0.3*sin(dy/5))

     line(i*wiggle,+3,i*wiggle,-3)
     line(-i*wiggle,+3,-i*wiggle,-3)
      
     stroke(120,120,120,30);
      strokeWeight(1);
      line(i*wiggle, -width/2, i*wiggle,  +width/2);
      line(-i*wiggle, -width/2, -i*wiggle,  +width/2);
		
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
