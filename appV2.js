let scoreJSON = '';
let tile_wrapper = [];
let [tile_one, tile_two, tile_three, tile_four, tile_five, tile_six, tile_seven, tile_eight, tile_nine] = tile_wrapper;
const p1_score = document.querySelector('.player-one .score-data');
const p2_score = document.querySelector('.player-two .score-data');
const tie_score = document.querySelector('.tie .score-data');
const btn_start = document.querySelector('.btn-start');
const btn_reset = document.querySelector('.btn-reset');
const btn_restart = document.querySelector('.btn-restart');
let gameOver = false;
let isStart = false;


let score = JSON.parse(localStorage.getItem("TicTacToe Score")) || {
  player_one: 0,
  player_two: 0,
  player_draw: 0
};

p1_score.textContent = score.player_one
p2_score.textContent  = score.player_two
tie_score.textContent  = score.player_draw

const startGame = () => {
  let checkResult = "";

  const addScore = (player) => {
    console.log(player);
    if (player === 1 || player === 2 || player === 'tie'){
      if (player === 1){
        score.player_one += 1;
        p1_score.textContent = score.player_one;
      } else if(player === 2){
        score.player_two += 1;
        p2_score.textContent = score.player_two;
      } else {
        score.player_draw += 1;
        tie_score.textContent = score.player_draw;
      } 
      updateScore();
      return gameOver = true;
    } else {
      return gameOver = false;
    }
  }

  const updateScore = () => {
    scoreJSON = JSON.stringify(score);
    localStorage.setItem('TicTacToe Score', scoreJSON);
  }

  const restartGame = () => {
    gameOver = false;
    isStart = false;
    checkResult = "";
    document.querySelectorAll(".box").forEach((box) => {
      box.classList.remove("circle");
      box.classList.remove("cross");
    });

    tile_wrapper = new Array(9).fill(0);
    [tile_one, tile_two, tile_three, tile_four, tile_five, tile_six, tile_seven, tile_eight, tile_nine] = tile_wrapper;
  
    updateScore();
  };

  const resetScore = () => {
    score.player_one = 0;
    score.player_two = 0;
    score.player_draw = 0;
    p1_score.textContent = 0;
    p2_score.textContent= 0;
    tie_score.textContent = 0;
    restartGame();
  }



  const gameLogicChecker = () => {
    let winnerFound = false;

    const checkPossibilities = (data) => {
      return data.map((box) => {
        if (box.every((value) => value === 1)) {
          checkResult = 1;
          return winnerFound = true;
        } else if (box.every((value) => value === 2)) {
          checkResult = 2;
          return winnerFound = true;
        }

      });
    };

    let rows = [
      [tile_one, tile_two, tile_three],
      [tile_four, tile_five, tile_six],
      [tile_seven, tile_eight, tile_nine],
    ];

    let columns = [
      [tile_one, tile_four, tile_seven],
      [tile_two, tile_five, tile_eight],
      [tile_three, tile_six, tile_nine],
    ];

    let diagonals = [
      [tile_one, tile_five, tile_nine],
      [tile_three, tile_five, tile_seven],
    ];


    if ((checkPossibilities(rows).some(Boolean) || 
    checkPossibilities(columns).some(Boolean) || 
    checkPossibilities(diagonals).some(Boolean))&& winnerFound){
      if (checkResult === 1) {
        alert('Player X Won')
      } else {
        alert ('Player O (Bot) Won');
      }
      addScore(checkResult);
    } else if (!tile_wrapper.includes(0)){
      alert("tie");
      addScore('tie');
    }
  };

  const gameLogic = () => {
    tile_wrapper = [...document.querySelectorAll(".box-wrapper .box")].map((tile) => tile.classList.contains("cross") ? 1: tile.classList.contains("circle") ? 2: 0);
    [tile_one, tile_two, tile_three, tile_four, tile_five, tile_six, tile_seven, tile_eight, tile_nine] = tile_wrapper;
    gameLogicChecker();
  };


  return { gameLogicChecker, gameLogic, addScore , resetScore, restartGame, checkResult,  };
};

const game = startGame();
const box_wrapper = document.querySelector(".box-wrapper");

for (var i = 1; i <= 9; i++) {
  const box = document.createElement("div");
  box.className = `box box-${i}`;
  box_wrapper.appendChild(box);
}


btn_start.addEventListener('click',(e) => {
  isStart = true;
  btn_start.style.display = "none";
})
btn_reset.addEventListener('click', () => {
  btn_start.style.display = "block";
  game.resetScore();
});

btn_restart.addEventListener('click', () => {
  game.restartGame();
  btn_start.style.display = "block";
  console.log('test')
})

  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", () => {
      if(isStart){
        if(gameOver){
          alert("restart game now");
        }else{
          if (!box.classList.contains("circle") && !box.classList.contains("cross")) {
            box.className += " cross";
            setTimeout(randomBot, 300);
            console.log(tile_wrapper);
            console.log([tile_one, tile_two, tile_three, tile_four, tile_five, tile_six, tile_seven, tile_eight, tile_nine])
          } else {
            alert("Please select other box");
          }
        }
      }
    });
});  

  function randomBot() {
    let emptyBoxes = Array.from(document.querySelectorAll(".box")).filter(
      (box) =>
        !box.classList.contains("circle") && !box.classList.contains("cross")
    );

    if (emptyBoxes.length === 0) {
    } else {
      let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      emptyBoxes[randomIndex].classList.add("circle");
    }
    game.gameLogic();
  }