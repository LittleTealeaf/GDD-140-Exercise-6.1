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
  background(220);
  const item_width = width / data.length;


  const building_girth = 0.8;
  const max_height = height * 0.9;

  const offset = (1 - building_girth) / 2  * item_width;



  const max = data.reduce((p,c) => Math.max(p,c.height),0);
  

  for(var i = 0; i < data.length; i++) {
    const val = data[i];
    const height_percentage = val.height / max;
    
    rect(item_width * i + offset, height,item_width * building_girth,-max_height * height_percentage);

    // text(val.name,item_width * i + offset + 20,height - 50);
    // text(val.location,item_width * i + offset + 20, height - 25);
    push();
    translate(item_width * (i + 1) - offset,height);
    rotate(-HALF_PI);
    translate(10,-10);
    textSize(25);
    text(val.name + ", " + val.location,0,0);
    pop();

  }
}


function loadData(array) {
  fetch('./data.csv').then(response => response.text()).then(data => {
    data.split("\n").forEach((line) => array.push(new Building(line)));
  });
}