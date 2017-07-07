
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

$('table').on('click', 'td', handleLetterClick)
$('#newgame').on('click', initialize)    

/*--------- functions --------*/

initialize();
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


function initialize() {
    wrongLetter = 9;
    secretWord = gameWords[getRandomIntegers(gameWords.length-1)];
    guessLetter = '_'.repeat(secretWord.length);
    usedLetter = [];
    $('td').removeClass('disable-td');
    console.log('secretWord', secretWord);
    
    if(secretWord === 'BENZ' || secretWord === 'JAGUAR' || secretWord === 'TESLA') {
        $hint.html('this word is a luxury car');
    } else if (secretWord === 'CHIPOTLE' || secretWord === 'WENDYS') {
        $hint.html('this word is a fast food place');
    } else if (secretWord === 'LASSENS' || secretWord === 'RALPHS') {
        $hint.html('this word is a market');
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

    if(guessLetter === secretWord) {
        $message.html('YOU WIN').css('color', 'green');
        $('table').css('visibility', 'hidden');
    } else if (wrongLetter === 0) {
        $message.html('YOU LOSE').css('color', 'red');
        $('table').css('visibility', 'hidden');
    } else {
        $message.html('');
        $('table').css('visibility', 'visible');
    }

}







