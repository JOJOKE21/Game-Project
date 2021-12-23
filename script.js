let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// let x = 990
// let width = 10
// let height = 600
// let y = 0

document.addEventListener('keydown', e => {
    e.preventDefault();
if(e.key === 'ArrowUp'){
    char.y -= char.speed;
  }
  if(e.key === 'ArrowDown'){
    char.y += char.speed;
  }
});
const shapesArry = []
class shape{
    constructor(x,y,width,height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw(){
        
        ctx.fillStyle = 'blue';
        ctx.fillRect(990,0,10,600);
    shapesArry.push(990,0,10,600)
    }
    delete(){
        clearRect(0,0,shapesArry.w,shapesArry.h)
    }
}

let opponet = new shape(990,0,10,600)
console.log(opponet)

const char = {
    height: 50,
    width: 50,
    x: 10,
    y: 275,
    color: "red",
    speed: 50,
    draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
}}



function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    opponet.draw();
    char.draw();
    
   
} 


setInterval(draw, 150); 
setInterval(()=>{
   // console.log(shapesArry)
    shapesArry.forEach((shape,i) =>{
       if(isColliding(char,shape)){
           console.log("its colliding")
       } else if(shape.x < char.x ){
           console.log(shape.x)
           shapesArry.splice(i,1)
       }
    })
   // console.log(shapesArry)
},100)

function isColliding(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.height + obj1.y > obj2.y;
    }
