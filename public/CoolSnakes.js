let canvas, ctx, width, height;

let x;
let y;

let angle;

function mark(x, y) {
    ctx.strokeStyle = "red";
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();
}

function drawNextSegment() {

    //fade last
    ctx.fillStyle = "#00000005";
    ctx.fillRect(0, 0, 800, 800);

    let dist = Math.random() * 100 + 30;

    let hue = performance.now() / 10 % 360

    ctx.strokeStyle = `hsl(${hue},100%,70%`;

    //line
    let nextX = x + Math.cos(angle) * dist;
    let nextY = y + Math.sin(angle) * dist;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nextX, nextY);
    ctx.stroke();

    let nextAngle = (angle + Math.ceil(Math.random() * 3) * 0.7853981634) % (Math.PI * 2);

    let cornerRad = Math.random() * 50 + 10;

    let cornerCenterX = nextX + (Math.cos(angle + Math.PI / 2)) * cornerRad;
    let cornerCenterY = nextY + (Math.sin(angle + Math.PI / 2)) * cornerRad;

    // mark(cornerCenterX, cornerCenterY);

    ctx.beginPath();
    ctx.arc(cornerCenterX, cornerCenterY, cornerRad, angle - Math.PI / 2, nextAngle - Math.PI / 2, false);
    ctx.stroke();

    //set to arc endpoint
    x = cornerCenterX + Math.cos(nextAngle - Math.PI / 2) * cornerRad;
    y = cornerCenterY + Math.sin(nextAngle - Math.PI / 2) * cornerRad;

    // mark(x, y);

    angle = nextAngle;

    if (x > width || x < 0 || y > height || y < 0) {
        x = width / 2;
        y = height / 2;
        angle = (Math.floor(Math.random() * 9) - 4) * 0.7853981634;
    }
}

function render(d) {

    drawNextSegment();

    requestAnimationFrame(render)
}

function initSnakes() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;

    ctx.fillStyle = "black"
    ctx.strokeStyle = "#29ff7e"
    ctx.lineWidth = 4;

    ctx.fillRect(0, 0, width, height);

    x = width / 2;
    y = height / 2;
    angle = (Math.floor(Math.random() * 9) - 4) * 0.7853981634;

    render();
}

window.addEventListener('load', function () {
    initSnakes();
})