
/*----- constants -----*/

console.log('loaded');


var gameWords = [
    'BENZ', 
    'JAGUAR', 
    'TESLA', 
    'LASSENS', 
    'RALPHS',  
    'CHIPOTLE',
    'WENDYS'
    ];

/*----- app's state (variables) -----*/

var hint;
var usedLetter;
var secretWord; /*holds the randomly chosen word from the words array*/
var wrongLetter;/*intialize to 9; dec. with each wrong guess*/
var guessLetter; /*holds the player's guess so far. Initialize to be a string of '_''s - same # as length a secretWord


/*----- cached(saving) element references -----*/

var $guess = $('#guess');
var $img = $('#hang-img');
var $hint = $('#hint');
var $message = $('#message');

/*---- event listeners -----*/

document.querySelector('table')
    .addEventListener('click', handleLetterClick)
   

/*--------- functions --------*/

function handleLetterClick(evt) {
    console.log(secretWord);
    var letter = evt.target.innerHTML;
    console.log(letter);
    if(usedLetter.includes(letter)) {
        return;
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

initialize();

function initialize() {
    wrongLetter = 8;
    secretWord = gameWords[getRandomIntegers(gameWords.length-1)];
    guessLetter = '_'.repeat(secretWord.length);
    usedLetter = [];
    $('td').removeClass('disable-td');

     if(secretWord === 'BENZ' || secretWord === 'JAGUAR' || secretWord === 'TESLA') {
        $hint.html('This is a luxury car');
    } else if (secretWord === 'CHIPOTLE' || secretWord === 'WENDYS') {
        $hint.html('This is a fast food place');
    } else if (secretWord === 'LASSENS' || secretWord === 'RALPHS') {
        $hint.html('This is a market');
    } else {
        $hint.html('');
    }

    render();
}


function getRandomIntegers(max) {
    return Math.floor(Math.random() * (max +1));
}

function render() {
    $(guess).html(guessLetter);
    $('#wrongLetter').html(wrongLetter);
    usedLetter.forEach(function(letter) {
        $('#' + letter).addClass('disable-td');
    });
    $img.attr('src', 'images/img' + wrongLetter + '.png');

}







