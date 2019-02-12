'use strict';
const HEIGHT = window.innerHeight - 10;
const WIDTH = window.innerWidth - 10;

const unitX = Math.PI/2;
const unitY = 1;

const func = x => sin(x);

let zoomSlider;
let aSlider;
let bSlider;
let nSlider;

function setup() {
    createCanvas(WIDTH, HEIGHT);

    background("#eee");
    
    zoomSlider = createSlider(1, 150, 150);
    aSlider = createSlider(-50, 50, -15);
    bSlider = createSlider(-50, 50, 20);
    nSlider = createSlider(1, 30, 4);

    zoomSlider.position(20, 20);
    aSlider.position(20, 50);
    bSlider.position(20, 80);
    nSlider.position(20, 110);
}
  
function draw() {
    const zoom = zoomSlider.value();
    const a = aSlider.value() / 10;
    const b = bSlider.value() / 10;
    const n = nSlider.value();

    background("#fff");

    translate(WIDTH/2, HEIGHT/2);

    // unitX
    stroke("#e5d5d5");
    for(let k = 1; k < Math.ceil(WIDTH / (unitX * zoom) / 2); k++){
        line(k * unitX * zoom,  HEIGHT/2, 
             k * unitX * zoom, -HEIGHT/2);

        line(-k * unitX * zoom,  HEIGHT/2, 
             -k * unitX * zoom, -HEIGHT/2);
    }

    // unitY
    for(let k = 1; k < Math.ceil(HEIGHT / (unitY * zoom) / 2); k++){
        line(-WIDTH/2, k * unitY * zoom, 
             WIDTH/2,  k * unitY * zoom);
        
        line(-WIDTH/2, -k * unitY * zoom, 
             WIDTH/2,  -k * unitY * zoom);
    }

    // X
    stroke("#f00");
    line(-WIDTH/2, 0,
          WIDTH/2, 0);
    
    // Y
    line(0, -HEIGHT/2, 
         0,  HEIGHT/2);
         
    // X = a
    stroke("#0f0");
    line(a * zoom, -HEIGHT/2, 
        a * zoom,  HEIGHT/2);

    // X = b
    stroke("#00f");
    line(b * zoom, -HEIGHT/2, 
        b * zoom,  HEIGHT/2);

    // plot function
    stroke(0);
    for(let x = -WIDTH/2; x < WIDTH/2 * zoom; x++){
        point(x, zoom * -func(x / zoom));
    }

    // integral
    const dx = (b - a) / n;

    // intervals
    noFill();
    stroke(0, 0, 0, 127);
    for(let i = 1; i < n; i++){
        let x0 = a + i * dx;
        
        line(x0 * zoom, 0, 
            x0 * zoom,  -func(x0) * zoom);
    }

    let area = 0;
    
    for(let i = 0; i < n; i++){
        let x0 = a + i * dx;
        let x1 = a + (i + 1) * dx;
        let c = (x0 + x1) / 2;

        noStroke();
        fill(255, 127, 0, 127);
        rect(x0 * zoom, 0, dx * zoom, -func(c) * zoom);

        noFill();
        stroke(255, 0, 0, 75);
        line(c * zoom, 0, 
            c * zoom, -func(c) * zoom);
            
        area += func(c) * dx;
    }
    
    // slider text
    translate(-WIDTH/2, -HEIGHT/2);
    stroke("transparent");
    fill(0);
    text('zoom:' + zoom + '%', zoomSlider.x * 2 + zoomSlider.width, 30);
    text('a: ' + a, aSlider.x * 2 + aSlider.width, 60);
    text('b: ' + b, bSlider.x * 2 + bSlider.width, 90);
    text('n: ' + n, nSlider.x * 2 + nSlider.width, 120);
    text('∫: ' + area, nSlider.x * 2 + nSlider.width, 150);
}