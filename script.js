// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
});

// Global Variables
const config = {
    particleColor: '#00f7ff',
    particleCount: 100,
    connectionDistance: 100,
    matrixSpeed: 30,
    typingSpeed: 100
};

// Utility Functions
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Neural Network Background Animation
class NeuralNetworkAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.getElementById('neural-network-bg').appendChild(this.canvas);
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 2
            });
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = config.particleColor;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 247, 255, ${1 - distance/config.connectionDistance})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
        });
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawConnections();
        this.particles.forEach(particle => this.drawParticle(particle));
        requestAnimationFrame(this.animate);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];
        this.createParticles();
    }
}

// Matrix Rain Animation
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.querySelector('.matrix-rain').appendChild(this.canvas);
        
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.fontSize = 16;
        this.columns = this.canvas.width/this.fontSize;
        this.drops = [];

        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }

        this.startAnimation();
    }

    draw() {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    startAnimation() {
        setInterval(() => this.draw(), config.matrixSpeed);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width/this.fontSize;
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }
}

// Typewriter Effect
class TypewriterEffect {
    constructor(element, text, delay = config.typingSpeed) {
        this.element = element;
        this.text = text;
        this.delay = delay;
        this.currentChar = 0;
        this.start();
    }

    type() {
        if (this.currentChar < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentChar);
            this.currentChar++;
            setTimeout(() => this.type(), this.delay);
        }
    }

    start() {
        this.element.textContent = '';
        setTimeout(() => this.type(), 500);
    }
}

// Navigation and Scroll Handling
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupNavHighlight();
        this.setupNavbarScroll();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupNavHighlight() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
            
            if (currentScroll > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Footer Particles Animation
class FooterParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = 400;
        document.querySelector('.footer-particles').appendChild(this.canvas);
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x > this.canvas.width) particle.x = 0;
            else if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            else if (particle.y < 0) particle.y = this.canvas.height;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            this.ctx.fillStyle = 'rgba(0, 247, 255, 0.5)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate = () => {
        this.update();
        this.draw();
        requestAnimationFrame(this.animate);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.particles = [];
        this.createParticles();
    }
}

// Initialize Everything
let neuralNetwork, matrixRain, navigation, footerParticles;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and features
    neuralNetwork = new NeuralNetworkAnimation();
    matrixRain = new MatrixRain();
    navigation = new Navigation();
    footerParticles = new FooterParticles();

    // Initialize typewriter effects
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (subtitleElement) {
        new TypewriterEffect(subtitleElement, subtitleElement.textContent);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    neuralNetwork?.resize();
    matrixRain?.resize();
    footerParticles?.resize();
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations
    } else {
        // Resume animations
    }
});
