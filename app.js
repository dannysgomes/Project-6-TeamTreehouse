const qwerty = document.getElementById("qwerty");

const phrase = document.getElementById("phrase");

const startButton = document.getElementsByClassName("reset__g");

const button = document.getElementById("button");

const overlay = document.getElementById("overlay");

const phraseUl = document.querySelector("ul");

const heartsCollection = document.getElementsByClassName("tries");
const heartsArray = Array.from(heartsCollection);

//console.log('ul',  phraseUl)
// Store matched value
let letterMatch = null;
// store missed
let missed = 0;

/*
const phrases = [
  "Hello Daniel",
  "Up and Down",
  "Left and Right",
  "See you Later",
  "Good morning",
];
*/
const phrases = ["hello hello"];

const getRandomPhraseAsArray = (arr) => {
  //this function will pull a random phrase from the phrases array. The 5 phrases have the value 0-4
  const phrasesLength = arr.length;
  const randomNumber = Math.floor(Math.random() * phrasesLength); //Math.floor returns the largest integer less than or equal to a given number.
  const index = randomNumber <= 0 ? 0 : randomNumber - 1;
  return [phrases[index]];
};

const returnedPhraseArr = getRandomPhraseAsArray(phrases);
console.log("returnedPhraseArr", returnedPhraseArr);

const addPhraseToDisplay = (arr) => {
  const stringArr = arr[0].split("");
  // loop over stringArr and set each letter into a list item
  stringArr.forEach((letter) => {
    const liItem = document.createElement("li"); // for each 'letter' create li item
    liItem.textContent = letter; // put letter in the li item
    liItem.classList.add(`${letter === " " ? "space" : "letter"}`); //classname set to "space" if letter is a space. String interpolation. Classname set to "letter" if letter is a letter.
    phraseUl.append(liItem); // append to #phrase ul
  });
};
addPhraseToDisplay(returnedPhraseArr);

const decreaseHeart = () => {
  // create heartAtIndex and set it to the heart element in the heartsArray at missed index
  // hint, missed index will be 'missed' variable - 1;
  const heartAtIndex = heartsArray[missed - 1];

  // we will need to change the heart image src to 'images/lostHeart.png'
  // create imageElment and set it to the first child of the 'heartAtIndex'
  // hit: to get the first child element you will use .firstChild, id. someElement.firstChild
  const imageElement = heartAtIndex.firstChild;

  // update src of imageElement to 'images/lostHeart.png'
  imageElement.src = "images/lostHeart.png";
};

const checkLetter = (clickedLetter) => {
  //concept
  //on keypress check value of key against phrase array
  //if it is a match, then display the letter and store button text in match variable.

  // EXECUTION
  // set a collection of letter elements
  const lettersCollection = document.getElementsByClassName("letter");
  // Convert collection to array so we can use array methods
  const lettersArray = Array.from(lettersCollection);

  // use find() to find match or undefined in array
  const isMatch = lettersArray.find(
    (e) => e.innerText.toLowerCase() === clickedLetter
  );
  // if isMatch is undefined or 'wrong', then update hearts,
  // if not a match, then iterate over array and set each match to 'show'
  if (!isMatch) {
    // increase missed counter by one below:
    missed++;
    // Call descreaseHeart() below:
    decreaseHeart();
  } else {
    // iterate over lettersArray
    lettersArray.forEach((letterElement) => {
      // set letter to letterElement's innter text and lower case
      const letter = letterElement.innerText.toLowerCase();
      if (letter === clickedLetter) {
        increase();
        // set letterMatch to matching letter
        letterMatch = letter;
        letterElement.classList.add(
          `${clickedLetter === letterMatch && "show"}`
        );
      }
    });
  }

  /*
  first I tried a loop over the collection, but the match/no match logic got complicated
  
  for (let i = 0; i < lettersCollection.length; i++) {
    const letterLi = lettersCollection[i];
    const letterLiText = letterLi.innerText.toLowerCase();
    //console.log(letterLiText)
    letterLi.classList.add(`${clickedLetter === letterLiText && "show"}`);
    // if match set matched letter to isMatch

    if (clickedLetter === letterLiText) {
      isMatch = clickedLetter;
      console.log('match')
      return; // tried with returns but it did not help...
    } else {
        console.log('wrong')
        return;
    }
  }
  */

  //console.log("wrongCounter", wrongCounter);
};

function checkWin() {}

button.addEventListener("click", () => {
  overlay.style.display = "none";
});

qwerty.addEventListener("click", (e) => {
  // on key press send button to checkLetter(button)
  const clickedButton = e.target;
  const clickedLetter = e.target.innerText;
  const nodeName = e.target.nodeName;

  if (nodeName === "BUTTON") {
    clickedButton.classList.add("chosen");
    // disabled clieckButton
    clickedButton.disabled = true;
    checkLetter(clickedLetter);
  }
});
