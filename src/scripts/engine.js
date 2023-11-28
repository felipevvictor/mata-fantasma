const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
    },
    actions: {
        timerId: null,
        countDownTimer: setInterval(countDown, 1000),
    }
};

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.5
    audio.play();
    
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){

        window.alert(`Game Over! resultado: ${state.values.result}`)
        window.location.reload();
      
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

let isMusicPlaying = false;

function playSoundBack() {
    if (!isMusicPlaying) {
        let audioBack = new Audio("./src/audios/fundo.mp3");

        audioBack.volume = 0.3

        audioBack.addEventListener("ended", () => {
            isMusicPlaying = false;
        });

        audioBack.play();
        isMusicPlaying = true;
    }
}

function addListerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSoundBack();
                playSound("point")
            }
        });
    });
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function init(){
    moveEnemy();
    addListerHitBox();
}

init();