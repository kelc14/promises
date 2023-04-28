let baseUrl = "https://deckofcardsapi.com/api/deck";

let deckId = "new";
let remCards = 52;

// add click listener to "draw card" button
let drawBtn = document.querySelector("#draw-btn");
drawBtn.addEventListener("click", drawCard);

// draw a card when draw button clicked
async function drawCard() {
  // if no cards remain, hide the draw button, add reset button and reshuffle the deck
  if (remCards === 0) {
    drawBtn.style.display = "none";
    addReset();
  } else {
    //  otherwise draw a new card and display it
    let res = await $.getJSON(`${baseUrl}/${deckId}/draw/?count=1`);
    deckId = res.deck_id;
    remCards = res.remaining;
    displayCard(res.cards[0].value, res.cards[0].suit);
  }
}

cardContainer = document.querySelector(".card-container");

function displayCard(val, suit) {
  // create new card image, set source image, and set all CSS styles

  newCard = document.createElement("img");
  newCard.className = "playing-card";

  // set source image using the value and suit of the drawn card
  val = val.toLowerCase();
  suit = suit.toLowerCase();
  newCard.setAttribute("src", `card_images/${val}_of_${suit}.png`);

  // set rotation of card
  let cardRotate = [-30, -15, 0, 15, 30];
  let loc = cardRotate[Math.floor(Math.random() * cardRotate.length)];
  newCard.style.transform = `rotate(${loc}deg)`;

  cardContainer.appendChild(newCard);
}

function addReset() {
  // add a reshuffle button
  resetBtn = document.createElement("button");
  resetBtn.className = "btn btn-lg btn-danger mt-3";
  resetBtn.innerText = "Reshuffle";
  btnContainer = document.querySelector(".btn-container");
  btnContainer.appendChild(resetBtn);

  // add event listener - when clicked, shuffle cards for our deck and then hide the reshuffle button, display draw card button
  resetBtn.addEventListener("click", async () => {
    let res = await $.getJSON(
      `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
    );
    remCards = res.remaining;
    drawBtn.style.display = "initial";
    resetBtn.style.display = "none";
    cardContainer.innerHTML = "";
  });
}
