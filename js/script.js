/* =====================================================
   PARTÍCULAS DE ENERGÍA
   Canvas permite dibujar animaciones con JavaScript.
   getElementById busca el canvas por su id y getContext("2d") obtiene el pincel de dibujo.
   ===================================================== */

const canvas = document.getElementById("energyParticles");
const ctx = canvas.getContext("2d");

let particles = [];
let width = 0;
let height = 0;

/* Ajusta el Canvas al tamaño del banner.
   getBoundingClientRect obtiene el tamaño real del Hero. */
function resizeCanvas() {
    const hero = document.querySelector(".hero");
    const rect = hero.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

/* Crea UNA partícula.
   x,y=posición | size=tamaño | speed=velocidad | alpha=transparencia */
function createParticle(initial = false) {
    const center = width * 0.5;
    const spread = Math.min(width * 0.28, 360);

    return {
        x: center + (Math.random() - 0.5) * spread,
        y: initial ? Math.random() * height : height + Math.random() * 60,

        size: 1 + Math.random() * 2.2,
        speed: 0.4 + Math.random() * 1.5,
        drift: (Math.random() - 0.5) * 0.5,
        alpha: 0.2 + Math.random() * 0.6,
        hue: Math.random() > 0.3 ? 329 : 271
    };
}

/* Crea el grupo completo de partículas con Array.from. */
function buildParticles() {
    const total = Math.max(35, Math.min(100, Math.floor(width / 12)));

    particles = Array.from(
        { length: total },
        () => createParticle(true)
    );
}

/* Dibuja y mueve las partículas.
   requestAnimationFrame repite esta función para crear movimiento fluido. */
function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, index) => {
        p.y -= p.speed;
        p.x += p.drift;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle =
            `hsla(${p.hue}, 100%, 68%, ${p.alpha})`;

        ctx.shadowBlur = 14;
        ctx.shadowColor =
            `hsla(${p.hue}, 100%, 60%, .8)`;

        ctx.fill();

        if (p.y < -20) {
            particles[index] = createParticle(false);
        }
    });

    ctx.shadowBlur = 0;

    requestAnimationFrame(animateParticles);
}

/* Inicia el efecto: ajusta tamaño, crea partículas y comienza la animación. */
function startParticles() {
    resizeCanvas();
    buildParticles();
    animateParticles();
}

window.addEventListener("resize", () => {
    resizeCanvas();
    buildParticles();
});

startParticles();
