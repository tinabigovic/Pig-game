"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnReset = document.querySelector(".btn--new");

// Starting conditions
score0El.textContent = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
// starting with first player
let activePlayer = 0;
// state of game
let playing = true;

function switchPlayer() {
  // switch to the next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); // toggle() method checks if there is class, adds it if is not
  player1El.classList.toggle("player--active"); // deletes it if there is
}

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //   Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //   Checked if rolled is 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // adding current score to active player's score
    scores[activePlayer] += currentScore;
    // displaying
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player's score is >100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      // hide the dice
      diceEl.classList.add("hidden");
      // adding winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      //   removing active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //   switch player
      switchPlayer();
    }
  }
});

// on clicking button for new game:
btnReset.addEventListener("click", function () {
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentScore = 0;
  diceEl.classList.add("hidden");
  if (player0El.classList.contains("player--winner")) {
    player0El.classList.remove("player--winner");
  } else {
    player1El.classList.remove("player--winner");
  }
  if (player1El.classList.contains("player--active")) {
    player0El.classList.remove("player--active");
  }
  player0El.classList.add("player--active");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  playing = true;
});
