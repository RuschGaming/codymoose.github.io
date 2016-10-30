var midR = 60;
var outR = 20;
var ratio = midR / outR;
var theta = -90;
var points = [{th: 0, ph: 0}];
var midSlider;
var outSlider;
var midDiv;
var outDiv;

function setup() {
  angleMode(DEGREES);
  createCanvas(400,400);
  background(51);
  outSlider = createSlider(-75,75,20,1);
  outSlider.position(0,0);
  
  midSlider = createSlider(1,75,60,1);
  midSlider.position(0,25);
  
  var sliderWidth = midSlider.width;
  
  outDiv = createDiv(outR);
  outDiv.position(sliderWidth + 10, 0);
  outDiv.style('color','white');
  
  midDiv = createDiv(midR);
  midDiv.position(sliderWidth + 10, 25);
  midDiv.style('color','white');
}

function draw() {
  if(outR != outSlider.value() || midR != midSlider.value()){
    theta = -90;
    points = [{x:0,y:0}];
    outR = outSlider.value();
    midR = midSlider.value();
    ratio = midR / outR;
    points1 = [{th: 0, ph: 0}];
    
    outDiv.html(outR);
    midDiv.html(midR);
  }
  translate(width/2,height/2);
  background(51);
  noFill();
  stroke(255);
  ellipse(0, 0, midR * 2);
  ellipse((midR + outR) * cos(theta), (midR + outR) * sin(theta), outR * 2);
  var p = {th: theta - 90, ph: theta * ratio + 90 * ratio - 180};
  //println(points.length);
  //if(points.length <= 1440){
  //  var overlap = false;
  //  for(var i = 0; i < points.length; i++)
  //    if(dist(p.x,p.y,points[i].x,points[i].y) <= 1 && points.length - i >= 36)
  //      overlap = true;
  //  if(!overlap)
      points.push(p);
  //}
  stroke(255);
  noFill();
  for(var i = 1; i < points.length; i++){
    push();
    rotate(points[i].th);
    translate(0, midR + outR);
    rotate(points[i].ph);
    ellipse(0, outR, 0);
    pop();
  }
  
  stroke(255);
  push();
    rotate(p.th);
    translate(0, midR + outR);
    rotate(p.ph);
    line(0,0,0,outR);
  pop();
  
  theta ++;
}