// meow
let smotsField = document.getElementById("smotsTextField");
smotsField.onpaste = e => e.preventDefault();

let timer = document.getElementById("timer");
let score = document.getElementById("highScore");

let highScore = localStorage.getItem("high")
if (highScore === null){
    highScore = 99999999999;
} else {
    highScore = parseFloat(highScore);
    highScoreUpdate();
}

function highScoreUpdate(){
    score.textContent = `Highscore:${highScore.toFixed(3)}`;
}




class Game{
    constructor(){
        this.GamePhase = 0; // 0 = NOT STARTED, 1 = TYPING, 2 = ENDED
        this.StartTime = performance.now();
        this.ElapsedTime = 0;
        this.timeSeconds = 0;
    }
    
    start(){
        this.StartTime = performance.now();
        this.GamePhase = 1;
    }
    
    end(){
        this.ElapsedTime = performance.now() - this.StartTime;
        this.GamePhase = 2;
        this.timeSeconds = this.ElapsedTime/1000;
        if (this.timeSeconds < highScore){
            highScore = this.timeSeconds;
            localStorage.setItem("high",highScore.toString());
            highScoreUpdate();
        }
        timer.textContent = `Time:${this.timeSeconds.toFixed(3)}`;
    }
    
    restart(){
        this.GamePhase = 0; // 0 = NOT STARTED, 1 = TYPING, 2 = ENDED
        this.StartTime = performance.now();
        this.ElapsedTime = 0;
        this.timeSeconds = 0;
        smotsField.value = "";
        timer.textContent = `Time:0.000`;
    }
    
    update(){
        if (this.GamePhase == 0 && smotsField.value != ""){
            this.start();
        } else if (this.GamePhase == 1 && smotsField.value == "smots gaming"){
            this.end();
        }
    }
}

let game = new Game();

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click",resetClicked);
function resetClicked(){
    game.restart();
    smotsField.focus();
}
document.onkeydown = (e) => {
    if (e.key == "Enter") {
        resetClicked();
    }
};


function update(time){
    game.update();
    if (game.GamePhase == 1) timer.textContent = `Time:${((performance.now() - game.StartTime)/1000).toFixed(3)}`;
    if (game.GamePhase == 2 && smotsField.value != "smots gaming") smotsField.value = "smots gaming";
    
    requestAnimationFrame(update);
}

requestAnimationFrame(update);