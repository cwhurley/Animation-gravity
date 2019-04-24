import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight - 60;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
var gravity = 1;
var friction = 0.7;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('touchstart', function (e) {
    // Cache the client X/Y coordinates
    init();
}, false);

addEventListener('touchend', function (e) {
    var deltaX, deltaY;

    // Compute the change in X and Y coordinates. 
    // The first touch point in the changedTouches
    // list is the touch point that was just removed from the surface.
    mouse.x = e.changedTouches[0].clientX - clientX;
    mouse.y = e.changedTouches[0].clientY - clientY;

    // Process the data ... 
}, false);

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight - 60;

    init()
})

addEventListener("click", function () {
    init();
})

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
}

Object.prototype.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
}

Object.prototype.update = function () {
    if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction;
    } else {
        this.dy += gravity;
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
        this.dx = -this.dx
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
}

// Implementation
let objects
var ball;
var ballArray = [];
function init() {
    ballArray = [];
    for (var i = 0; i < 400; i++) {
        var radius = utils.randomIntFromRange(8, 20);
        var x = utils.randomIntFromRange(radius, canvas.width - radius);
        var y = utils.randomIntFromRange(0, canvas.height - radius)
        var dx = utils.randomIntFromRange(-2, 2);
        var dy = utils.randomIntFromRange(-2, 2);
        var color = utils.randomColor(colors);
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
    objects = []

    for (let i = 0; i < 400; i++) {
        // objects.push();
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    for (var i = 0; 1 < ballArray.length; i++) {
        ballArray[i].update();
    }
    // objects.forEach(object => {
    //  object.update();
    // });
}

init()
animate()
