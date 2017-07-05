
/*----- constants -----*/

console.log('loaded');


var gameWords = [
    'BENZ', 
    'JAGUAR', 
    'TESLA', 
    'LASSENS', 
    'RALPHS', 
    'IN N OUT', 
    'CHIPOTLE'
    ];

/*----- app's state (variables) -----*/

var hint;
var usedLetter;
var secretWord; /*holds the randomly chosen word from the words array*/
var playerSecretWord;
var wrongLetter;/*intialize to 0; inc. with each wrong guess*/
var guessLetter; /*holds the player's guess so far. Initialize to be a string of '_''s - same # as length a secretWord


/*----- cached(saving) element references -----*/

var $guess = $('#guess');


/*---- event listeners -----*/

document.querySelector('table')
    .addEventListener('click', handleLetterClick);
   

/*--------- functions --------*/

function handleLetterClick(evt) {
    console.log(secretWord);
    var letter = evt.target.textContent;
    console.log(letter);
    if(usedLetter.includes(letter)) {

    } else {
        usedLetter.push(letter);
    }
    if(secretWord.includes(letter)) {
        var position = secretWord.indexOf(letter);
        while (position >= 0) {
            guessLetter = guessLetter.split('');
            guessLetter[position] = letter;
            guessLetter = guessLetter.join('');
            console.log(guessLetter);
            position = secretWord.indexOf(letter, position + 1);  
        }
    } else if (wrongLetter > 0) {
        wrongLetter--;
        } else {
            return;
        }

    render();
}

function smallHint() {
    var getHint = document.getElementById('hint');
    hint = getHint;
    if(secretWord === 'BENZ') {
        console.log('This is a luxury vehicle.');
    }
}


/* function pictures() {

    var bodyParts = {
    imgNine: 'head',
    imgEight: 'torso',
    imgSeven: 'left arm',
    imgSix: 'right arm',
    imgFive: 'left leg',
    imgFour: 'right leg',
    imgThree: 'left foot',
    imgTwo: 'right foot',
    imgOne: 'body turns red'
    };
} */


resetGame(); 


function resetGame () {
    wrongLetter = 9;
    secretWord = gameWords[getRandomIntegers(gameWords.length-1)];
    guessLetter = '_'.repeat(secretWord.length);
    usedLetter = [];
    bodyParts = {};
    $('td').removeClass('disable-td');
    render();
}

function getRandomIntegers(max) {
    return Math.floor(Math.random() * max);
}

function render() {
    $(guess).html(guessLetter);
    $('#wrongLetter').html(wrongLetter);
    usedLetter.forEach(function(letter) {
        $('#' + letter).addClass('disable-td');
    });    
}



