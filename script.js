let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let size = 50
let x = 10
let y = 275
let dx = 2
let dy = -2


document.addEventListener('keydown', e => {
    e.preventDefault();
if(e.key === 'ArrowUp'){
    char.y -= char.xspeed;
  }
  if(e.key === 'ArrowDown'){
    char.y += char.xspeed;
  }
  if(e.keyCode == 32){
    weapon.x += 5
      
  }
});

const shapesArry = []
const bulletArray = []

class Bullet{
    constructor(x,y,width,height,health,damage){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.health = health
        this.damge = damage
}
draw(){
    this.checkForCollision()
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width,this.height,this.health,this.damage)
}
checkForCollision(){
    shapesArry.forEach((shape,i) =>{
        if(isColliding(weapon,shape)){
            console.log("its colliding")
        } else if(shape.x < weapon.x ){
            console.log(shape.x)
            shapesArry.splice(i,1)
        }
    })
}
}

let weapon = new Bullet(10,275,50,50)


class Shape{
    constructor(x,y,width,height,health){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.health = health
    }
    draw(){
        this.x -= 5
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height, this.health);
    }
 
}


// console.log(opponet)
// console.log(opponet1)
// console.log(opponet2)
// console.log(opponet3)


let i = 1
function loop() { 
setTimeout(() => {
let opponet = new Shape(990,Math.ceil(Math.random()*100),10,50)
let opponet1 = new Shape(990,Math.ceil(Math.random()*(300,150)+150),10,50)
let opponet2 = new Shape(990,Math.ceil(Math.random()*(450,150)+300),10,50)
let opponet3 = new Shape(990,Math.ceil(Math.random()*(600,150)+400),10,50)
shapesArry.push(opponet)
shapesArry.push(opponet1)
shapesArry.push(opponet2)
shapesArry.push(opponet3);
i++;
if(i < 10){
    loop()
} 
    }, 3000);


  }
loop()



const char = {
    height: size,
    width: size,
    x: x,
    y: y,
    color: "red",
    xspeed: 50,
    yspeed: 50,
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.checkForCollision()
    },
    checkForCollision(){
        shapesArry.forEach((shape,i) =>{
            if(isColliding(char,shape)){
                console.log("its colliding")
            } else if(shape.x < char.x ){
                console.log(shape.x)
                shapesArry.splice(i,1)
            }
        })
    }
}





function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapesArry.forEach(shape => shape.draw());
    char.draw();
    weapon.draw();
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
    }
