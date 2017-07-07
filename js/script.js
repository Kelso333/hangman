
/*----- constants -----*/

var gameWords = [
    'CHEESE', 
    'MOUSE', 
    'JERRY', 
    'BROWN', 
    'CAT',  
    'CHASE',
    'TOM',
    'GREY'
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
    var letter = evt.target.innerHTML;
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
    
    if(secretWord === 'CHEESE' || secretWord === 'MOUSE' || secretWord === 'JERRY' || secretWord === 'BROWN') {
        $hint.html('this word relates to Jerry');
    } else if (secretWord === 'CAT' || secretWord === 'CHASE' || secretWord === 'TOM' || secretWord === 'GREY') {
        $hint.html('this word relates to Tom');
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







