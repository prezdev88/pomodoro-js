let clock = document.querySelector("#clock");
let startButton = document.querySelector("#startButton");
let pomodoros = document.querySelector("#pomodoros");
let totalPomodoros = document.querySelector("#totalPomodoros");
let pause = false;
let pomodoroCount = 0;
let totalPomodorosCount = 0;
const PAUSE_MILLIS = 1;

window.addEventListener("load", () => {
    // setTimeout(() => {  console.log("World!"); }, 2000);

    startButton.addEventListener("click", async () => {
        if(isStartButton()){
            printPomodoros();
            setText(startButton, "Pausar");

            await startPomodoroClock(25);
    
            pomodoroCount++;
            totalPomodorosCount++;
            printPomodoros();

            setText(startButton, "Iniciar Pausa");
        }else if(isPauseButton()){
            setText(startButton, "Reanudar");
            pause = true;
        }else if(isResumeButton()){
            setText(startButton, "Pausar");
            pause = false;
        }else if(isStartPauseButton()){
            setText(startButton, "Pausar");

            if(pomodoroCount % 4 == 0){
                await startPomodoroClock(20);
                pomodoroCount = 0;
            }else{
                await startPomodoroClock(5);
            }

            setText(startButton, "Iniciar");
        }
    });
});

function printPomodoros(){
    pomodoros.innerHTML = "Pomodoro completado: " + pomodoroCount;
    totalPomodoros.innerHTML = "Total: " + totalPomodorosCount;
}

async function startPomodoroClock(maxMinute){
    maxMinute--;

    for(let minute = maxMinute; minute >= 0 ; minute--){
        for(let second = 59; second >= 0; second--){
            setClockText(minute, second);
            await sleep(PAUSE_MILLIS);

            if(pause){
                second++;
            }
        }
    }
}

function isStartPauseButton(){
    return startButton.innerHTML == "Iniciar Pausa";
}

function isResumeButton(){
    return startButton.innerHTML == "Reanudar";
}

function isPauseButton(){
    return startButton.innerHTML == "Pausar";
}

function isStartButton(){
    return startButton.innerHTML == "Iniciar";
}

function setEnable(component, enable){
    if(enable){
        component.removeAttribute("disabled");
    }else{
        component.setAttribute("disabled", "disabled");
    }
}

function setText(component, text){
    component.innerHTML = text;
}

function setClockText(minute, second){
    clock.innerHTML = minute + ":" + (second < 9 ? "0"+second : second);
}

function sleep(microsecond) {
    return new Promise(resolve => setTimeout(resolve, microsecond));
}