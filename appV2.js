let player_one = 0;
let player_two = 0;
let tile_wrapper = [];
let [tile_one, tile_two, tile_three, tile_four, tile_five, tile_six, tile_seven, tile_eight, tile_nine] = tile_wrapper;

const startGame = () => {
  const gameLogic = () => {
    tile_wrapper = [...document.querySelectorAll(".box-wrapper .box")].map((tile) => tile.classList.contains("cross") ? 1: tile.classList.contains("circle") ? 2: 0);
    [tile_one, tile_two, tile_three, tile_four, tile_five, tile_six, tile_seven, tile_eight, tile_nine] = tile_wrapper;
    gameLogicChecker();
  };

  const gameLogicChecker = () => {
    const checkPossibilities = (data) => {
      return data.map((box) => {
        return box.every((value) => value === 1) || box.every((value) => value === 2)
      })
    }

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

    console.log({tile_wrapper})

    if (!tile_wrapper.includes(0)) {
       return alert("tie");
    } else {
      if (checkPossibilities(rows).some(Boolean) || checkPossibilities(columns).some(Boolean) || checkPossibilities(diagonals).some(Boolean)) {
        alert("winner");
      }
    }
  };

  return { gameLogicChecker, gameLogic };
};

const game = startGame();
const box_wrapper = document.querySelector(".box-wrapper");

for (var i = 1; i <= 9; i++) {
  const box = document.createElement("div");
  box.className = `box box-${i}`;
  box_wrapper.appendChild(box);
}

document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.classList.contains("circle") && !box.classList.contains("cross")) {
      box.className += " cross";
      setTimeout(randomBot, 300);
    } else {
      alert("Please select other box");
    }
  });
});

function randomBot() {
  let emptyBoxes = Array.from(document.querySelectorAll(".box")).filter(
    (box) =>
      !box.classList.contains("circle") && !box.classList.contains("cross")
  );

  if (emptyBoxes.length === 0) {
    return game.gameLogic();
  } else {
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    emptyBoxes[randomIndex].classList.add("circle");
  }
  game.gameLogic();
}

box_wrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("box")) {
  }
});
