//Fionna Williams Coding project week 6
class Player {
    constructor(name){
        this.name = name;
        this.hand = [];
        this.score = 0;
    }
}

class Card {
    constructor(rank, value, suit){
        this.rank = rank;
        this.value = value;
        this.suit = suit;
    }
}

class Deck {
    constructor(){
        this.deck = [];

        const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        //the following code will loop through the arrays above to create a full deck of cards
        //low to high values
        for(let i = 0; i < suits.length; i++) {
            for(let j = 0; j < ranks.length; j++) {
                this.deck.push(new Card(ranks[j], j + 2, suits[i]));
            }
        }
    }

    //Durstenfeld shuffle
    shuffle() {
        for(let i = this.deck.length -1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let currentIndex = this.deck[i];
            this.deck[i] = this.deck[randomIndex];
            this.deck[randomIndex] = currentIndex;
        }
        return this.deck;
    }
    //the following code will split the deck between both players
        deal(firstPlayer, secondPlayer) {
        firstPlayer.hand = [...this.deck.slice(0, 26)];
        secondPlayer.hand = [...this.deck.slice(26, 52)];
    }
}

class Game {
    constructor(){
        this.players=[];
    }
    //won't allow to have empty name user must input name
    createPlayer(player){
        let name = prompt(`Enter name of player ${player}.`, `Player ${player}`);

        while(name == '' || name === null) {
            name = prompt(`Player must have a name. Please enter name of ${player}`);
        }
        this.players.push(new Player(name));

        const playerDiv = document.querySelector('#' + player);
        playerDiv.textContent = name;
    }
    //Game will now start
    start() {
        document.querySelector('#startbutton').disabled = true;

        this.createPlayer('one');
        this.createPlayer('two');

        const gameDeck = new Deck;
        gameDeck.shuffle();
        gameDeck.deal(this.players[0], this.players[1]);

        this.playCards(this.players[0], this.players[1]);

    }
    //the following function will deal the deck to the players
    async playCards(playerOne, playerTwo) {
        const playerOneScoreUl = document.querySelector('.player-one-score');
        const playerTwoScoreUl = document.querySelector('.player-two-score');
        const compareScoresUl = document.querySelector('.score-list');
        let playerOneTotalScore = document.querySelector('#player-one-total-score');
        let playerTwoTotalScore = document.querySelector('#player-two-total-score');
        let winner = document.querySelector('#winner');

        //loops to the given score/total
        for(let i = 0; i < this.players[0].hand.length; i++) {
            let playerOneCard = playerOne.hand[i];
            let playerTwoCard = playerTwo.hand[i];

            this.printCardPlayerOne(playerOneScoreUl, playerOneCard);
            this.printCardPlayerTwo(playerTwoScoreUl, playerTwoCard);

            if (playerOneCard.value > playerTwoCard.value) {
                this.printScore( `${playerOne.name} wins!`, compareScoresUl);
                playerOne.score++;
            
            } else if (playerOneCard.value < playerTwoCard.value) {
                this.printScore(`${playerTwo.name} wins!`, compareScoresUl);
                playerTwo.score++;
                
            } else if (playerOneCard.value === playerTwoCard.value) {
                this.printScore(`Tie! No points awarded.`, compareScoresUl);
            }

            playerOneTotalScore.innerHTML = `Score: ${playerOne.score}`;
            playerTwoTotalScore.innerHTML = `Score: ${playerTwo.score}`;
            await this.timer(600);

        }

        // Will verify who is the final winner of the game
        if (playerOne.score > playerTwo.score) {
            winner.innerHTML = `${playerOne.name} Wins!!`;
        } else if (playerOne.score < playerTwo.score) {
            winner.innerHTML = `${playerTwo.name} Wins!!`;
        } else if (playerOne.score === playerTwo.score) {
            winner.innerHTML = `Tie! Nobody wins :-(`
        }

        //this will prompt if a restart of the game is wanted
        document.querySelector('#startbutton').setAttribute('oneclick', 'location.reload();');
        document.querySelector('#startbutton').disabled = false;
        document.querySelector('#startbutton').innerHTML = 'Do you want to start over?';
    }

    //Gives info of the first player
    printCardPlayerOne(playerOneScoreUl, card) {
        let playerOneScoreLi = document.createElement('li');
        playerOneScoreLi.appendChild(document.createTextNode(card.rank + ' of ' + card.suit));
        playerOneScoreUl.appendChild(playerOneScoreLi);
    }

    //gives info of the second player
    printCardPlayerTwo(playerTwoScoreUl, card) {
        let playerTwoScoreLi = document.createElement('li');
        playerTwoScoreLi.appendChild(document.createTextNode(card.rank + ' of ' + card.suit));
        playerTwoScoreUl.appendChild(playerTwoScoreLi);
    }

    //updates calculated score
    printScore(winner, compareScoresUl) {
        let compareScoresLi = document.createElement('li');
        compareScoresLi.appendChild(document.createTextNode(winner));
        compareScoresUl.appendChild(compareScoresLi);
    }

    //helps with the time flow
    timer = ms => new Promise(res => setTimeout(res, ms));
}

let war = new Game;

