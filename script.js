const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const stars = [];
const maxStars = 300;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Star {
  constructor() {
    this.angle = Math.random() * 2 * Math.PI;
    this.radius = randomRange(50, Math.min(centerX, centerY));
    this.size = randomRange(0.5, 1.5);
    this.speed = randomRange(0.001, 0.003);
    this.alpha = randomRange(0.3, 1);
    this.alphaChange = randomRange(0.005, 0.02);
  }

  update() {
    this.angle += this.speed;
    if (this.angle > 2 * Math.PI) this.angle -= 2 * Math.PI;

    this.alpha += this.alphaChange;
    if (this.alpha <= 0.3 || this.alpha >= 1) this.alphaChange = -this.alphaChange;
  }

  draw() {
    const x = centerX + this.radius * Math.cos(this.angle);
    const y = centerY + this.radius * Math.sin(this.angle);
    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.fill();
  }
}

function initStars() {
  for (let i = 0; i < maxStars; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

initStars();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}); S