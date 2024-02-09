import p5 from 'p5';

import './style.css';

interface _1D {
  x: number;
}

interface _2D extends _1D {
  y: number;
}

class Escalar implements _1D {
  x: number;
  constructor (x: number) {
    this.x = x;
  }
}

class Vector extends Escalar implements _2D {
  y: number;
  constructor (x: number, y: number) {
    super(x);
    this.y = y;
  }
  get magnitude (): number {
    let a2 = (n: number) => Math.pow(n, 2);
    return Math.sqrt(a2(this.x) + a2(this.y));
  }
  set magnitude (m: number) {

  }
  get direction (): number {
    let {x, y} = this;
    let pad = 0;
    if (x >= 0) {
      if (y >= 0) {
        // +x +y nada
      } else {
        // +x -y 
      }
    } else {
      if (y >= 0) {
        // -x +y
      } else {
        // -x -y
      }
    }
    return Math.atan(y/x);
  }
}

class Grilla {
  constructor(p: p5, desde: _2D, hasta: _2D) {
    let color1 = p.color(255)
    let color2 = p.color(100)
    let color3 = p.color(50)
    function setStyle(i: number) {
      if (i % (1600/2) == 0) {
        p.strokeWeight(4);
        p.stroke(color1);
      } else if (i % (1600/(2*5)) == 0) {
        p.strokeWeight(3);
        p.stroke(color2);
      } else {
        p.strokeWeight(3
          );
        p.stroke(color3);
      }
    }
    for (let i = desde.x; i <= hasta.x; i += 16*2) {
      setStyle(i);
      p.line(i, desde.y, i, hasta.y);
    }
    for (let i = desde.y; i <= hasta.y; i += 16*2) {
      setStyle(i);
      p.line(desde.x, i, hasta.x, i);
    }
  }
}


const _app = new p5((p: p5) => {

  p.setup = function setup() {
    p.createCanvas(1600, 1600);
  };

  let transX = 0;
  let transY = 0;
  let rotX = 0;
  let rotY = 0;

  enum TransformMode {
    Translate,
    Rotate
  }

  let transformMode: TransformMode = TransformMode.Translate;

  p.draw = function draw() {
    p.background(0);
    p.translate(this.width/2, this.height/2);
    p.push();
    p.translate(transX, transY);
    // p.rotateX(1);
    p.rotate(Math.PI * rotY * 0.001);
    
    new Grilla(p, { x: -1600, y: -800}, { x: 1600, y: 800});

    p.text(0, 10, 20);

    if (p.mouseIsPressed) {
      if (transformMode == TransformMode.Rotate) {
        rotX += p.mouseX - p.pmouseX;
        rotY += p.mouseY - p.pmouseY;
      } else if (transformMode == TransformMode.Translate) {
        transX += p.mouseX - p.pmouseX;
        transY += p.mouseY - p.pmouseY;
      }
    }
    p.pop();
  };



  // change mode
  p.keyTyped = function() {
    if (this.key.toUpperCase() == 'T') {
      transformMode = TransformMode.Translate;
    } else if (this.key.toUpperCase() == 'R') {
      transformMode = TransformMode.Rotate;
    }
  }


}, document.getElementById('app')!);