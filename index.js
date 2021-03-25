// Create the canvas
var gameOver = false;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width =800;
canvas.height =800;
document.body.appendChild(canvas);

// Now get the images and place them in Canvas Image objects
// (notice the new word, constructor functions)  
// bgReady is used to let us know when it's safe to draw the image, as trying to draw it before it's loaded will throw a DOM error.

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
    console.log("bgImage: " + bgReady )
};
bgImage.src = "images/water_background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/boy.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/shark.png";

//top image
var topReady = false;
var topImage = new Image();
topImage.onload = function () {
    topReady = true;
};
topImage.src = "images/sandTop.png";

//side image
var sideReady = false;
var sideImage = new Image();
sideImage.onload = function () {
    sideReady = true;
};
sideImage.src = "images/sandSide.png";

//obstacle image
var jellyfishReady = false;
var jellyfishImage = new Image();
jellyfishImage.onload = function () {
    jellyfishReady = true;
};
jellyfishImage.src = "images/jellyfish.png";

// Game objects
var hero = {
        speed: 256, // movement in pixels per second
        x: 0,  // where on the canvas are they?
        y: 0  // where on the canvas are they?
};

var monster = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
 
var jellyfish1= {
        x: 200,
        y: 550
};

var jellyfish2= {
        x: 600,
        y: 550
};

var jellyfish3= {
        x: 300,
        y: 300
};

var jellyfish4= {
        x: 100,
        y: 300
};

var jellyfish5= {
        x: 300,
        y: 100
};

//the with and height of our spritesheet
var spriteWidth = 192; 
var spriteHeight = 274; 

//we are having two rows and 8 cols in the current sprite sheet
var rows = 4; 
var cols = 3; 

//The 2nd (thrid) row is for the right movement
var trackRight = 2; 
//1st (second) row for the left movement (counting the index from 0)
var trackLeft = 1; 
var trackUp = 3; 
var trackDown = 0; 

//To get the width of a single sprite we divided the width of sprite with the number of cols
//because all the sprites are of equal width and height 
var width = spriteWidth/cols; 

//Same for the height we divided the height with number of rows 
var height = spriteHeight/rows; 

var curFrame = 0; 

//The total frame is 3 
var frameCount = 3; 


//x and y coordinates of the canvas to get the single frame 
var srcX=0; 
var srcY=0; 

//tracking the movement left and write 
var left = false;
var right = true;
var up = false;
var down = false;

var counter = 0;

var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

function touchingJellyfish(who) {
    // check if payler touches jellyfish
    // console.log("----inside of touchingJellyfish");
    // console.log("heor.x: " + who.x);
    // console.log("hero.y: " + who.y);
   
    if(
    //     (who.x <= (jellyfish1.x + 128) 
    //        && jellyfish1.x <= (who.x + 64)
    //        && who.y <= (jellyfish1.y + 138)
    //        && jellyfish1.y <= (who.y + 64)) ||
    //    (who.x <= (jellyfish2.x + 128) 
    //        && jellyfish2.x <= (who.x + 64)
    //        && who.y <= (jellyfish2.y + 138)
    //        && jellyfish2.y <= (who.y + 64)) ||
    //    (who.x <= (jellyfish3.x + 128) 
    //        && jellyfish3.x <= (who.x + 64)
    //        && who.y <= (jellyfish3.y + 138)
    //        && jellyfish3.y <= (who.y + 64)) ||
    //    (who.x <= (jellyfish4.x + 128) 
    //        && jellyfish4.x <= (who.x + 64)
    //        && who.y <= (jellyfish4.y + 138)
    //        && jellyfish4.y <= (who.y + 64)) ||
    //    (who.x <= (jellyfish5.x + 128) 
    //        && jellyfish5.x <= (who.x + 64)
    //        && who.y <= (jellyfish5.y + 138)
    //        && jellyfish5.y <= (who.y + 64))
        (who.x <= (jellyfish1.x + 64 - 10) 
           && jellyfish1.x <= (who.x + 64 - 10)
           && who.y <= (jellyfish1.y + 68.5- 10)
           && jellyfish1.y <= (who.y + 64 - 5)) ||
       (who.x <= (jellyfish2.x + 64 - 10) 
           && jellyfish2.x <= (who.x + 64 - 10)
           && who.y <= (jellyfish2.y + 68.5 - 10)
           && jellyfish2.y <= (who.y + 64 - 5)) ||
       (who.x <= (jellyfish3.x + 64 - 10) 
           && jellyfish3.x <= (who.x + 64 - 10)
           && who.y <= (jellyfish3.y + 68.5 - 10)
           && jellyfish3.y <= (who.y + 64 - 5)) ||
       (who.x <= (jellyfish4.x + 64 -10) 
           && jellyfish4.x <= (who.x + 64 -10)
           && who.y <= (jellyfish4.y + 68.5 - 10)
           && jellyfish4.y <= (who.y + 64 - 5)) ||
       (who.x <= (jellyfish5.x + 64 - 10) 
           && jellyfish5.x <= (who.x + 64 - 10)
           && who.y <= (jellyfish5.y + 68.5 - 10)
           && jellyfish5.y <= (who.y + 64 - 5))                          
    ) {
        console.log("touching yes!");
       return true;
    }
   
   }

// Update game objects
var update = function (modifier) {
    //ctx.clearRect(hero.x,hero.y,width,height);

    left = false;
    right = false;
    up = false;
    down = false;

    //console.log("keysdown: " + keysDown);

    if (38 in keysDown && hero.y > (35 -5)) { //  holding up key
            left = false; 
            right = false;
            up = true;
            down = false;
            hero.y -= hero.speed * modifier;
        }
        if (40 in keysDown && hero.y < canvas.height - (70 + 35)) { //  holding down key
            left = false; 
            right = false;
            up = false;
            down = true;
            hero.y += hero.speed * modifier;
        }
        if (37 in keysDown && hero.x > (35 -10)) { // holding left key
            left = true; 
            right = false;
            up = false;
            down = false;
            hero.x -= hero.speed * modifier;
        }
        if (39 in keysDown && hero.x < canvas.width - (70 + 35 - 10)) { // holding right key
            left = false; 
            right = true;
            up = false;
            down = false;
            hero.x += hero.speed * modifier;
        }
        
        if(counter == 5){
            //Updating the frame index 
            curFrame = ++curFrame % frameCount;
        } else {
            counter++;
        }
         //Calculating the x coordinate for spritesheet 
        srcX = curFrame * width; 
        
        // //Clearing the drawn frame 
        ctx.clearRect(hero.x,hero.y,width,height); 
        
        //if left is true and the character has not reached the left edge 
        if(left){
            //calculate srcY 
            srcY = trackLeft * height; 
        }

        //if the right is true and character has not reached right edge 
        if(right){
            //calculating y coordinate for spritesheet
            srcY = trackRight * height; 
        }

        if(up){
            //calculating y coordinate for spritesheet
            srcY = trackUp * height; 
        }

        if(down){
            //calculating y coordinate for spritesheet
            srcY = trackDown * height; 
        }

        // console.log("srcX: " + srcX + ", srcY: " + srcY);
        // console.log("left: " + left + ", right: " + right + ", up: " + up + ", down: " + down);

        if(!left && !right && !up && !down) {
        //if(!left && !right) {    
            //console.log("srcX: " + srcX + ", srcY: " + srcY);
            srcX = 1 * width;
            srcY = 0 * height;
        }

        // Are they touching?
        if (
            hero.x <= (monster.x + 64 - 10)
            && monster.x <= (hero.x +64 - 10)
            && hero.y <= (monster.y +64 -10)
            && monster.y <= (hero.y +68.5)
        ) {
            ++monstersCaught;       // keep track of our “score”
            if(monstersCaught > 4)
            {
                alert("You won!");
                gameOver = true;
            }

            reset();       // start a new cycle

        }

        //console.log("before calling method: hero.x: " + hero.x);
        //console.log("before calling method: hero.y: " + hero.y);
         // Is player touching jellyfish?
         if(touchingJellyfish(hero)) {
            //console.log("player touched jellyfish!");
            alert("You've been shocked to death, game over!");
            gameOver = true;
        } 


};

// *********************************************************************
//

// Draw everything in the main render function
var render = function () {
        if (bgReady) {
            //console.log('here2');
            ctx.drawImage(bgImage, 0, 0);
        }

        if(!gameOver) {
            if (topReady) {
                    //console.log('here2');
                ctx.drawImage(topImage, 0, 0);
                ctx.drawImage(topImage, 0, 800 - 35);
            }

            if (sideReady) {
                        //console.log('here2');
                ctx.drawImage(sideImage, 0, 0);
                ctx.drawImage(sideImage, 800-35, 0);
            }   

            if (jellyfishReady) {
                ctx.drawImage(jellyfishImage, jellyfish1.x, jellyfish1.y);
                ctx.drawImage(jellyfishImage, jellyfish2.x, jellyfish2.y);
                ctx.drawImage(jellyfishImage, jellyfish3.x, jellyfish3.y);
                ctx.drawImage(jellyfishImage, jellyfish4.x, jellyfish4.y);
                ctx.drawImage(jellyfishImage, jellyfish5.x, jellyfish5.y);
            }

            if (heroReady) {
                //ctx.drawImage(heroImage, hero.x, hero.y);
                ctx.drawImage(heroImage,srcX,srcY,width,height,hero.x,hero.y,width,height);
            }
            
            if (monsterReady) {
                 ctx.drawImage(monsterImage, monster.x, monster.y);
            }
    }
            // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "20px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("shark caught: " + monstersCaught,40,40);

}



// Reset the game when the player catches a monster
var reset = function () {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;
    
    let notGood = true;
    while(notGood){
    //Place the monster somewhere on the screen randomly
    // but not in the hedges, Article in wrong, the 64 needs to be 
    // x: hedge 35 + hedge 35 + char 64 = 134
    // y: top 35 + top 35 + char 68.5 = 138.5
        monster.x = 35+ (Math.random() * (canvas.width - 134));
        monster.y = 35+ (Math.random() * (canvas.height - 138.5));

        if(!touchingJellyfish(monster)){
            notGood = false;
        }
    }
};


// this is the code that actually runs, everything else was definitional.

// The main game loop
var main = function () {
        var now = Date.now();
        var delta = now - then;
        update(delta / 1000);
        render();
        then = now;
        //  Request to do this again ASAP
        requestAnimationFrame(main);
    };

// Let's play this game!
var then = Date.now();
reset();
main();  // call the main game loop.

//
// *********************************************************************






