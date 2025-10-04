let gameSeq= [];
let userSeq= [];

let start = false;
let level = 0;

let highScore = 0;

let button = ["red","yellow","green","purple"];

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");


document.addEventListener("keydown",function(event){
    if(event.key==="Enter" && start === false){
        console.log("game started");
        start = true; // game sirf ek baar start ho
        
        levelUp();
        
    }

});


function levelUp(){
    userSeq=[]; // emptying an array reseting userseq everytime on new level
    level++;
    if(level>highScore){
        highScore++;
    };

    h2.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random() * 4); // random index
    let randColor = button[randIdx]; // random button color
    let randBtn = document.querySelector(`.${randColor}`); // selecting that random color div
    gameSeq.push(randColor);
    gameFlash(randBtn);
    
}



function gameFlash(randBtn){
    randBtn.classList.add("gameflash");
    setTimeout(function(){
        randBtn.classList.remove("gameflash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function clickCheck(indx){
    if(userSeq[indx]===gameSeq[indx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp ,1000); // 1sec delay before next level
        }
    }
    else{
        h2.innerHTML = `Game over! your score is <b>${level}</b> <br> Press 'ENTER' to start`;
        let body = document.querySelector("body");
        body.classList.add("warning");
        setTimeout(function(){
            body.classList.remove("warning");
        },250);
        h3.innerText = `High Score = ${highScore}`;
        reset();
    }

}

function btnPress(){
    if (!start) return; // agar start nhi hai toh click se kuch nhi
    let btn = this; // this - event caller which is btn in for loop
    userFlash(btn);

    let randColor = btn.getAttribute("id");
    userSeq.push(randColor);
    let indx = userSeq.length -1;
    clickCheck(indx);
}


let btns = document.querySelectorAll(".btn");

for(btn of btns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    start = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}