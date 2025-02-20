let player_one = 0;
let player_two = 0;
let tile_wrapper = ["", "", "", "", "", "", "", "", ""];
const [
  tile_one,
  tile_two,
  tile_three,
  tile_four,
  tile_five,
  tile_six,
  tile_seven,
  tile_eight,
  tile_nine,
] = tile_wrapper;

const startGame = () => {
  const gameLogic = () => {
    tile_wrapper = [...document.querySelectorAll(".box-wrapper .box")].map(
      (tile) =>
        tile.classList.contains("cross")
          ? 1
          : tile.classList.contains("circle")
          ? 2
          : 0
    );
    console.log(tile_wrapper);
  };

  const gameLogicChecker = () => {};

  return { gameLogicChecker, gameLogic };
};

const game = startGame();
game.gameLogic();
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
    return;
  } else {
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    emptyBoxes[randomIndex].classList.add("circle");
    game.gameLogic();
  }
}

box_wrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("box")) {
  }
});
