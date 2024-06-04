let customFont;
function preload() {
    customFont = loadFont("MartianMonoNerdFont-Bold.ttf");
}

// Took engine, world, bodies, and body from matter.js
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let words = [];
let ground, wallLeft, wallRight;

let wordsToDisplay = [
    "Apple",
    "Samsung",
    "Orange",
    "Microsoft",
    "Banana",
    "Google",
    "Mango",
    "Tesla",
    "Strawberry",
    "Amazon",
    "Pineapple",
    "Sony",
    "Grapes",
    "Intel",
    "Blueberry",
    "Nvidia",
    "Peach",
    "IBM",
    "Kiwi",
    "Adobe",
    "Raspberry",
    "HP",
    "Cherry",
    "Dell",
    "Watermelon",
    "Facebook",
    // "Blackberry",
    // "Cisco",
    // "Papaya",
    // "Oracle"
];

function setup() {
    createCanvas(windowWidth, windowHeight - 60);

    engine = Engine.create();
    ground = Bodies.rectangle(width / 2, height - 20, width, 10, {
        isStatic: true,
    });

    wallLeft = Bodies.rectangle(0, height / 2, 5, height, {
        isStatic: true,
    });

    wallRight = Bodies.rectangle(width, height / 2, 5, height, {
        isStatic: true,
    });

    World.add(engine.world, [ground, wallLeft, wallRight]);

    let startX = 50; // Initial x position
    let startY = 50; // Initial y position
    let spacingY = 100; // Vertical spacing between words

    for (let i = 0; i < wordsToDisplay.length; i++) {
        words.push(new Word(random(width), random(-500, -50), wordsToDisplay[i]));
    }

    console.log("Total words: " + words.length); // Debugging
}

function draw() {
    background("#111111");
    Engine.update(engine);

    for (let word of words) {
        word.show();
    }
}

class Word {
    constructor(x, y, word) {
        const radius = Math.max(word.length * 10, 50); // Ensure a minimum radius for smaller words
        this.body = Bodies.circle(x, y, radius);
        this.word = word;
        this.radius = radius;

        // For random colors
        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        World.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        ellipseMode(RADIUS);

        // Apply the color
        fill(this.color);
        strokeWeight(0);
        ellipse(0, 0, this.radius); // Drawing the circle with radius
        noStroke();
        textFont(customFont);
        fill("#000");
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.word, 0, 0);
        pop();
    }
}

function mouseMoved() {
    for (let word of words) {
        if (dist(mouseX, mouseY, word.body.position.x, word.body.position.y) < word.radius) {
            Body.applyForce(
                word.body,
                { x: word.body.position.x, y: word.body.position.y },
                { x: random(-0.3, 0.3), y: random(-0.3, 0.3) }
            );
        }
    }
}
