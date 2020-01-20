var squareArr = [];
var numSquares = 6;
var playerArray = [];
var computerArray = [];
var isComputerTurn = false;
var gameStart = false;
var flash = 0;
var isGameOver = true;
var speed = 0;
var points = 0;
var selection = 0;
var timeDecrease = 1;
var difficultyButton = document.querySelectorAll("difficultyButton");
var modeButtons = document.querySelectorAll(".mode");
var stripe = document.querySelector("#stripe");
var play = document.querySelector("#play");
var playButton = document.querySelector("#playButton");
var resetButton = document.querySelector('#reset');
var score = document.querySelector('#score');
var scoreNum = document.querySelector('#scoreNum');
var retry = document.querySelector("#retry");
var body = document.querySelector("body");
var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1");
var h2 = document.querySelector("h2");
var finalScore = document.querySelector("#finalScore")
var selected = document.querySelectorAll(".selected");
var endText = document.querySelectorAll(".endText");
var end = document.querySelectorAll(".end");

init();

function init() {
  resetButtonActivate();
  setupModeButtons();
  reset();
  resetGame();
  changeColors();
  retryButtonActivate();
  playButtonActivate();
}

function reset() {
  showSquares();
  timeDecrease = 1;
  removeSelectedSquares();
  retry.style.display = "none";
  body.style.backgroundColor = "#232323";
  if (resetButton.classList.contains("resetPlay")) {
    resetButton.classList.remove("resetPlay");
  }
}

function setupSquares() {
  squareArr = [];
  for(i=1;i<numSquares+1;i++) {
    squareArr.push(i);
  }
}

function selectButton(x) {
  if (!isComputerTurn && gameStart) {
    playerArray.push(x);
    checkAnswer();
    if (playerArray.length === computerArray.length) {
      iscomputerTurn = true;
      points++;
      computerTurn();
      h2.textContent = "Score: " + points;
    }
  }
}

function checkAnswer() {
  for (let i = 0; i < playerArray.length; i++) {
    if (playerArray[i] != computerArray[i]) {
      gameOver();
    }
  }
}

function setupModeButtons() {
  for (let i=0; i<modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      showSquares();
    });
  }
}

function resetGame() { 
  points = 0;
  gameStart = false;
  isComputerTurn = false;
  playerArray = [];
  computerArray = [];
}

function gameOver() {
  endBar();
  gameStart = false;
  isGameOver = true;
  for (i = 0; i < squares.length; i++) {
    squares[i].style.visibility = "hidden";
    squares[i].style.display = "none";
  }
  if (points!=1) {
    finalScore.textContent = "You scored " + points + " points.";
  } else {
    finalScore.textContent = "You scored " + points + " point.";
  }
  continueFlash();
}

function revealChoice(y) {
  if (!isGameOver) {
    squares[computerArray[y]].classList.remove("gameButtonOff");
  }
}

function hideChoice(y) {
  squares[computerArray[y]].classList.add("gameButtonOff");
  selection++;
  if (selection === computerArray.length) {
    isComputerTurn = false;
  }
}

function computerTurn() {
  if (!isGameOver) {
    isComputerTurn = true;
    playerArray = [];
    selection = 0;
    computerArray.push(Math.floor(Math.random() * numSquares));
    for (let i = 0; i < computerArray.length; i++) {
      setTimeout(revealChoice.bind(null, i), (i + 1) * (800 * timeDecrease));
      setTimeout(hideChoice.bind(null, i), (i + 1) * (800 * timeDecrease) + (500 * timeDecrease));
    }
    if (timeDecrease>0.4) {
        timeDecrease -= 0.05;
      }
  }
}

function showSquares() {
  setupSquares();
  for(let i=0;i<squares.length;i++) {
    if (squareArr[i]) {
      squares[i].style.display = "block";
      squares[i].style.visibility = "visible";
    } else {
      squares[i].style.display = "block";
      squares[i].style.visibility = "hidden";
    }
  }
}

function startGame() {
  isGameOver = false;
  changeBar();
  showSquares();
  if (!gameStart) {
    h2.style.color = "white";
    h2.textContent = "Score: " + points;
    isComputerTurn = true;
    gameStart = true;
    setTimeout(computerTurn, 1000);
  }
}

function changeColors() {
  for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener("mousedown", function() {
        if (!isComputerTurn && gameStart) {
          removeSelectedSquares();
          this.classList.remove("gameButtonOff");
        }
      });
      squares[i].addEventListener("mouseup", function() {
        if (!isComputerTurn && gameStart) {
          removeSelectedSquares();
        }
      });
    }
}

function changeBar() {
  toPlayMode();
  play.style.width = "0";
  play.style.visibility = "hidden";
  stripe.style.backgroundColor = "#232323"; 
  h1.style.backgroundColor = "white";
  h1.style.backgroundColor = "#232323";
  h2.style.backgroundColor = "#232323";
  score.style.backgroundColor = "#232323";
}

function revertBar() {
  play.style.width = "20%";
  play.style.visibility = "visible";
  stripe.style.backgroundColor = "white";  
  h1.style.backgroundColor = "steelblue";
  h1.style.color = "white";
  h2.style.backgroundColor = "steelblue";
  score.style.backgroundColor = "steelblue";
  score.style.color = "steelblue";
  revertModeButtons();
}

function endBar() {
  body.style.backgroundColor = "red";
  h1.style.color = "red";
  h1.style.backgroundColor = "red";
  stripe.style.backgroundColor = "red";
  h2.style.backgroundColor = "red";
  retry.style.display = "block";
  h2.style.color = "red";
  removeText();
  toEndMode();  
  toEndText();
}

function toEndText() {
  for (let i=0;i<endText.length;i++) {
    endText[i].classList.remove("endText");
  }
}

function revertEndText() {
  for (let i=0;i<end.length;i++) {
    end[i].classList.add("endText");
  }
}

function toEndMode() {
  for (let i=0;i<modeButtons.length;i++) {
    modeButtons[i].classList.add("endMode");
    modeButtons[i].classList.remove("selectedPlayMode");
    modeButtons[i].classList.remove("playMode");
  }
  resetButton.classList.remove("resetPlay")
}

function revertModeButtons() {
  for (let i=0;i<modeButtons.length;i++) {
    modeButtons[i].classList.remove("endMode");
    modeButtons[i].classList.remove("selectedPlayMode");
    modeButtons[i].classList.remove("playMode");
  }
}

function removeText() {
  h1.style.transition = "0s";
  h2.style.transition = "0s";
  score.textContent = "";
  h1.style.visibility = "hidden";
  h2.style.visibility = "hidden";
  h1.style.height = "0px";
  h2.style.height = "0px";
  resetButton.classList.add("endMode");
}

function revertText() {
  h1.style.transition = "2s";
  h2.style.transition = "2s";
  h1.style.visibility = "visible";
  h2.style.visibility = "visible";
  h1.style.height = "35px";
  h2.style.height = "30px";
  resetButton.classList.remove("endMode");
}

function removeSelectedSquares() {
  for(i=0;i<squares.length;i++) {
    squares[i].classList.add("gameButtonOff");
  }
}

function flashRetryButton() {
  retry.classList.add("retryAfter");
  setTimeout(function(){retry.classList.remove("retryAfter")}, 1100);
}

function repeatFlash() {
  flashRetryButton();
  setTimeout(flashRetryButton, 2100);
  setTimeout(flashRetryButton, 4200);
  setTimeout(flashRetryButton, 6300);
  setTimeout(flashRetryButton, 8400);
  setTimeout(flashRetryButton, 10600);
}

function continueFlash() {
  setTimeout(repeatFlash, 1100);
  setTimeout(repeatFlash, 13800);
  setTimeout(repeatFlash, 26500);
  setTimeout( function(){ 
    if (isGameOver) {
      onRetryPush(); 
      onResetPush(); 
      numSquares = 6;
    }}, 39200); 
}

function resetButtonActivate() {
  resetButton.addEventListener("click", function(){
    onResetPush();
  })
}

function onResetPush() {
  isGameOver = true;
  h2.textContent = "";
  flash = 0;
  revertEndText();
  revertBar();
  reset();
  resetGame(); 
}

function retryButtonActivate() {
  retry.addEventListener("click", function(){
    onRetryPush();
  })
}

function onRetryPush() {
    revertEndText();
    revertText();
    reset();
    resetGame();
    revertBar();
    startGame();
}

function playButtonActivate() {
  playButton.addEventListener("click", function(){
    computerArray = [];
    startGame();
  })
}

function toPlayMode() {
  for(let i=0;i<modeButtons.length;i++) {
    if (modeButtons[i].classList.contains("selected")) {
      modeButtons[i].classList.add("selectedPlayMode");
    } else {
      modeButtons[i].classList.add("playMode");
    }
  }
  resetButton.classList.add("resetPlay");
}
