let rectX = 400;
let rectY = 440;
let playerDir = 1;

let level = 0;
let spikeX = 200;
let difficulty = "normal";

let platformX = 200;
let platformY = 400;
let platformY2 = 230;
let platformXSpeed = -1.5;
let platformYSpeed = -1.5;

let health = 99;
let healthPack = false;
let velocity = 0;
let gravity = 0.8;

let bulletX = -100;
let bulletY = -100;
let bulletFired = false;
let lastShot = 0;
let bulletDir = 0;

let enemyX = 600;
let enemyY = 400;
let enemyHealth = 100;
let enemyBulletX = 680;
let enemyBulletY = 440;
let enemyBullet = true;
let lastEnemyShot = 0;

let checkPoint1 = false;
let timer = 0;

let lavaY = 470;
let lavaRise = false;
let checkPoint2 = false;

let asteroidY = -100;
let checkPoint3 = false;

let bossStart = false;
let bossY = -300;
let bossHealth = 99;
let bossRound = 1;
let enemySide = "right";
let bossDamage = false;

function preload() {
    cloud2 = loadImage('cloud2.png');
    cloud3 = loadImage('cloud3.png');
    heart = loadImage('heart.png');
    warning = loadImage('warning.png');
    asteroid = loadImage('asteroid.png');
    eyesRight = loadImage('eyesRight.png');
    eyesLeft = loadImage('eyesLeft.png');
    mouthAngry = loadImage('mouthAngry.png');
    mouthHurt = loadImage('mouthHurt.png');
    sword = loadImage('sword.png');

    forestMusic = loadSound('forestmusic.mp3');
    caveMusic = loadSound('cavemusic.mp3');
    volcanoMusic = loadSound('volcanomusic.mp3');
    bossMusic = loadSound('bossmusic.mp3');
    gun = loadSound('gun.mp3');
    victory = loadSound('victory.mp3');
} //end preload

function setup() {
    createCanvas(800, 500);

    forestMusic.setVolume(0.7);
    caveMusic.setVolume(0.7);
    volcanoMusic.setVolume(0.7);
    bossMusic.setVolume(0.7);
    victory.setVolume(0.7);
} //end setup

function draw() {
    if (level == 0 || level == 1 || level == 2 || level == 3) {
        background(135, 205, 235);
    } else if (level == 4 || level == 5 || level == 6) {
        background(100, 100, 100);
    } else if (level == 7 || level == 8 || level == 9) {
        background(105, 20, 20);
    } else if (level == 11 || level == 10) {
        background(135, 205, 235);
    } //end background

    if (level == 0 || level == 1 || level == 2 || level == 3) {
        fill(20, 110, 20);
    } else if (level == 4 || level == 5 || level == 6) {
        fill(125, 65, 0);
    } else if (level == 7 || level == 8 || level == 9) {
        fill(125, 125, 125);
    } else if (level == 11 || level == 10) {
        fill(20, 110, 20);
    } //end fill

    noStroke();
    rectMode(CENTER);
    rect(400, 475, 800, 50);

    if (level == 0 || level == 1 || level == 2 || level == 3) {
        image(cloud2, 300, 20, 200, 100);
        image(cloud3, 600, 20, 200, 100);

        fill(125, 65, 0);
        stroke(0);
        rect(100, 435, 10, 30);
        rect(50, 435, 10, 30);
        rect(710, 435, 10, 30);
        rect(750, 435, 10, 30);

        fill(20, 110, 20);
        triangle(70, 420, 30, 420, 50, 360);
        triangle(120, 420, 80, 420, 100, 340);
        triangle(720, 420, 780, 420, 750, 340);
        triangle(690, 420, 730, 420, 710, 380);
    } else if (level == 7 || level == 8 || level == 9) {
        fill(50, 35, 35, 180);
        stroke(0, 0, 0, 180);
        triangle(150, 450, 600, 450, 375, 200);

        fill(105, 20, 20,);
        noStroke();
        ellipse(375, 225, 80, 50);
    } //end decoration

    playerRect();
    healthBar();

    fill(0);
    textAlign(CENTER);
    textSize(25);
    textFont("Audiowide");

    if (level == 0) {
        text("Welcome to my platformer game \nby Abdul Machiwala\n'a' to move left 'd' to move right\n'w' to jump and spacebar to shoot \n 'n' for normal mode and 'h' for hard mode", width / 2, 150);

        if (key == "n") {
            difficulty = "normal"
            health = 99;
        } if (key == "h") {
            difficulty = "hard"
            health = 33;
        } //end hard mode
    } else if (level == 1) {
        text("Level 1 - The Forest", 162, 120);

        for (i = 0; i < 20; i++) {
            spike(i * 20 + 170);
        } //end for

        platform(160, 420, 0, 0);
        platform(250, 380, 0, 0);
        platform(340, 340, 0, 0);
        platform(440, 340, 0, 0);
        platform(540, 340, 0, 0);

        if (rectX > 200 && rectX < 620 && rectY > 430) {
            health -= 33
            rectX = 20;
        } //end spikes
    } else if (level == 2) {
        text("Level 2 - The Forest", 162, 120);

        fill(135, 205, 235);
        noStroke();
        rect(140, 450, 500, 50);

        platformX += platformXSpeed

        platform(platformX, 458, platformXSpeed, 0);
        platform(platformX + 30, 458, platformXSpeed, 0);

        if (platformX < 165) {
            platformXSpeed = +1.5;
        } else if (platformX > 585) {
            platformXSpeed = -1.5;
        } //end moving platform

        stroke(0);
        strokeWeight(1);

        if (rectX > 140 && rectX < 640 && rectY > 475) {
            health -= 33
            rectX = 20;
            rectY = 440;
            velocity = 0;
        } //end level 2 death

        if (healthPack == false && difficulty == "normal") {
            image(heart, 720, 430, 20, 20);
        } //end if

        if (rectX > 730 && healthPack == false && difficulty == "normal") {
            health += 33;
            healthPack = true;
            if (health > 99) {
                health = 99;
                healthPack = true;
            } //end max health
        } //end health pack

        enemy(680, 440, -1);
    } else if (level == 3) {
        text("Level 3 - The Forest", 162, 120);

        platform(170, 420, 0, 0);
        platform(330, 320, 0, 0);
        platform(490, 220, 0, 0);

        for (i = 0; i < 16; i++) {
            spike(i * 20 + 190);
        } //end for

        if (rectX > 215 && rectX < 555 && rectY > 430) {
            health -= 33
            rectX = 20;
        } //end spikes

        fill(0, 0, 255);
        arc(185, 412, 20, 20, PI, TWO_PI);
        arc(345, 312, 20, 20, PI, TWO_PI);

        if (dist(rectX, rectY, 185, 412) < 20) {
            velocity = -18;
        } else if (dist(rectX, rectY, 345, 312) < 20) {
            velocity = -18;
        } //end jump pad
    } else if (level == 4) {
        text("Level 4 - The Cave", 155, 120);

        if (difficulty == "normal") {
            fill(0);
            stroke(255, 215, 0);
            rect(30, 390, 10, 60);
            fill(255, 215, 0);
            triangle(40, 420, 60, 405, 40, 390);
        } //end checkpoint1

        fill(125, 65, 0);
        stroke(0);
        rect(565, 193, 10, 257);
        rect(675, 93, 10, 317);

        if (rectX > 550 && rectX < 560 && rectY > 200) {
            rectX = 550;
        } //end left wall
        if (rectX < 580 && rectX > 570 && rectY > 200) {
            rectX = 580;
        } //end left wall

        if (rectY < 420) {
            if (rectX > 670 && rectX < 675) {
                rectX = 670;
            } //end right wall
            if (rectX < 690 && rectX > 675) {
                rectX = 690;
            } //end right wall
        } //end if

        fill(255, 0, 0);

        triangle(575, 285, 630, 295, 575, 305);

        triangle(675, 195, 620, 205, 675, 215);
        triangle(675, 385, 620, 395, 675, 405);

        if (rectX > 570 && rectX < 625) {
            if (rectY > 280 && rectY < 310) {
                health -= 33;
                rectX = 20;
            } //end wall spike 1
        } //end if

        if (rectX > 625 && rectX < 680) {
            if (rectY > 190 && rectY < 220) {
                health -= 33;
                rectX = 20;
            } //end wall spike 2

            if (rectY > 380 && rectY < 410) {
                health -= 33;
                rectX = 20;
            } //end wall spike 3
        } //end if

        fill(125, 65, 0);
        noStroke();
        rectMode(CENTER);
        rect(400, 475, 800, 50);

        stroke(0);
        platform(160, 400, 0, 0);
        platform(100, 350, 0, 0);
        platform(160, 300, 0, 0);
        platform(100, 250, 0, 0);
        platform(160, 200, 0, 0);
        platform(540, 200, 0, 0);

        platformY += platformYSpeed
        noStroke();
        platform(600, platformY, 0, platformYSpeed);
        platform(650, platformY, 0, platformYSpeed);
        platformYSpeed;

        if (platformY < 200) {
            platformYSpeed = +1.5;
        } else if (platformY > 460) {
            platformYSpeed = -1.5;
        } //end moving platform

        platformX += platformXSpeed
        stroke(0);
        platform(platformX, 200, platformXSpeed, 0);

        if (platformX < 210) {
            platformXSpeed = +1.5;
        } else if (platformX > 490) {
            platformXSpeed = -1.5;
        } //end moving platform

        enemy(540, 182, -1);

        for (i = 0; i < 17; i++) {
            spike(i * 20 + 170);
        } //end for

        if (rectX > 205 && rectX < 565 && rectY > 430) {
            health -= 33
            rectX = 20;
        } //end spikes
    } else if (level == 5) {
        text("Level 5 - The Cave", 155, 120);

        fill(100, 100, 100);
        noStroke();
        rect(140, 450, 500, 50);

        stroke(0);
        platform(240, platformY + 30, 0, 0);
        platform(380, platformY + 30, 0, 0);
        platform(520, platformY + 30, 0, 0);

        if (rectY > 500) {
            health -= 33;
            rectX = 20;
            rectY = 440;

            platformY = 400;
            timer = 0;
        } //end death

        if (healthPack == false && difficulty == "normal") {
            image(heart, 720, 430, 20, 20);
        } //end heart

        if (rectX > 730 && healthPack == false && difficulty == "normal") {
            health += 33;
            healthPack = true;
            if (health > 99) {
                health = 99;
                healthPack = true;
            } //end max health
        } //end health pack

        if (rectY == platformY + 12 || rectY == platformY + 30 - 18) {
            if ((rectX > 210 && rectX < 270) || (rectX > 350 && rectX < 410) || (rectX > 490 && rectX < 550)) {
                timer++;
            } //end collision
        } //end collision

        if (timer > 0 && timer < 50 && rectX < 600) {
            image(warning, 215, 440, 50, 50);
            image(warning, 355, 440, 50, 50);
            image(warning, 495, 440, 50, 50);
        } //end warning

        if (timer >= 60) {
            platformY += 10;
        } //end falling platform
    } else if (level == 6) {
        text("Level 6 - The Cave", 155, 120);

        platform(775, 400, 0, 0);
        platform(775, 300, 0, 0);
        platform(775, 200, 0, 0);

        platform(120, 400, 0, 0);
        platform(120, 300, 0, 0);
        platform(120, 200, 0, 0);

        platform(40, 350, 0, 0);
        platform(40, 250, 0, 0);

        for (i = 0; i < 30; i++) {
            spike(i * 20 + 120);
        } //end for

        if (rectX > 155 && rectX < 800 && rectY > 430) {
            health -= 33
            rectX = 20;
            platformY = 400;
            timer = 0;
        } //end spikes

        if (rectX < 600) {
            fill(0);
            rect(770, 382, 15, 20);
            rect(770, 282, 15, 20);
            rect(770, 182, 15, 20);
        } //end unkillable enemies

        platform(250, platformY, 0, 0);
        platform(380, platformY, 0, 0);
        platform(510, platformY, 0, 0);
        platform(640, 400, 0, 0);

        if (rectX > 200 && rectX < 600 && rectY > 300) {
            timer++;

            if (timer > 0 && timer < 200 && rectX < 600) {
                image(warning, 225, 340, 50, 50);
                image(warning, 355, 340, 50, 50);
                image(warning, 485, 340, 50, 50);
            } //end warning
        } //end timer

        if (timer >= 140) {
            platformY += 10;
        } //end falling platform

        if (rectX < 610) {
            fill(235, 205, 10);
            rect(enemyBulletX - 20, 377, 10, 10);
            rect(enemyBulletX - 20, 277, 10, 10);

            rect(enemyBulletX * 1.5, 177, 10, 10);
            rect(enemyBulletX * 1.5 + 130, 177, 10, 10);
            enemyBulletX -= 6;

            if (enemyBulletX < -50) {
                enemyBulletX = 770;
            } //end reset bullet
        } //end if

        platform(250, 200, 0, 0);
        platform(380, 200, 0, 0);
        platform(510, 200, 0, 0);
        platform(640, 200, 0, 0);

        platformX += platformXSpeed
        noStroke();
        platform(platformX - 30, 300, platformXSpeed, 0);
        platform(platformX + 20, 300, platformXSpeed, 0);

        if (platformX < 200) {
            platformXSpeed = +2;
        } else if (platformX > 705) {
            platformXSpeed = -2;
        } //end moving platform

        fill(255, 0, 0);
        stroke(0);
        triangle(310, 292, 340, 292, 325, 280);
        triangle(510, 292, 540, 292, 525, 280);

        if (dist(rectX, rectY, enemyBulletX - 20, 377) < 20 || dist(rectX, rectY, enemyBulletX - 20, 277) < 20) {
            health -= 33;
            enemyBulletX = 770;
        } //end bullet collision

        if (dist(rectX, rectY, enemyBulletX * 1.5, 177) < 20 || dist(rectX, rectY, enemyBulletX * 1.5 + 130, 177) < 20) {
            health -= 33;
            enemyBulletX = 770;
        } //end bullet collision

        if (dist(rectX, rectY, 325, 280) < 15 || dist(rectX, rectY, 525, 280) < 15) {
            health -= 33;
            rectX = 20;
            timer = 0;
            platformY = 400;
        } //end moving platform spike collsion
    } else if (level == 7) {
        if (difficulty == "normal") {
            fill(0);
            stroke(255, 215, 0);
            rect(30, 390, 10, 60);
            fill(255, 215, 0);
            triangle(40, 420, 60, 405, 40, 390);
        } //end checkpoint2

        stroke(0);
        platform(160, 420, 0, 0);
        platform(260, 355, 0, 0);
        platform(360, 340, 0, 0);
        platform(460, 300, 0, 0);
        platform(560, 260, 0, 0);
        platform(670, 220, 0, 0);
        platform(560, 160, 0, 0);
        platform(460, 140, 0, 0);
        platform(360, 100, 0, 0);

        fill(0, 0, 255);
        arc(345, 92, 20, 20, PI, TWO_PI);

        if (dist(rectX, rectY, 345, 92) < 20) {
            velocity = -18;
        } //end jump pad

        if (rectX > width - 5) {
            rectX = width - 5;
        } //end right border

        fill(255, 100, 0);
        noStroke();
        rectMode(CORNER);
        rect(0, lavaY, 800, 1000)

        if (rectY < 350) {
            lavaRise = true;
        } //end lava rise

        if (lavaRise == true) {
            lavaY -= 0.8;
        } //end lava rise

        if (rectY > lavaY + 10) {
            health -= 33
            rectX = 20;
            rectY = 440;
            lavaY = 470;
            velocity = 0;
            lavaRise = false;
        } //end damage

        fill(0);
        stroke(0);
        text("Level 7 - Volcano", 145, 120);
        rectMode(CENTER);
        healthBar();
    } else if (level == 8) {
        if (healthPack == false && difficulty == "normal") {
            image(heart, 360, 200, 20, 20);
        } //end healthPack

        platformX += platformXSpeed
        platform(platformX, 420, platformXSpeed, 0);
        if (platformX < 220) {
            platformXSpeed = +2;
        } else if (platformX > 680) {
            platformXSpeed = -2;
        } //end moving platform

        if (rectY > 310) {
            enemy(730, 402, -1);
        } else {
            enemyHealth = 100;
            enemyBullet = true;
            enemy(730, enemyY - 228, -1);
        } //end second enemy

        platform(730, 420, 0, 0);

        platform(730, platformY2 - 40, 0, 0);
        platform(370, platformY2, 0, 0);
        if (rectX > 300 && rectX < 400 && rectY <= platformY2 - 18) {
            platformY2 -= 0.6;
            rectY -= 0.6;
            enemyY -= 0.6;
        } //end moving platforms

        if (rectX > 340 && rectX < 380 && rectY <= 200 && healthPack == false && difficulty == "normal") {
            health += 33;
            healthPack = true;

            if (health > 99) {
                health = 99;
                healthPack = true;
            } //end max health
        } //end healthPack

        platform(730, 350, 0, 0);
        platform(640, platformY - 80, 0, 0);
        platform(550, platformY - 110, 0, 0);
        platform(460, platformY - 140, 0, 0);

        if (rectX > 400 && rectX < 650 && rectY < 310) {
            timer++;

            if (timer > 0 && timer < 120 && rectX < 650) {
                image(warning, 435, 270, 50, 50);
                image(warning, 525, 300, 50, 50);
                image(warning, 615, 330, 50, 50);
            } //end warning
        } //end timer

        if (timer >= 110) {
            platformY += 10;
        } //end falling platform

        fill(255, 100, 0);
        noStroke();
        rectMode(CORNER);
        rect(0, lavaY, 800, 1000)
        rect(200, 450, 700, 30)

        if (rectX > width - 5) {
            rectX = width - 5;
        } //end right border

        if (lavaRise == false) {
            fill(150, 0, 0);
            stroke(0);
            rect(722, 162, 15, 20);

            fill(0);
            rectMode(CORNER);
            rect(700, 138, 60, 15);

            fill(255, 0, 0);
            rect(702, 141, 55, 10);
        } //end placeholder enemy

        if (rectY < 300) {
            lavaRise = true;
        } //end lava rise

        if (lavaRise == true) {
            lavaY -= 0.7;
        } //end lava rise

        if (rectY > lavaY + 10) {
            health -= 33;
            platformY2 = 230;
            rectX = 20;
            rectY = 440;
            lavaY = 470;
            velocity = 0;
            lavaRise = false;
            platformY = 400;
            enemyY = 400;
            timer = 0;
        } //end damage

        if (rectX > 200 && rectY == 440) {
            health -= 33
            platformY2 = 230;
            rectX = 20;
            rectY = 440;
            lavaY = 470;
            velocity = 0;
            lavaRise = false;
            platformY = 400;
            enemyY = 400;
            timer = 0;
        } //end damage

        fill(0);
        stroke(0);
        text("Level 8 - Volcano", 145, 120);
        rectMode(CENTER);
        healthBar();
    } else if (level == 9) {
        fill(255, 100, 0);
        noStroke();
        rectMode(CORNER);
        rect(0, lavaY, 800, 1000)

        fill(125, 125, 125);
        rect(0, lavaY - 20, 800, 20);

        if (rectX > width - 5) {
            rectX = width - 5;
        } //end right border

        if (rectX >= 400) {
            lavaRise = true;
        } //end lava rise

        if (lavaRise == true) {
            if (timer < 700) {
                lavaY -= 0.35;
            } else {
                lavaY -= 1;
            } //end lava rise

            timer++
        } //end lava rise

        if (timer > 0 && timer < 150) {
            image(warning, 100, lavaY - 100, 70, 70);
            image(warning, 350, lavaY - 100, 70, 70);
            image(warning, 600, lavaY - 100, 70, 70);
        } //end warning

        if (timer > 150 && timer < 210) {
            asteroidY += 10;
            image(asteroid, 83, asteroidY, 100, 100);
            image(asteroid, 333, asteroidY, 100, 100);
            image(asteroid, 583, asteroidY, 100, 100);

            if (dist(rectX, rectY, 83 + 50, asteroidY + 50) < 50 ||
                dist(rectX, rectY, 333 + 50, asteroidY + 50) < 50 ||
                dist(rectX, rectY, 583 + 50, asteroidY + 50) < 50) {

                health -= 33;
            } //end asteroid damage
        } //end asteroids 1

        if (timer > 220 && timer < 370) {
            asteroidY = -100;
            image(warning, 30, lavaY - 100, 70, 70);
            image(warning, 100, lavaY - 100, 70, 70);
            image(warning, 300, lavaY - 100, 70, 70);
            image(warning, 370, lavaY - 100, 70, 70);
            image(warning, 600, lavaY - 100, 70, 70);
            image(warning, 670, lavaY - 100, 70, 70);
        } //end warning

        if (timer > 370 && timer < 430) {
            asteroidY += 10;
            image(asteroid, 12, asteroidY, 100, 100);
            image(asteroid, 83, asteroidY, 100, 100);
            image(asteroid, 283, asteroidY, 100, 100);
            image(asteroid, 353, asteroidY, 100, 100);
            image(asteroid, 583, asteroidY, 100, 100);
            image(asteroid, 653, asteroidY, 100, 100);

            if (dist(rectX, rectY, 12 + 50, asteroidY + 50) < 50 ||
                dist(rectX, rectY, 83 + 50, asteroidY + 50) < 50 ||
                dist(rectX, rectY, 283 + 50, asteroidY + 50) < 50 ||
                dist(rectX, rectY, 353 + 50, asteroidY + 50) < 50 ||
                dist(rectX, rectY, 583 + 50, asteroidY + 50) < 50 ||
                dist(rectX, rectY, 653 + 50, asteroidY + 50) < 50) {

                health -= 33;
            } //end asteroid damage
        } //end asteroids 2

        if (timer > 440 && timer < 600) {
            asteroidY = -300;
            image(warning, 150, lavaY - 100, 70, 70);
            image(warning, 550, lavaY - 100, 70, 70);
        } //end warning

        if (timer > 600 && timer < 700) {
            asteroidY += 10;
            image(asteroid, 50, asteroidY, 300, 300);
            image(asteroid, 450, asteroidY, 300, 300);

            if (dist(rectX, rectY, 200, asteroidY + 150) < 130 ||
                dist(rectX, rectY, 600, asteroidY + 150) < 130) {

                health -= 33;
            } //end asteroid damage
        } //end asteroids 3

        fill(0);
        stroke(0);
        text("Level 9 - Volcano", 145, 120);
        rectMode(CENTER);
        healthBar();
    } else if (level == 10) {
        text("Level 10 - ???", 120, 120);

        if (difficulty == "normal") {
            fill(0);
            stroke(255, 215, 0);
            rect(30, 390, 10, 60);
            fill(255, 215, 0);
            triangle(40, 420, 60, 405, 40, 390);
        } //end checkpoint 3

        if (rectX > 400) {
            fill(135, 205, 235);
            noStroke();
            rect(140, 450, 500, 50);
        } //end hole
    } else if (level == 11) {
        if (rectY == 440) {
            bossStart = true;
        } //end boss

        if (rectX > width - 5) {
            rectX = width - 5;
        } //end right border

        if (bossStart) {
            rect(250, bossY, 250, 300);
            bossY += 10;

            if (bossY >= 150) {
                bossY = 150;

                if (rectX > 380) {
                    image(eyesRight, 255, 170, 250, 200);
                } else {
                    image(eyesLeft, 250, 165, 250, 200);
                } //end eyes

                image(mouthAngry, 275, 290, 200, 120);

                stroke(140, 0, 0);
                strokeWeight(10);
                line(300, 180, 340, 210);
                line(450, 180, 410, 210);
            } //end boss land

            fill(0);
            strokeWeight(1);
            stroke(0);
            text("Boss Health:", 610, 40);
            rect(521, 45, 215, 30);

            if (bossRound == 1) {
                timer++
                bossDamage = false;
                enemySide = "right"
                enemyHealth = 100;
                enemyBullet = true;

                if (timer > 60 && timer < 130) {
                    image(warning, 100, 370, 70, 70);
                    image(warning, 600, 370, 70, 70);
                } //end warning

                if (timer > 130 && timer < 280) {
                    asteroidY += 10;
                    image(asteroid, -20, asteroidY, 300, 300);
                    image(asteroid, 500, asteroidY, 300, 300);

                    if (dist(rectX, rectY, -20 + 150, asteroidY + 150) < 140 ||
                        dist(rectX, rectY, 500 + 150, asteroidY + 150) < 140) {
                        health -= 33;
                    } //end asteroid damage
                } //end asteroids
                if (timer > 280) {
                    bossRound = 2;
                    timer = 0;
                    asteroidY = -200;
                } //end boss round 2
            } else if (bossRound == 2) {
                timer++

                if (timer > 0 && timer < 100) {
                    image(warning, 340, 370, 70, 70);
                } //end warning

                if (timer > 100 && timer < 150) {
                    bossY -= 20;
                    if (bossY < 100) {
                        bossY = 100;
                    } //end boss jump
                } //end if

                if (timer > 150 && timer < 160 && rectX > 220 && rectX < 500) {
                    health -= 33;
                } //end jump damage

                if (timer > 170) {
                    bossRound = 3;
                    timer = 0;
                } //end boss round 3
            } else if (bossRound == 3) {
                timer++

                if (enemySide == "right") {
                    enemy(700, 430, -1);
                    if (enemyHealth <= 0) {
                        enemySide = "left";
                        enemyHealth = 100;
                        enemyBullet = true;
                        enemyBulletX = 100;
                        enemyBulletY = 430;
                    } //end if
                } //end right enemy

                else if (enemySide == "left") {
                    enemy(100, 430, 1);
                    if (enemyHealth <= 0) {
                        bossRound = 4;
                        timer = 0;
                        enemySide = "right";
                    } //end if
                } //end left enemy
            } else if (bossRound == 4) {
                fill(0, 0, 255);
                arc(225, 450, 20, 20, PI, TWO_PI);
                arc(525, 450, 20, 20, PI, TWO_PI);

                if (dist(rectX, rectY, 225, 450) < 20) {
                    velocity = -24;
                } else if (dist(rectX, rectY, 525, 450) < 20) {
                    velocity = -24;
                } //end jump pad

                if (rectX > 240 && rectX < 500 && rectY >= 140 && rectY < 160 && velocity > 0) {
                    rectY = 140;
                    velocity = 0;
                } //end top of boss

                if (rectX > 280 && rectX < 450 && rectY == 140 && bossDamage == false) {
                    bossHealth -= 33;
                    bossDamage = true;
                    timer++
                } //end boss damage

                if (bossDamage == false) {
                    image(sword, 320, 80, 120, 70);
                } else {
                    timer++;
                    fill(0);
                    rect(280, 300, 200, 100);
                    image(mouthHurt, 300, 280, 150, 150);

                    if (timer > 100) {
                        bossRound = 1;
                        timer = 0;
                    } //end loop
                } //end boss hurt
            } //end boss rounds

            if (bossHealth == 99) {
                fill(255, 0, 0);
                rect(524, 49, 210, 23);
            } else if (bossHealth == 66) {
                fill(255, 0, 0);
                rect(524, 49, 140, 23);
            } else if (bossHealth == 33) {
                fill(255, 0, 0);
                rect(524, 49, 70, 23);
            } else if (bossHealth == 0) {
                bossMusic.stop();
                victory.play();

                fill(255, 0, 0);
                rect(524, 49, 0, 23);

                fill(0, 0, 0, 180);
                rectMode(CORNER);
                rect(0, 0, width, height);

                fill(255, 215, 0);
                textAlign(CENTER);
                textSize(50);
                text("YOU WIN!", width / 2, height / 2);

                fill(255);
                textSize(20);
                text("Press 'r' to restart", width / 2, height / 2 + 50);
                noLoop();
            } //end boss health
        } //end boss

        strokeWeight(1);
        stroke(0);
        if (rectX > 220 && rectX < 500) {
            fill(245, 155, 10);
            rect(rectX - 8, rectY - 10, 15, 20);
        } //end player rect

        if (health <= 0) {
            fill(0, 0, 0, 180);
            rectMode(CORNER);
            rect(0, 0, width, height);

            fill(255, 0, 0);
            textAlign(CENTER);
            textSize(50);
            text("YOU DIED", width / 2, height / 2);

            fill(255);
            textSize(20);
            text("Press 'r' to restart", width / 2, height / 2 + 50);
            noLoop();
        } //end death screen
    } //end levels

    if (rectX > 800 && level == 0) {
        level = 1;
        rectX = 20;
        if (!forestMusic.isPlaying()) {
            forestMusic.loop();
        } //end forest music
    } else if (rectX > 800 && level == 1) {
        level = 2;
        rectX = 20;
        enemyHealth = 100;
        enemyBullet = true;
        enemyBulletX = -100;
    } else if (rectX > 800 && level == 2) {
        level = 3;
        rectX = 20;
    } else if (rectX > 800 && level == 3) {
        level = 4;
        if (difficulty == "normal") {
            checkPoint1 = true;
        } //end checkpoint1
        rectX = 20;
        enemyHealth = 100;
        enemyBullet = true;
        enemyBulletX = -100;
        forestMusic.stop();
        if (!caveMusic.isPlaying()) {
            caveMusic.loop();
        } //end cave music
    } else if (rectX > 800 && level == 4) {
        level = 5;
        rectX = 20;
        healthPack = false;
        platformY = 400;
        timer = 0;
    } else if (rectX > 800 && level == 5) {
        level = 6;
        rectX = 20;
        timer = 0;
    } else if (rectX > 800 && level == 6) {
        level = 7;
        rectX = 20;
        rectY = 440;
        lavaY = 470;
        lavaRise = false;
        checkPoint1 = false;
        if (difficulty == "normal") {
            checkPoint2 = true;
        } //end checkpoint2
        caveMusic.stop();
        if (!volcanoMusic.isPlaying()) {
            volcanoMusic.loop();
        } //end volcano music
    } else if (rectY < -10 && level == 7) {
        level = 8;
        rectX = 20;
        rectY = 440;
        lavaY = 470;
        lavaRise = false;
        timer = 0;
        platformY2 = 230;
        enemyY = 400;
        healthPack = false;
        enemyHealth = 100;
        enemyBullet = true;
        enemyBulletX = -100;
    } else if (rectY < -10 && level == 8) {
        level = 9;
        rectX = 20;
        rectY = 440;
        lavaY = 470;
        lavaRise = false;
        timer = 0;
        asteroidY = -100;
    } else if (rectY < -10 && level == 9) {
        level = 10;
        rectX = 20;
        rectY = 440;
        volcanoMusic.stop();
        checkPoint2 = false;
        if (difficulty == "normal") {
            checkPoint3 = true;
        } //end checkpoint3
    } else if (rectY > 600 && level == 10) {
        level = 11;
        rectY = -50;
        timer = 0;
        bossRound = 1;
        asteroidY = -200;
        enemyHealth = 100;
        enemyBullet = true;
        enemyBulletX = -100;
        enemySide = "right"
        bossHealth = 99;
        bossDamage = false;

        if (!bossMusic.isPlaying()) {
            bossMusic.loop();
        } //end boss music
    } //end next level

    if (keyIsPressed && key == ' ' && bulletFired == false) {
        if (millis() - lastShot > 1000) {
            bulletX = rectX;
            bulletY = rectY;
            bulletFired = true;
            bulletDir = playerDir;
            lastShot = millis();

            gun.play();
        } //end if
    } //end bullet fire

    if (bulletFired == true) {
        fill(235, 205, 10);
        rect(bulletX, bulletY - 5, 10, 10);
        bulletX += (10 * bulletDir);
    } //end if

    if (bulletX > width || bulletX < 0) {
        bulletFired = false;
    } //end reset bullet
} //end draw

function keyPressed() {
    if (key == 'w' && velocity == 0) {
        velocity = -12;
    } //end jump

    if (key == 'r' && health == 0) {
        if (difficulty == "normal") {
            health = 99;
        } else {
            health = 33;
        } //end health

        enemyHealth = 100;
        healthPack = false;
        enemyBullet = true;
        platformY = 400;
        timer = 0;

        if (checkPoint1 == true) {
            level = 4;
            rectX = 20;
            rectY = 440;
        } else if (checkPoint2 == true) {
            level = 7;
            health = 99;
            rectX = 20;
            rectY = 440;
        } else if (checkPoint3 == true) {
            level = 10;
            rectX = 20;
            rectY = 440;
        } else {
            level = 0;
            rectX = 400;
            rectY = 440;
        } //end checkpoint

        loop();
    } //end restart

    if (key == 'r' && bossHealth == 0) {
        level = 0;
        health = 99;
        enemyHealth = 100;
        healthPack = false;
        enemyBullet = true;
        platformY = 400;
        timer = 0;
        rectX = 400;
        rectY = 440;

        loop();
    } //end win
} //end keyPressed

function playerRect() {
    fill(245, 155, 10);
    strokeWeight(1);
    stroke(0);
    rectMode(CENTER);
    rect(rectX, rectY, 15, 20);

    velocity += gravity;
    rectY += velocity;

    if ((level == 2 || level == 5) && rectX > 140 && rectX < 640) {

    } else if (level == 10 && rectX > 400) {

    } else {
        if (rectY > 440) {
            rectY = 440;
            velocity = 0;
        } //end if
    } //end void

    if (level == 9) {
        if (rectY > lavaY - 30) {
            rectY = lavaY - 30;
            velocity = 0;
        } //end if
    } //end level 9

    if (rectX < 8) {
        rectX = 8;
    } //end left border

    if (keyIsDown(65)) {
        rectX -= 4;
        playerDir = -1;
    } //end a key

    if (keyIsDown(68)) {
        rectX += 4;
        playerDir = 1;
    } //end d key
} //end playerRect

function healthBar() {
    fill(0);
    text("Health:", 70, 40);
    rect(129, 60, 215, 30);

    rectMode(CORNER);
    if (health == 99) {
        fill(255, 0, 0);
        rect(24, 49, 210, 23);
    } else if (health == 66) {
        fill(255, 0, 0);
        rect(24, 49, 140, 23);
    } else if (health == 33) {
        fill(255, 0, 0);
        rect(24, 49, 70, 23);
    } else if (health <= 0) {
        fill(0, 0, 0, 180);
        rectMode(CORNER);
        rect(0, 0, width, height);

        fill(255, 0, 0);
        textAlign(CENTER);
        textSize(50);
        text("YOU DIED", width / 2, height / 2);

        fill(255);
        textSize(20);
        text("Press 'r' to restart", width / 2, height / 2 + 50);
        noLoop();
    } //end death screen
} //end health

function platform(platformX, platformY, speedX, speedY) {
    if (level == 1 || level == 2 || level == 3) {
        fill(20, 110, 20);
    } else if (level == 4 || level == 5 || level == 6) {
        fill(125, 65, 0);
    } else if (level == 7 || level == 8 || level == 9) {
        fill(125, 125, 125);
    } //end fill

    rectMode(CENTER);
    rect(platformX, platformY, 50, 15);

    if (rectX > platformX - 30 && rectX < platformX + 30 && rectY + 10 > platformY - 8 && rectY + 10 < platformY + 8 && velocity > 0) {
        rectY = platformY - 18;
        velocity = 0;
        rectX += speedX;
        rectY += speedY;
    } //end collision
} //end platform

function spike(spikeX) {
    fill(255, 0, 0);
    triangle(spikeX + 40, 450, spikeX + 60, 450, spikeX + 50, 420);
} //end spike

function enemy(enemyX, enemyY, enemyDir) {
    if (enemyBullet) {
        fill(150, 0, 0);
        rect(enemyX, enemyY, 15, 20);

        fill(235, 205, 10);
        rect(enemyBulletX, enemyBulletY, 10, 10);
        enemyBulletX += (5 * enemyDir);

        if (enemyBulletX > 0 && dist(rectX, rectY, enemyBulletX, enemyBulletY) < 20) {
            health -= 33;
            enemyBulletX = -100;
            lastEnemyShot = millis();
        } //end collision

        if (enemyBulletX < 0 || enemyBulletX > 800) {
            if (millis() - lastEnemyShot > 1000) {
                enemyBulletX = enemyX;
                enemyBulletY = enemyY;
                lastEnemyShot = millis();
            } //end if
        } //end reset shot

        if (bulletFired && dist(bulletX, bulletY, enemyX, enemyY) < 25) {
            enemyHealth -= 50;
            bulletFired = false;
            bulletX = -100;
        } //end enemy damage

        if (enemyHealth == 100) {
            fill(0);
            rectMode(CORNER);
            rect(enemyX - 30, enemyY - 35, 60, 15);

            fill(255, 0, 0);
            rect(enemyX - 27.5, enemyY - 32.5, 55, 10);
        } else if (enemyHealth == 50) {
            fill(0);
            rectMode(CORNER);
            rect(enemyX - 30, enemyY - 35, 60, 15);

            fill(255, 0, 0);
            rect(enemyX - 27.5, enemyY - 32.5, 28, 10);
        } else if (enemyHealth == 0) {
            enemyBullet = false;
            enemyBulletX = -100;
        }//end enemy death
    } //end enemyBullet
} //end enemy