let player_one = 0;
let player_two = 0;
let tile_wrapper = ["", "", "", "", "", "", "", "", ""];
let [
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

    [
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

    console.log({
      tile_wrapper,
      tile_one,
      tile_two,
      tile_three,
      tile_four,
      tile_five,
      tile_six,
      tile_seven,
      tile_eight,
      tile_nine,
    });

    gameLogicChecker();
  };

  const gameLogicChecker = () => {
    const checkRow = (rows) => {
      return (
        rows.every((value) => value === 1) || rows.every((value) => value === 2)
      );
    };

    let [row1, row2, row3] = [
      [tile_one, tile_two, tile_three],
      [tile_four, tile_five, tile_six],
      [tile_seven, tile_eight, tile_nine],
    ];
    console.log({ row1, row2, row3 });
    if (!row1.includes(0) && !row2.includes(0) && !row3.includes(0)) {
      return alert("tie");
    } else {
      if (checkRow(row1) || checkRow(row3) || checkRow(row3)) {
        alert("winner");
      }
    }
  };

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
