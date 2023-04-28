function addToList(listId, listItem) {
  ol = document.querySelector(`#${listId}`);
  let li = document.createElement("li");
  li.innerText = `${listItem}`;
  ol.appendChild(li);
}

//  number 1

let num = 14;
let url = "http://numbersapi.com";

$.getJSON(`${url}/${num}?json`)
  .then((res) => {
    addToList("fav-num-fact", res.text);
  })
  .catch((err) => console.log(err, "error"));

//   number 2

let otherNums = [4, 20, 29];
$.getJSON(`${url}/${otherNums}`).then((res) => {
  console.log(res[4]);
  for (let i = 0; i < otherNums.length; i++) {
    currNum = otherNums[i];
    addToList("num-facts", res[currNum]);
  }
});

//  number 3

Promise.all(
  Array.from({ length: 4 }, () => $.getJSON(`${url}/${num}?json`))
).then((res) => {
  for (let i = 0; i < res.length; i++) {
    addToList("fav-num-facts", res[i].text);
  }
});
