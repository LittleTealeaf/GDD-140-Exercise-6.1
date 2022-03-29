/// <reference path="./libraries/p5.global-mode.d.ts" />

class Building {
  constructor(line) {
    var vals = line.split(",");
    this.name = vals[0];
    this.location = vals[1].substring(1);
    this.height = parseInt(vals[2].split(" ")[1]);
  }
}

const data = [];

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  loadData(data);
}

function draw() {
  background('#5555FF');
  fill('green');
  noStroke();
  rect(0,height,width,-20);
  
  const item_width = width / data.length;
  const building_girth = 0.8;
  const max_height = height * 0.9;
  const offset = (1 - building_girth) / 2  * item_width;
  const max = data.reduce((p,c) => Math.max(p,c.height),0);  

  for(var i = 0; i < data.length; i++) {
    const val = data[i];
    const height_percentage = val.height / max;
    
    stroke(1);
    fill('grey');
    rect(item_width * i + offset, height,item_width * building_girth,-max_height * height_percentage);

    push();
    fill('white');
    translate(item_width * (i + 1) - offset,height);
    rotate(-HALF_PI);
    translate(10,-10);
    textSize(25);
    text(val.name + ", " + val.location,0,0);
    pop();

    push();
    translate(item_width * i + offset,height - max_height * height_percentage);
    
    fill('#FFFFFF');
    textSize(30);
    text(val.height + " ft",0,0);

    pop();
  }
}


function loadData(array) {
  fetch('./data.csv').then(response => response.text()).then(data => {
    data.split("\n").forEach((line) => array.push(new Building(line)));
  });
}
