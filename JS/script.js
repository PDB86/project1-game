// chupar el elemento main
const board = document.getElementById("board");
//loguear en la consola cuando cada uno de los divs es cliqueado, y que diga cual fue

let state = [
  { front: "001.png", back: "BACK.png", discovered: false },
  { front: "001.png", back: "BACK.png", discovered: false },
  { front: "002.png", back: "BACK.png", discovered: false },
  { front: "002.png", back: "BACK.png", discovered: false },
  { front: "003.png", back: "BACK.png", discovered: false },
  { front: "003.png", back: "BACK.png", discovered: false },
  { front: "004.png", back: "BACK.png", discovered: false },
  { front: "004.png", back: "BACK.png", discovered: false },
  { front: "005.png", back: "BACK.png", discovered: false },
  { front: "005.png", back: "BACK.png", discovered: false },
  { front: "006.png", back: "BACK.png", discovered: false },
  { front: "006.png", back: "BACK.png", discovered: false },
  { front: "007.png", back: "BACK.png", discovered: false },
  { front: "007.png", back: "BACK.png", discovered: false },
  { front: "008.png", back: "BACK.png", discovered: false },
  { front: "008.png", back: "BACK.png", discovered: false },
  { front: "009.png", back: "BACK.png", discovered: false },
  { front: "009.png", back: "BACK.png", discovered: false },
  { front: "010.png", back: "BACK.png", discovered: false },
  { front: "010.png", back: "BACK.png", discovered: false },
  { front: "011.png", back: "BACK.png", discovered: false },
  { front: "011.png", back: "BACK.png", discovered: false },
  { front: "012.png", back: "BACK.png", discovered: false },
  { front: "012.png", back: "BACK.png", discovered: false },
];

//////////////////////////////////////////

//STOLE THIS FROM STACK OVERFLOW
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
//////////////////////////////////////////

// shuffle(state);

document.getElementById("reshuffle").addEventListener("click", init);

function init() {
  playWrongCards();
  function playWrongCards() {
    const wrongPairSFX = new Audio("SOUNDS/wrong.mp3");
    wrongPairSFX.play();
  }
  cardStatus = null;
  firstCardDrawnName = null;
  firstCardDrawnEl = null;
  state.forEach((card) => {
    card.discovered = false;
  });
  shuffle(state);
  let divsss = document.querySelectorAll(".divs");
  divsss.forEach((div) => {
    div.style.backgroundImage = `url(IMAGES/BACK.png)`;
  });
}

let cardStatus = null; // 3 statuses "first-card" "freeze" and "null(default)"
let firstCardDrawnNameGlobal = null;
let firstCardDrawnElGlobal = null;

init();

board.addEventListener("click", (e) => {
  if (e.target.tagName === 'MAIN') {
    return;
  }
  if (cardStatus === null) {
    let firstSelectedElement = e.target;
    firstCardDrawnElGlobal = firstSelectedElement;
    let firstSelectedName = firstSelectedElement.getAttribute("name");
    firstCardDrawnNameGlobal = firstSelectedName;
    cardStatus = "first-card";
    //SFX
    playCard1();
    function playCard1() {
      const cardUnoSFX = new Audio("SOUNDS/card1.mp3");
      cardUnoSFX.play();
    }
    //
    firstSelectedElement.style.backgroundImage = `url(IMAGES/${state[firstSelectedName].front})`;
  } else if (cardStatus === "first-card") {
    let secondSelectedElement = e.target;
    let secondSelectedName = secondSelectedElement.getAttribute("name");
    playCard2();
    function playCard2() {
      const cardDosSFX = new Audio("SOUNDS/card2.mp3");
      cardDosSFX.play();
    }
    secondSelectedElement.style.backgroundImage = `url(IMAGES/${state[secondSelectedName].front})`;
    if (
      state[firstCardDrawnNameGlobal].front !== state[secondSelectedName].front
    ) {
      cardStatus = "freeze";
      setTimeout(() => {
        firstCardDrawnElGlobal.style.backgroundImage = `url(IMAGES/${state[firstCardDrawnNameGlobal].back})`;
        secondSelectedElement.style.backgroundImage = `url(IMAGES/${state[secondSelectedName].back})`;
        cardStatus = null;
        playWrongCards();
        function playWrongCards() {
          const wrongPairSFX = new Audio("SOUNDS/wrong.mp3");
          wrongPairSFX.play();
        }
      }, 1000);
    } else {
      // cards match
      correctCards();
      function correctCards() {
        const correctSFX = new Audio("SOUNDS/right-card.mp3");
        correctSFX.play();
      }
      cardStatus = null;
      state[firstCardDrawnNameGlobal].discovered = true;
      state[secondSelectedName].discovered = true;
      // end game check
      let remainingCards = 24;
      state.forEach((card) => {
        if (card.discovered === true) {
          remainingCards -= 1;
        }
      });
      if (remainingCards === 0) {
        playVictory();
        function playVictory() {
          const youWonSFX = new Audio("SOUNDS/win.mp3");
          youWonSFX.play();
        }
        const winMessage = document.createElement("h1");
        winMessage.innerText = "OMG YOU WON";
        document.body.append(winMessage);
      }
    }
  }
});

