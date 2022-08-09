const qwerty = document.getElementById("qwerty");
   

const phrase = document.getElementById("phrase");
    

const startButton = document.getElementsByClassName("reset__g");

const button = document.getElementById("button");

const overlay = document.getElementById("overlay");

const phraseUl = document.querySelector('ul');

console.log('ul',  phraseUl)

let missed = 0;

const phrases = ["Hello Daniel", "Up and Down", "Left and Right", "See you Later", "Good morning"];


const getRandomPhraseAsArray = arr => {  //this function will pull a random phrase from the phrases array. The 5 phrases have the value 0-4
    const phrasesLength = arr.length;
    const randomNumber = Math.floor(Math.random() * phrasesLength); //Math.floor returns the largest integer less than or equal to a given number.
    const index = randomNumber <= 0 ? 0 : randomNumber - 1;
    return [phrases[index]]
}

const returnedPhraseArr = getRandomPhraseAsArray(phrases)
 
const addPhraseToDisplay = arr => {
    const stringArr = arr[0].split("")
    // loop over stringArr and set each letter into a list item
    stringArr.forEach(letter =>{
        const liItem = document.createElement('li');// for each 'letter' create li item
        liItem.textContent=letter;// put letter in the li item
        liItem.classList.add(`${letter===" "?"space":"letter"}`) //classname set to "space" if letter is a space. String interpolation. Classname set to "letter" if letter is a letter.
        phraseUl.append(liItem)// append to #phrase ul
        
             
 })

}
addPhraseToDisplay(returnedPhraseArr);

const checkLetter = clickedLetter => {
    
//concept
//on keypress check value of key against phrase array
//if it is a match, then display the letter and store button text in match variable.
//store collection of li in variable
//create match variable as a bullion
//loop over collection if keypress matches collection element value, change display to show and store button text in match variable.
//on loop return, return the match variable

const lettersArray = document.getElementsByClassName("letter");
//console.log('lettersArray', lettersArray);
let isMatch = null;
for(let i = 0; i < lettersArray.length; i++){
    const letterLi = lettersArray[i];
    const letterLiText = letterLi.innerText.toLowerCase();
    //console.log(letterLiText)
    letterLi.classList.add(`${clickedLetter===letterLiText && "show"}`) 
    // if match set matched letter to isMatch

    if(clickedLetter===letterLiText){
        isMatch=clickedLetter;
  }
  console.log("isMatch", isMatch)
}



}

const checkWin = () => {

}

button.addEventListener('click', () => {
    overlay.style.display = "none";
            
    });

qwerty.addEventListener('click', e => {
// on key press send button to checkLetter(button)
const clickedLetter = e.target.innerText; 
checkLetter(clickedLetter)
});



