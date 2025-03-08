// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Neural Network Background
const createNeuralNetwork = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('neural-network-bg').appendChild(canvas);

    const particles = [];
    const particleCount = 100;
    const connectionDistance = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00f7ff';
            ctx.fill();
            ctx.closePath();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();

            // Draw connections
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 247, 255, ${1 - distance/connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.closePath();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
};

// Matrix Rain Effect
const createMatrixRain = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.querySelector('.matrix-rain').appendChild(canvas);

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width/fontSize;

    const rainDrops = [];

    for( let x = 0; x < columns; x++ ) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 30);
};

// Typewriter Effect
const createTypewriter = () => {
    const text = document.querySelector('.hero-subtitle');
    const strText = text.textContent;
    text.textContent = '';

    const splitText = strText.split('');
    let charIndex = 0;

    const typeEffect = () => {
        if(charIndex < splitText.length) {
            text.textContent += splitText[charIndex];
            charIndex++;
            setTimeout(typeEffect, 100);
        }
    };

    setTimeout(typeEffect, 500);
};

// Circular Menu Animation
const initializeCircularMenu = () => {
    const menuItems = document.querySelectorAll('.nav-link');
    menuItems.forEach((item, index) => {
        item.style.setProperty('--item-number', index);
    });
};

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Nav Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Footer Particles
const createFooterParticles = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 400;
    document.querySelector('.footer-particles').appendChild(canvas);

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if(this.x > canvas.width) this.x = 0;
            else if(this.x < 0) this.x = canvas.width;
            if(this.y > canvas.height) this.y = 0;
            else if(this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 247, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for(let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createNeuralNetwork();
    createMatrixRain();
    createTypewriter();
    initializeCircularMenu();
    createFooterParticles();
});

// Handle window resize
window.addEventListener('resize', () => {
    createNeuralNetwork();
    createMatrixRain();
    createFooterParticles();
});
