let data;
let nr_points;
let curve_bounds = [];
var all_points = [];
var all_data = {};

// preload table data
function preload() {
  data = loadTable(
    'final_data.csv',
		'csv',
      'header');

    inconsolata = loadFont('riffic-bold.ttf');
    
}


function setup() {
       
//createCanvas(1500, 2000) // displayWidth, displayHeight);
 createCanvas(windowWidth-10, windowHeight-10);
    ww = width
    wh = height
    // what are the columns?
    // console.log(data.columns);
    nr_points = data.getRowCount()

    for (let i = 0; i < data.getColumnCount(); i++) {
      all_points = [];
      for (let r = 0; r < nr_points; r++) {
      all_points.push(wh/2+data.getNum(r,i))       
     }
             all_data[data.columns[i]] = all_points

    }
    noLoop();
    
    
}

function draw() {
    background(30,0,0,255);

    textFont(inconsolata);
    textSize(32);
    
    curve_bounds[0] = ww/2-1200/2;    
    curve_bounds[1] = ww/2+1200/2;

    fill(0); // fill the curve
    stroke(225);
    strokeWeight(1);

    for (let i = 0; i < data.getColumnCount(); i++) {
      
    text(curve_bounds[1], 20*i) //, x2, y2)
    beginShape()
     for (let r = 0; r < nr_points; r++) {
      curveVertex(curve_bounds[0]+1/i*r/1.1, wh/3-20*i + all_data[data.columns[i]][r]);
      
     }
     endShape();
}
}


function keyTyped() {
  if (key === 's') {
    saveCanvas('mycanvas', 'png')
  }
}