const gameb=document.querySelector("#board");
const cnt=gameb.getContext("2d");
const scoretext=document.querySelector("#score");
const rbtn=document.querySelector("#bt");
const bw=gameb.width;
const bh=gameb.height;
const sbc="lightgreen";
const sb="black";
const fc="red";
const bbc="white";
const unit=25;

let xv=unit;
let yv=0;
let running=false;
let foodx;
let foody;
let score=0;

let snake=[
    {x:unit*4 , y:0},
    {x:unit*3 , y:0},
    {x:unit*2 , y:0},
    {x:unit , y:0},
    {x:0 , y:0}
];

window.addEventListener("keydown",changeDirection);
rbtn.addEventListener("click",restartGame);

gameStart();

function gameStart(){
    running=true;
    scoretext.textContent=score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running)
    {
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();
        },100);
    }
    else{
        displayGameover();
    }
};
function createFood(){
    function randomFood(min,max)
    {
        const randomnum=Math.round((Math.random()*(max-min)+min)/unit)*unit;
        return randomnum;
    }
    foodx=randomFood(0,bw-unit);
    foody=randomFood(0,bw-unit);
};
function drawFood(){
    cnt.fillStyle=fc;
    cnt.fillRect(foodx,foody,unit,unit);
};
function clearBoard(){
    cnt.fillStyle=bbc;
    cnt.fillRect(0,0,bw,bh);
};
function moveSnake(){
    const head={x:snake[0].x+xv,y:snake[0].y+yv};
    snake.unshift(head);
    if(snake[0].x==foodx && snake[0].y==foody)
    {
        score+=1;
        scoretext.textContent=score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    cnt.fillStyle=sbc;
    cnt.strokeStyle=sb;
    snake.forEach(sp=>{
        cnt.fillRect(sp.x,sp.y,unit,unit);
        cnt.strokeRect(sp.x,sp.y,unit,unit);
    })
};
function changeDirection(event){
    const kp=event.keyCode;
    const l=37;
    const u=38;
    const r=39;
    const d=40;

    const gu=(yv==-unit);
    const gd=(yv==unit);
    const gl=(xv==-unit);
    const gr=(xv==unit);

    switch(true)
    {
        case(kp==l && !gr):
            xv=-unit;
            yv=0;
            break;

        case(kp==u && !gd):
            yv=-unit;
            xv=0;
            break;
        
        case(kp==r && !gl):
            xv=unit;
            yv=0;
            break;

        case(kp==d && !gu):
            xv=0;
            yv=unit;
            break;
    }
};
function checkGameover(){
    switch(true)
    {
        case(snake[0].x<0):
            running=false;
            break;

        case(snake[0].x>=bw):
            running=false;
            break;

        case(snake[0].y<0):
            running=false;
            break;

        case(snake[0].y>=bh):
            running=false;
            break;
    }
    for(let i=1;i<snake.length;i++)
    {
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
        {
            running=false;
            break;
        }
    }
};
function displayGameover(){
    cnt.font="50px MV Boli";
    cnt.fillStyle="black";
    cnt.textAlign="center";
    cnt.fillText("Game Over!",bw/2,bh/2);
    running=false;
};
function restartGame(){
    score=0;
    xv=unit;
    yv=0;
    snake=[
        {x:unit*4 , y:0},
        {x:unit*3 , y:0},
        {x:unit*2 , y:0},
        {x:unit , y:0},
        {x:0 , y:0}
    ];
    setTimeout(gameStart,500);
};
