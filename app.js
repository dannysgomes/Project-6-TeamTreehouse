// GLOBAL VARIABLES
const qwerty = document.getElementById("qwerty");

const phrase = document.getElementById("phrase");

const startButton = document.getElementsByClassName("reset__g");

const button = document.getElementById("button");

const overlay = document.getElementById("overlay");

const phraseUl = document.querySelector("ul");

const heartsCollection = document.getElementsByClassName("tries");
const heartsArray = Array.from(heartsCollection);

// Store matched value
let letterMatch = null;
// store missed
let missedCounter = 0;

const phrases = [
  "Hello Daniel",
  "Up and Down",
  "Left and Right",
  "See you Later",
  "Good morning",
];

// END GLOBAL VARIABLES

const getRandomPhraseAsArray = (arr) => {
  //this function will pull a random phrase from the phrases array. The 5 phrases have the value 0-4
  const phrasesLength = arr.length;
  const randomNumber = Math.floor(Math.random() * phrasesLength); //Math.floor returns the largest integer less than or equal to a given number.
  const index = randomNumber <= 0 ? 0 : randomNumber - 1;
  return [phrases[index]];
};

const returnedPhraseArr = getRandomPhraseAsArray(phrases);
// Temp log
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

const decreaseHearts = () => {
  // Since there are 5 lives, we only execute the code if 'missedCounter' is equal or less to 5.
  if (missedCounter <= 5) {
    const heartAtIndex = missedCounter - 1;
    const imagesCollection = document.getElementsByClassName("tries");
    const imagesArray = Array.from(imagesCollection);
    const imageElement = imagesArray[heartAtIndex].firstElementChild;
    imageElement.src = "images/lostHeart.png";
  }
};

const checkLetter = (clickedLetter) => {
  //concept
  //on keypress check value of key against phrase array
  //if it is a match, then display the letter and store button text in match variable.

  // EXECUTION
  // set a collection of letter elements
  const lettersCollection = document.getElementsByClassName("letter");
  const lettersArray = Array.from(lettersCollection);
  const isMatch = lettersArray.find(
    (e) => e.innerText.toLowerCase() === clickedLetter
  );

  // if isMatch is undefined or 'wrong', then update hearts,
  // if a match, then iterate over array and set each match to 'show'
  if (!isMatch) {
    missedCounter++;
    decreaseHearts();
  } else {
    // iterate over lettersArray
    lettersArray.forEach((letterElement) => {
      // set letter to letterElement's innter text and lower case
      const letter = letterElement.innerText.toLowerCase();
      if (letter === clickedLetter) {
        // set letterMatch to matching letter
        letterMatch = letter;
        letterElement.classList.add("show");
      }
    });
  }
  checkWin();

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
};
function checkWin() {
  const lettersCollection = document.getElementsByClassName("letter");
  const lettersArray = Array.from(lettersCollection);
  const winLettersCollection = document.getElementsByClassName("letter");
  const showLettersCollection = document.getElementsByClassName("show");
  const keyboardCollection = document.getElementsByClassName("key");
  const keyboardArray = Array.from(keyboardCollection);
  const imagesCollection = document.getElementsByClassName("tries");
  const heartsArray = Array.from(imagesCollection);
  const resetPhrase = () => {
    lettersArray.forEach((letterElement) => {
      // set letter to letterElement's innter text and lower case
      letterElement.classList.remove("show");
    });
  };
  const resetKeyboard = () => {
    keyboardArray.forEach((keyElement) => {
      // set letter to letterElement's innter text and lower case
      keyElement.classList.remove("chosen");
      keyElement.disabled = false;
    });
  };
  const resetHearts = () => {
    heartsArray.forEach((heartElement) => {
      // set letter to letterElement's innter text and lower case
      const imageElement = heartElement.firstElementChild;
      imageElement.src = "images/liveHeart.png";
    });
  };
  const resetCounter = () => {
    missedCounter = 0;
  };
  if (winLettersCollection.length === showLettersCollection.length) {
    console.log("overlay", overlay);
    // target overaly and add class of win
    overlay.classList.add("win");
    overlay.classList.remove("lose");
    overlay.style.display = "flex";
    overlay.firstElementChild.innerText = "Daniel won the wheel of success";
    button.innerText = "replay";
    // In the future reset game
    resetKeyboard();
    resetPhrase();
    resetHearts();
    resetCounter();
  }
  if (missedCounter > 4) {
    console.log("lost");
    overlay.firstElementChild.innerText = "You lost the wheel of success";
    overlay.classList.add("lose");
    overlay.classList.remove("win");

    overlay.style.display = "flex";
    button.innerText = "replay";
    // reset
    resetKeyboard();
    resetPhrase();
    resetHearts();
    resetCounter();
  }
}

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
