const burguerButton = document.getElementsByClassName('burguer-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

burguerButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });


document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
        
    let w, h, particles;
    let particleDistance = 40;
    let mouse = {
            x: undefined,
            y: undefined,
            radius:90
        }
        
    function init() {
            resizeReset();
            animationLoop();
        }
        
    function resizeReset() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        
            particles = [];
            for (let y = (((h - particleDistance) % particleDistance) + particleDistance) / 2; y < h; y += particleDistance) {
                for (let x = (((w - particleDistance) % particleDistance) + particleDistance) / 2; x < w; x += particleDistance) {
                    particles.push(new Particle(x, y));
                }
            }
        }
        
    function animationLoop() {
            ctx.clearRect(0, 0, w, h);
            drawScene();
            requestAnimationFrame(animationLoop);
            ctx.fillStyle = 'rgba(15, 15, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
    function drawScene() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            drawLine();
        }
        
    function drawLine() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
        
                    if (distance < particleDistance * 1.5) {
                        opacity = 1 - (distance / (particleDistance * 1.5));
                        ctx.strokeStyle = "rgba(255,255,255," + opacity + ")";
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
    function mousemove(e) {
            mouse.x = e.x;
            mouse.y = e.y;
        }
        
    function mouseout() {
            mouse.x = undefined;
            mouse.y = undefined;
        }
        
    class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.speed = (Math.random() * 10) + 5;
            }
            draw() {
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let directionX = forceDirectionX * force * this.speed;
                let directionY = forceDirectionY * force * this.speed;
        
                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }
        
    init();
    window.addEventListener("resize", resizeReset);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);
});