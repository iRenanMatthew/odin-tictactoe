let player_one = 0;
let player_two = 0;
const tile_wrapper = ["", "", "", "", "", "", "", "", ""];
const column_count = 3;
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

const startGame = (player, key) => {
  const getScore = (player) => {
    if (player === "player_one") {
      player_one += 1;
    } else {
      player_two += 1;
    }
  };

  const resetScore = () => {
    player_one = 0;
    player_two = 0;
  };

  const resetGame = () => {
    tile_wrapper = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  };

  const gameLogic = (player, key) => {
    // [...document.querySelectorAll(".box-wrapper .box")].map(tile => tile.classList.contains("cross") ? 1 : tile.classList.contains("circle") ? 2 : 0)
  };

  const gameLogicChecker = () => {
    if (tile_one === tile_two && tile_two === tile_three && tile_one !== 0) {
      // alert(playerVerifier(key));
    } else if (
      tile_four === tile_five &&
      tile_five === tile_six &&
      tile_four !== 0
    ) {
      // alert(playerVerifier(key));
    } else if (
      tile_seven === tile_eight &&
      tile_eight === tile_nine &&
      tile_seven !== 0
    ) {
      // alert(playerVerifier(key));
    } else {
      return alert("None");
    }
  };

  const playerVerifier = (key) => {
    var name = "";
    if (key === "x") {
      name = `${player} won`;
    } else {
      name = "AI won";
    }
    console.log(name);
    return name;
  };

  return { gameLogicChecker };
};

const game = startGame("Itik", "x");

const box_wrapper = document.querySelector(".box-wrapper");

for (var i = 1; i <= 9; i++) {
  const box = document.createElement("div");
  box.className = `box box-${i}`;
  box_wrapper.appendChild(box);
}

document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", (e) => {
    console.log(e);
    if (!box.classList.contains("circle") && !box.classList.contains("cross")) {
      box.className += " cross";
      game.gameLogicChecker();
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
    game.gameLogicChecker();
    console.log(emptyBoxes);
    emptyBoxes[randomIndex].classList.add("circle");
  }
}

box_wrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("box")) {
  }
});
