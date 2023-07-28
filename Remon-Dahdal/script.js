const cardsContant = document.getElementById("cards")
let cards = []
let firstCard, secondCard
let lockBoard = false
let score = 0 

let scordBord = document.getElementById("score")
scordBord.textContent = score
fetch("./data/cards.json")
   .then( (res) => res.json())
   .then( (data) => {
    console.log(cards)
    cards = [...data,...data]
    shuffleCards()
    generateCards()

    }
   )

function shuffleCards()
                {
                    let currentIndx = cards.length
                    let randomIndx
                    let temporaryVale
                
                while( currentIndx >0 ){
                randomIndx = Math.floor (Math.random()*currentIndx)
                currentIndx -=1
                temporaryVale = cards[currentIndx];
                cards[currentIndx] = cards[randomIndx]
                cards[randomIndx] = temporaryVale
      
                }
            }

function generateCards(){
for ( let card of cards ) {
    const cardElement = document.createElement("div")
    cardElement.classList.add("card")
    cardElement.setAttribute("data-name", card.name)
    cardElement.innerHTML=`
    <div class="front" />
     <img class="front-image" src=${card.image} />
    </div> 
    <div class="back"></div>
    `;
    cardsContant.appendChild(cardElement);
    cardElement.addEventListener("click",flipCard);
    cardElement.addEventListener("touchstart",flipCard);
}

}            

function flipCard() {
    if(lockBoard){
        return;
    
    }
    if(this === firstCard){
        return;
    }
    this.classList.add("flipped");
    if(!firstCard){
        firstCard=this;
        return;
    }
    secondCard = this;

    lockBoard = true;
    checkForMatch()
}
function checkForMatch(){
    if(firstCard.dataset.name===secondCard.dataset.name)
    {
        disableCards();
    }

    else unflipCards();
}
function disableCards(){
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard);
    firstCard.removeEventListener("touchstartt",flipCard);
    secondCard.removeEventListener("touchstart",flipCard);
    score+=1000;
    if(score === 9000){
            startConfetti()
            showVictoryScreen();

    }
    scordBord.textContent=score
    unlockBoard();
}

function unflipCards(){
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        unlockBoard();
    },800)
}

function unlockBoard(){
    firstCard=null;
    secondCard=null;
    lockBoard=false;
}


 function restart(){
    shuffleCards()
    unlockBoard()
    score = 0
    scordBord.textContent=score
    cardsContant.innerHTML=""
    generateCards()
    stopConfetti()
 }


 function showVictoryScreen() {
   const victoryScreen = document.getElementById("victory-screen");
   victoryScreen.style.visibility = 'visible';
 }

       
 