/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundscore,activePlayer,dice,gameplaying;
init();




//read from webpage
//var x = document.querySelector("#score-0").textContent;


document.querySelector('.btn-roll').addEventListener('click',btn);//specific for click event with this specific button
//the btn function is called a callback function, when event is triggered, it will get called
//or you can simply write an anoymous function right at there.
//addEventListener('click',function(){do something here});
document.querySelector('.btn-hold').addEventListener('click',hold);

document.querySelector(".btn-new").addEventListener("click",init);




//EVENT HANDLER
function btn(){
    //1. need a random number when someone lcick the button
    if(gameplaying){
    var dice = Math.floor((Math.random() * 6)) + 1;

    //2.display result
    //bring it back to display
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    
    //3.update the round score only if its not 1
    if(dice !== 1){
        roundscore +=dice;
        document.querySelector('#current-' + activePlayer).textContent = roundscore;
    }
    else{
        nextplayer();
    } }
}

function hold(){
    if(gameplaying){
        scores[activePlayer] +=roundscore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= 10){
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice").style.display = 'none';
        document.querySelector('.player-' + activePlayer+'-panel').classList.add("winner");
        document.querySelector('.player-' + activePlayer+'-panel').classList.remove("active");
        gameplaying = false;
    }
    else{
        nextplayer();
    }
    }
    
}


function nextplayer(){
    document.querySelector('#current-' + activePlayer).textContent = 0;
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active');
        activePlayer === 0 ? activePlayer = 1:activePlayer = 0;
        roundscore = 0;
        //remove the active panel class and add it to player2
        
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
        //or u can use the toggle method in which if "active is there, we will remove it, if not there", we will add it
        //document.querySelector().classList.toggle('active');       
        document.querySelector(".dice").style.display = 'none';
}


function init(){
 gameplaying = true;

scores = [0,0];
roundscore = 0;
activePlayer = 0; //0 for user 1, 1 for user 2

//document.querySelector("#current-" + activePlayer).textContent = dice;//select id, and active player is changed
//this textcontent method only changes plain text
//every time u want to write HTML it has to be a string
//whereas this method can have a inner html file and makes it look better
/*document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + "</em>"*/
    document.querySelector(".dice").style.display="none"//css property and set inline css to none


document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}