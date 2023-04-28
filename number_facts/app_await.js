function addToList(listId, listItem) {
  ol = document.querySelector(`#${listId}`);
  let li = document.createElement("li");
  li.innerText = `${listItem}`;
  ol.appendChild(li);
}

//  number 1

let num = 14;
let url = "http://numbersapi.com";

async function getNumFact(num, url) {
  try {
    let res = await $.getJSON(`${url}/${num}?json`);
    addToList("fav-num-fact", res.text);
  } catch (err) {
    console.log(err, "error");
  }
}
getNumFact(num, url);

//   number 2

let otherNums = [4, 20, 29];
async function getOtherNumFacts(otherNums, url) {
  try {
    let res = await $.getJSON(`${url}/${otherNums}`);
    for (let i = 0; i < otherNums.length; i++) {
      currNum = otherNums[i];
      addToList("num-facts", res[currNum]);
    }
  } catch (err) {
    console.log(err, "error");
  }
}
getOtherNumFacts(otherNums, url);

//  number 3

async function getFavNumFacts(url, num) {
  try {
    let res = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${url}/${num}?json`))
    );
    for (let i = 0; i < res.length; i++) {
      addToList("fav-num-facts", res[i].text);
    }
  } catch (err) {
    console.log(err, "error");
  }
}

getFavNumFacts(url, num);
