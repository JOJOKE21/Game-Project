let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = 100
let height = 100
let x = 10
let y = 275
let canFire = true;
let score = 0 
let lives = 3;
let lostlife = 0
let gamepaused = true;
let playerimg = new Image()
playerimg.src = "kyesse-freedom-anibglessmousebg.png"
let enamyimg = new Image()
enamyimg.src = "58976312.png"
let playerweaponimg = new Image()
playerweaponimg.src = "bullet.png"

document.addEventListener('keydown', e => {
    e.preventDefault();
if(e.key === 'ArrowUp'){
    char.y -= char.xspeed;
  }
  if(e.key === 'ArrowDown'){
    char.y += char.xspeed;
  }
  if(e.keyCode == 32 && canFire == true){
 createBullet()
      
  }
});

function allowFire() {
    canFire = true;
}

function drawScore() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Lives: "+lives, canvas.width-150, 30);
}
const shapesArry = []
const bulletArray = []

class Bullet{
    constructor(x,y,width,height,damage){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.damage = damage
}
draw(){
    this.x += 5
    this.checkForCollision()
    ctx.drawImage(playerweaponimg, 0, 0, 400, 400, this.x, this.y, this.width, this.height,)
}
checkForCollision(){
    shapesArry.forEach((shape,i) =>{
        if(isColliding(this,shape)){
            shapesArry.splice(i,1);
            bulletArray.splice(bulletArray.indexOf(this),1);
            console.log("its colliding")
            score++;
            console.log(score)
            console.log(this.damage)
        }
    })
}

}

const startGame = document.querySelector('#start-game')
const mainMenu = document.querySelector(".main-menu")

startGame.addEventListener("click",()=>{
    mainMenu.classList.add("hidden");
    canvas.classList.remove("hidden");
    gamepaused = false
    spawnCheese()
})

class Shape{
    constructor(x,y,width,height,speed,health){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.health = health
    }
    draw(){
        this.x -= this.speed
        ctx.drawImage(enamyimg, 0, 0, 497, 398, this.x, this.y, this.width, this.height)

    }
 
}



let w = 1
let i = 0
let speed = 5
function spawnCheese() { 
setTimeout(() => {
let opponet = new Shape(990,125,50,50,speed,100)
let opponet1 = new Shape(990,325,50,50,speed,100)
let opponet2 = new Shape(990,525,50,50,speed,100)
shapesArry.push(opponet)
shapesArry.push(opponet1)
shapesArry.push(opponet2)
i++; 
w++;
console.log(speed)
console.log(w)
console.log(i)
if(i < 10){
    spawnCheese()
} else if(w > 10){ 
    spawnCheese()
    speed+=.25;
}
    }, 4000);
  }


const char = {
    height: height,
    width: width,
    x: x,
    y: y,
    color: "red",
    xspeed: 200,
    yspeed: 200,
    currentFrame: -1,
    maxFrames: 6, 
    draw(){
        if(playerimg){
            this.currentFrame += .15;
             if(this.currentFrame >= this.maxFrames){
              this.currentFrame = 0;
            }
            let currentFrame = Math.floor(this.currentFrame);
            let frameX = 240 * currentFrame;
        ctx.drawImage(playerimg, frameX, 0 , 240, 248, this.x, this.y, this.width, this.height)
        this.checkForCollision()
    }
},
    checkForCollision(){
        shapesArry.forEach((shape,i) =>{
            if(isColliding(char,shape)){
                console.log("its colliding")
            } else if(shape.x < char.x){
                console.log(shape.x)
             shapesArry.splice(i,1)
             lives-=i
             if(lives<=0) {
            alert("Game Over")
            document.location.reload();
                };  
            }
        })
    }
}

function createBullet(){
    canFire = false
    let weapon = new Bullet(char.x,char.y,100,100,10)
    bulletArray.push(weapon)
    setTimeout(allowFire,750)
}


function draw(){ 
    if(gamepaused) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapesArry.forEach(shape => shape.draw());
    char.draw();
    bulletArray.forEach(bullet => bullet.draw())
    drawScore();
    drawLives();
    if (char.x < 0 || char.x > canvas.height) {
        char.x = 0;
        char.xspeed = 0;
    }
    if (char.y < 0 || char.y > canvas.height) {
        char.y = 0;
        char.yspeed = 0;
    }
    

} 

setInterval(draw, 20); 




function isColliding(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.height + obj1.y > obj2.y;
    };

