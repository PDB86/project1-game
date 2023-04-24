// chupar el elemento main
const board = document.getElementById("board");
//loguear en la consola cuando cada uno de los divs es cliqueado, y que diga cual fue

let state = [
  { front: "001.png", back: "back.png", discovered: false },
  { front: "001.png", back: "back.png", discovered: false },
  { front: "002.png", back: "back.png", discovered: false },
  { front: "002.png", back: "back.png", discovered: false },
  { front: "003.png", back: "back.png", discovered: false },
  { front: "003.png", back: "back.png", discovered: false },
  { front: "004.png", back: "back.png", discovered: false },
  { front: "004.png", back: "back.png", discovered: false },
  { front: "005.png", back: "back.png", discovered: false },
  { front: "005.png", back: "back.png", discovered: false },
  { front: "006.png", back: "back.png", discovered: false },
  { front: "006.png", back: "back.png", discovered: false },
  { front: "007.png", back: "back.png", discovered: false },
  { front: "007.png", back: "back.png", discovered: false },
  { front: "008.png", back: "back.png", discovered: false },
  { front: "008.png", back: "back.png", discovered: false },
  { front: "009.png", back: "back.png", discovered: false },
  { front: "009.png", back: "back.png", discovered: false },
  { front: "010.png", back: "back.png", discovered: false },
  { front: "010.png", back: "back.png", discovered: false },
  { front: "011.png", back: "back.png", discovered: false },
  { front: "011.png", back: "back.png", discovered: false },
  { front: "012.png", back: "back.png", discovered: false },
  { front: "012.png", back: "back.png", discovered: false },
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// shuffle(state);

let cardStatus = null;
let firstCardDrawnName = null;
let firstCardDrawnEl = null;

board.addEventListener("click", (e) => {
  if (cardStatus === null) {
    let firstSelectedElement = e.target;
    firstCardDrawnEl = firstSelectedElement;
    let firstSelectedName = firstSelectedElement.getAttribute("name");
    firstCardDrawnName = firstSelectedName;
    cardStatus = "first-card";
    firstSelectedElement.style.backgroundImage = `url(IMAGES/${state[firstSelectedName].front})`;
  } else if (cardStatus === "first-card") {
    let secondSelectedElement = e.target;
    let secondSelectedName = secondSelectedElement.getAttribute("name");
    secondSelectedElement.style.backgroundImage = `url(IMAGES/${state[secondSelectedName].front})`;
    if (state[firstCardDrawnName].front !== state[secondSelectedName].front) {
      cardStatus = "freeze";
      setTimeout(() => {
        firstCardDrawnEl.style.backgroundImage = `url(IMAGES/${state[firstCardDrawnName].back})`;
        secondSelectedElement.style.backgroundImage = `url(IMAGES/${state[secondSelectedName].back})`;
        cardStatus = null;
      }, 1000);
    } else {
      // cards match
      cardStatus = null;
      state[firstCardDrawnName].discovered = true;
      state[secondSelectedName].discovered = true;
      // end game check
      let remainingCards = 24;
      state.forEach((card) => {
        if (card.discovered === true) {
          remainingCards -= 1;
        }
      });
      if (remainingCards === 0) {
        const winMessage = document.createElement("h1");
        const appendMessage = document.body.append(winMessage);
        winMessage.innerText = "OMG YOU WON";
      }
    }
  }
});

document.getElementById("reshuffle").addEventListener("click", init);
function init() {
  let cardStatus = null;
  let firstCardDrawnName = null;
  let firstCardDrawnEl = null;
  state.forEach((card) => {
    card.discovered = false;
  });
  shuffle(state);
  let divsss = document.getElementsByClassName('divs')
  divsss.forEach(div => {
    div.style.backgroundImage = `url(IMAGES/back.png)`
  })
}
