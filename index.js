// global variables - you can tweak them and play with them in any way you want.
const numberOfCircles = 400;
const circleRadius = 5;
const circleColors = ['#F75C03', '#FFD50C', '#01C8EF', '#2274A5'];

//----------------------------------------------------------------//

const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const mouse = {
  x: undefined,
  y: undefined,
  setPosition: function (x, y) {
    this.x = x;
    this.y = y;
  },
};

window.addEventListener('mousemove', (e) => {
  const {x, y} = e;
  mouse.setPosition(x, y);
});
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Circle {
  constructor(radius, colors, x, y, dx, dy) {
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.x =
      x === undefined
        ? radius + Math.random() * (window.innerWidth - radius * 2)
        : x;
    this.y =
      y === undefined
        ? radius + Math.random() * (window.innerHeight - radius * 2)
        : y;
    this.dx = dx === undefined ? (Math.random() - 0.5) * 5 : dx;
    this.dy = dy === undefined ? (Math.random() - 0.5) * 5 : dy;
  }

  draw() {
    const {x, y, radius, color} = this;
    c.fillStyle = color;
    c.beginPath(); // it is important to call this method at the beginning of drawing anything, because it separates the current path from the previous one.
    c.arc(x, y, radius, 0, 2 * Math.PI, false);
    c.fill();
  }

  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx *= -1;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy *= -1;
    }
    if (
      Math.abs(mouse.x - this.x) < 120 &&
      Math.abs(mouse.y - this.y) < 120 &&
      this.radius < this.minRadius * 10
    ) {
      this.radius += 2;
    } else if (
      this.radius > this.minRadius &&
      !(Math.abs(mouse.x - this.x) < 120 && Math.abs(mouse.y - this.y) < 120)
    ) {
      this.radius -= 1;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const circleList = [];

for (let i = 0; i < numberOfCircles; i++) {
  circleList.push(new Circle(circleRadius, circleColors));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleList.forEach((circle) => {
    circle.update();
  });
}
animate();
