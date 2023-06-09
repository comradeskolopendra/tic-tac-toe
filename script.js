let currentStep = "X";
let wins = sortStrArray([
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
  ["1", "4", "7"],
  ["5", "2", "8"],
  ["3", "6", "9"],
]);
const choices = {
  X: [],
  O: [],
};
const cells = document.querySelectorAll("div");
const repeat = document.querySelector("button");
const title = document.querySelector("h3");

repeat.addEventListener("click", repeatGame);
cells.forEach((element) => element.addEventListener("click", handlerOnClick));

function changePlayer() {
  currentStep = currentStep === "X" ? "O" : "X";
}

function handlerOnClick(event) {
  const target = event.currentTarget;
  target.textContent = currentStep;
  choices[currentStep].push(target.dataset.id);

  if (checkCells()) {
    title.textContent = `${currentStep} win!`;
    cells.forEach((element) =>
      element.removeEventListener("click", handlerOnClick)
    );
  } else {
    changePlayer();
    title.textContent = `${currentStep} turn`;
  }
}

function checkCells() {
  let isWin;

  wins.forEach((element) => {
    let winNums = element.join(" ");
    let currentNums = choices[currentStep]
      .sort((a, b) => {
        if (!a || !b) {
          return 0;
        } else {
          return a.localeCompare(b);
        }
      })
      .join(" ");

    console.log(`winNums: ${winNums}, currentNums: ${currentNums}`);

    if (winNums === currentNums) {
      isWin = true;
    }
  });

  return isWin;
}

function sortStrArray(array) {
  return array.map((winNums) => {
    return winNums.sort((a, b) => a.localeCompare(b));
  });
}

function repeatGame() {
  cells.forEach((element) => (element.textContent = ""));
  cells.forEach((element) => element.addEventListener("click", handlerOnClick));
  Object.values(choices).map((el) => (el = []));
  currentStep = "X";
  title.textContent = `${currentStep} turn`;
}
