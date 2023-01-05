"use strict";

//remove everything and set to default

const Elscore0 = document.querySelector("#score--0");
const Elscore1 = document.querySelector("#score--1");

const Eldice = document.querySelector(".dice");

Elscore0.textContent = 0;
Elscore1.textContent = 0;

Eldice.classList.add("hidden");

//it's block and open roll and hold button

let playing = true;

//Phase #1

//User rolls dice

const btnRoll = document.querySelector(".btn--roll");

const Elcurrent0 = document.querySelector("#current--0");
const Elcurrent1 = document.querySelector("#current--1");

//Player's

const Elplayer0 = document.querySelector(".player--0");
const Elplayer1 = document.querySelector(".player--1");

let currentScore = 0;
let activePlayer = 0;

//Switch player function

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer == 0 ? 1 : 0;

  Elplayer0.classList.toggle("player--active");
  Elplayer1.classList.toggle("player--active");
};

//Dice roll Function

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate the random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice number
    Eldice.classList.remove("hidden");
    Eldice.src = `dice-${dice}.png`;
    // 3. if dice number !== 1, so add dice roll number to current score
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
      //Elcurrent0.textContent = currentScore;
    } // if dice number == 1, so switch the player
    else {
      switchPlayer();
    }
  }
});

//Phase #2

//User holds score

const score = [0, 0];

const btnHold = document.querySelector(".btn--hold");

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add current score to total score
    score[activePlayer] += currentScore;
    const scores = (document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer]);
    //Score >= 100 then the active player is winner
    if (scores >= 100) {
      playing = false;
      Eldice.classList.add("hidden");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    } //Otherwise Switch player
    else {
      switchPlayer();
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", function () {
  location.reload();
});
