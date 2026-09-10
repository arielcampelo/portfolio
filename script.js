// Mobile Hamburger Toggle
const burguerButton = document.querySelector('.burguer-button');
const navbarLinks = document.querySelector('.navbar-links');

if (burguerButton) {
  burguerButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
  });
}

// Close mobile menu on link click
document.querySelectorAll('.navbar-links a').forEach(anchor => {
  anchor.addEventListener('click', () => {
    if (navbarLinks.classList.contains('active')) {
      navbarLinks.classList.remove('active');
    }
  });
});

// Email Copy to Clipboard Button
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyToast = document.getElementById('copyToast');

if (copyEmailBtn && copyToast) {
  copyEmailBtn.addEventListener('click', () => {
    const email = "rieocampelo@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      copyToast.textContent = "Copied!";
      copyToast.style.color = "#34d399";
      setTimeout(() => {
        copyToast.textContent = "Copy";
        copyToast.style.color = "";
      }, 2500);
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  });
}

// Particle Graph Canvas Background
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let particles = [];
  let particleDistance = 65;
  let mouse = {
    x: undefined,
    y: undefined,
    radius: 120
  };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.size = Math.random() * 1.5 + 1;
      this.speed = (Math.random() * 10) + 3;
    }

    draw() {
      ctx.fillStyle = "rgba(192, 132, 252, 0.6)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      if (mouse.x !== undefined && mouse.y !== undefined) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let directionX = forceDirectionX * force * this.speed;
          let directionY = forceDirectionY * force * this.speed;

          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 12;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 12;
          }
        }
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 12;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 12;
        }
      }
    }
  }

  function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];

    const cols = Math.floor(w / particleDistance);
    const rows = Math.floor(h / particleDistance);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = (x * particleDistance) + (particleDistance / 2);
        const posY = (y * particleDistance) + (particleDistance / 2);
        particles.push(new Particle(posX, posY));
      }
    }
  }

  function drawLines() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < particleDistance * 1.4) {
          let opacity = (1 - (distance / (particleDistance * 1.4))) * 0.15;
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animationLoop() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    drawLines();
    requestAnimationFrame(animationLoop);
  }

  init();
  animationLoop();

  window.addEventListener('resize', () => {
    init();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });
});