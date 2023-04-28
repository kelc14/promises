let baseUrl = "https://deckofcardsapi.com/api/deck";

let deckId = "new";
let remCards = 52;

let drawBtn = document.querySelector("#draw-btn");
drawBtn.addEventListener("click", drawCard);

function drawCard() {
  if (remCards === 0) {
    drawBtn.style.display = "none";
    addReset();
  } else {
    $.getJSON(`${baseUrl}/${deckId}/draw/?count=1`).then((res) => {
      deckId = res.deck_id;
      remCards = res.remaining;
      //   console.log(res.cards[0].value, res.cards[0].suit);
      displayCard(res.cards[0].value, res.cards[0].suit);
    });
  }
}

cardContainer = document.querySelector(".card-container");

function displayCard(val, suit) {
  newCard = document.createElement("img");
  newCard.className = "playing-card";
  val = val.toLowerCase();
  suit = suit.toLowerCase();
  newCard.setAttribute("src", `card_images/${val}_of_${suit}.png`);
  // set location
  let cardRotate = [-30, -15, 0, 15, 30];
  let loc = cardRotate[Math.floor(Math.random() * cardRotate.length)];
  newCard.style.transform = `rotate(${loc}deg)`;

  cardContainer.appendChild(newCard);
}

function addReset() {
  resetBtn = document.createElement("button");
  resetBtn.className = "btn btn-lg btn-danger mt-3";
  resetBtn.innerText = "Reshuffle";

  btnContainer = document.querySelector(".btn-container");
  btnContainer.appendChild(resetBtn);

  resetBtn.addEventListener("click", () => {
    $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`).then(
      (res) => {
        remCards = res.remaining;
        drawBtn.style.display = "initial";
        resetBtn.style.display = "none";
        cardContainer.innerHTML = "";
      }
    );
  });
}
