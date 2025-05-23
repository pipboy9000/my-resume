
let ctx;
let canvas;
// let scrollY = 0;

let stars = [];

function init() {
    canvas = document.getElementById('starfield');
    ctx = canvas.getContext("2d");

    for (let i = 0; i < 1000; i++) {
        let op = Math.random();
        if (op < 0.95) op /= 3;
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() / 1.5 + 0.1,
            opacity: op,
            size: Math.random() * 3
        });
    }

    animate();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
        ctx.fill
    });
}

function move() {
    stars.forEach((star) => {
        star.x += star.speed;
        if (star.x > canvas.width) {
            star.x = 0;
            star.y = Math.random() * canvas.height;
        }
    });
}

function animate() {
    move();
    draw();
    requestAnimationFrame(animate);
}

window.addEventListener('load', function () {
    init();
});

// document.addEventListener('scroll', function (e) {
//     console.log(window.scrollY);
// });