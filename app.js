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
        const liItem = document.createElement('li');
        liItem.textContent=letter;
        liItem.classList.add(`${letter===" "?"space":"letter"}`) //classname set to "space" if letter is a space. String interpolation. Classname set to "letter" if letter is a letter.
        phraseUl.append(liItem)
        // for each 'letter' create li item
        // put letter in the li item
        // append to #phrase ul
 })

}
addPhraseToDisplay(returnedPhraseArr);

const checkLetter = button => {

}

const checkWin = () => {

}

button.addEventListener('click', () => {
    overlay.style.display = "none";
            
    });

qwerty.addEventListener('click', e => {

});



