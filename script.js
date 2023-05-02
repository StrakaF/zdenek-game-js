// zakladne premennne // 

var totalScore, roundScore, activePlayer, dice,playGame;

newStart();

function newStart () {
  noPlayers = document.querySelectorAll(".totalScore").length;
    totalScore = new Array(noPlayers);
    roundScore = 0;
    activePlayer = 0;
    playGame = true;
    
   document.querySelectorAll(".totalScore").forEach((elem, i) => {
     elem.classList.remove("active");
     elem.querySelectorAll("p")[0].textContent = `Skóre ${i + 1}. hráča`;
     elem.querySelectorAll("p")[1].textContent = 0;
   });

   document.querySelectorAll(`.totalScore`)[0].classList.add("active");
}

//Hodit kockou
document.querySelector(".rollDice").addEventListener("click", function() {
    
    if(playGame) {
        // 1.generujeme nahodne cislo 1-6
        var dice = Math.ceil(Math.random()*6);

        // 2.zobrazenie spravneho obrazku
        var diceElement = document.querySelector(".diceImage");
        diceElement.style.display = "block";
        console.log(diceElement.src = "img/" + dice + ".jpg");

        // 3. nascitanie cisla z kocky 

        if (dice !== 1){
           roundScore = roundScore +dice;
          document.querySelectorAll(".currentScore")[activePlayer].querySelectorAll("p")[1].textContent = roundScore; 
        }else {
          nextPlayer();

        }
    }
    
});


function nextPlayer () {
    if (activePlayer === noPlayers - 1){
        activePlayer = 0;
    }else {
        activePlayer = activePlayer + 1;
    }

    
    roundScore = 0;
    
    document.querySelectorAll(".currentScore p:nth-child(2)").forEach((elem) => elem.textContent = 0);
    
    document.querySelector(".diceImage").style.display = "none";
    
    document.querySelectorAll(".totalScore").forEach((elem) => {
      elem.classList.remove("active");
    })
    document.querySelectorAll(".totalScore")[activePlayer].classList.add("active")
}


//Podrzat skore
document.querySelector(".holdScore").addEventListener("click", function() {
    
    if(playGame) {
        // celkove skore sa vyplni sucastnym skore
        totalScore[activePlayer] = (totalScore[activePlayer] || 0) + roundScore;

        document.querySelectorAll(".totalScore")[activePlayer].querySelectorAll("p")[1].textContent = totalScore[activePlayer];

        if(totalScore[activePlayer] >= 30){
            document.querySelector("#name-" + activePlayer).textContent = "Víťaz!! Super!";
            document.querySelector(".diceImage").style.display = "none";
            playGame = false;
        }else{
            nextPlayer();
        }
    }
   
});

//Nová hra
document.querySelector(".newGame").addEventListener("click", newStart);

    
    
    
