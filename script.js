"use strict";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const planets = ["./Planets/1.png", "./Planets/2.png", "./Planets/3.png", "./Planets/4.png", "./Planets/5.png", "./Planets/6.png"];
const circles = [];
function getRandomImg() {
    return planets[Math.trunc(Math.random() * planets.length)];
}
function createCircle(x, y) {
    const newCircle = {
        x,
        y,
        width: 80,
        height: 80,
        radius: 40,
        speedY: 0,
        gravity: 0.1,
        dampening: 0.9,
        img: new Image,
        src: getRandomImg(),
        audio: new Audio
    };
    if (newCircle.x + newCircle.width > canvas.width) {
        newCircle.x = canvas.width - newCircle.radius - 25;
    }
    if (circles.length < 15) {
        newCircle.img.src = newCircle.src;
        newCircle.img.onload = () => { };
        newCircle.img.onerror = (error) => console.error(`Error loading image: ${error}`);
        newCircle.audio.src = "./Rings.mp3";
        newCircle.audio.oncanplaythrough = () => { };
        newCircle.audio.onerror = (error) => console.error(`Error loading audio: ${error}`);
        newCircle.audio.currentTime = 0;
        newCircle.audio.play();
        circles.push(newCircle);
    }
}
function update(circle) {
    circle.speedY += circle.gravity;
    circle.y += circle.speedY;
    if (circle.y + circle.radius > canvas.height) {
        circle.y = canvas.height - circle.radius;
        circle.speedY = -circle.speedY * circle.dampening;
    }
}
function draw() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.map(elem => {
            ctx.drawImage(elem.img, elem.x - 10, elem.y - 38, elem.width, elem.height);
        });
    }
}
function loop() {
    requestAnimationFrame(loop);
    circles.map(circle => {
        update(circle);
    });
    draw();
}
loop();
canvas.addEventListener("click", (event) => {
    createCircle(event.clientX, event.clientY);
});
