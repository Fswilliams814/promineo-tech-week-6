//Fionna Williams Coding project week 6
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }
}

class Card {
    constructor(rank, value, suit) {
        this.rank = rank;
        this.value = value;
        this.suit = suit;
    }
}
class Deck {
    constructor() {
        this.deck = [];
        const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
        'Jack', 'Queen', 'King', 'Ace'];
        
        //Create each card in the deck by looping over the suits and ranks. 
        //Values assigned from rank index low to high
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.deck.push(new Card(ranks[j], j + 2, suits[i]));
            }
        }
    }
    // Shuffle in place method using the Durstenfeld shuffle randomly swapping card indexes
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let currentIndex = this.deck[i];
            this.deck[i] = this.deck[randomIndex];
            this.deck[randomIndex] = currentIndex;
        }
        return this.deck;
    }

    //Split deck to both players
    deal(firstPlayer, secondPlayer) {
        firstPlayer.hand = [...this.deck.slice(0,26)];
        secondPlayer.hand = [...this.deck.slice(26, 52)];
    }
}
//was missing the below code to restart the deck
const testDeck = new Deck;
console.dir(testDeck);
class Game {
    constructor() {
        this.players=[];
    }

    // Captures the names of players. Will not accept null or empty string.
    createPlayer(player) {
        let name = prompt(`Enter name of player ${player}.`, `Player ${player}`);

        while (name == '' || name === null) {
            name = prompt(`Player must have a name. Please enter name of player ${player}.`);
        }
        this.players.push(new Player(name));

        const playerDiv = document.querySelector('#' + player);
        playerDiv.textContent = name;
    }

    // Runs the game
    start() {
        document.querySelector('#startbutton').disabled = true;

        this.createPlayer('one');
        this.createPlayer('two');

        const gameDeck = new Deck;
        gameDeck.shuffle();
        gameDeck.deal(this.players[0], this.players[1]);

        console.dir(gameDeck);
        console.dir(this.players[0].hand);
        console.dir(this.players[1].hand);

        this.playCards(this.players[0], this.players[1]);
    }

    // Deals the cards to the players
    async playCards(playerOne, playerTwo) {
        // Getters
        const playerOneScoreUl = document.querySelector('.player-one-score');
        const playerTwoScoreUl = document.querySelector('.player-two-score');
        const compareScoresUl = document.querySelector('.score-list');
        let playerOneTotalScore = document.querySelector('#player-one-total-score');
        let playerTwoTotalScore = document.querySelector('#player-two-total-score');
        let winner = document.querySelector('#winner');

        // Loop over each hand to determine score
        for(let i = 0; i < this.players[0].hand.length; i++) {
            let playerOneCard = playerOne.hand[i];
            let playerTwoCard = playerTwo.hand[i];

            this.printCardPlayerOne(playerOneScoreUl, playerOneCard);
            this.printCardPlayerTwo(playerTwoScoreUl, playerTwoCard);

            if (playerOneCard.value > playerTwoCard.value) {
                this.printScore(`${playerOne.name} wins!`, compareScoresUl);
                playerOne.score++;
            } else if (playerOneCard.value < playerTwoCard.value) {
                this.printScore(`${playerTwo.name} wins!`, compareScoresUl);
                playerTwo.score++;
                console.log(playerTwo.score);
            } else if (playerOneCard.value === playerTwoCard.value) {
                this.printScore(`Its a draw! No points awarded.`, compareScoresUl);
            }

            playerOneTotalScore.innerHTML = `Score: ${playerOne.score}`;
            playerTwoTotalScore.innerHTML = `Score: ${playerTwo.score}`;
            await this.timer(600);
        }

        if (playerOne.score > playerTwo.score) {
            winner.innerHTML = `${playerOne.name} Wins!!!`;
        } else if (playerOne.score < playerTwo.score) {
            winner.innerHTML = `${playerTwo.name} Wins!!!`;
        } else if (playerOne.score === playerTwo.score) {
            winner.innerHTML = `Its a Draw!!! Nobody wins in war.`;
        }

        document.querySelector('#startbutton').setAttribute('onclick', 'location.reload();');
        document.querySelector('#startbutton').disabled = false;
        document.querySelector('#startbutton').innerHTML = 'Play Again?';
    }

    // Updates Players One's DOM
    printCardPlayerOne(playerOneScoreUl, card) {
        let playerOneScoreLi = document.createElement('li');
        playerOneScoreLi.appendChild(document.createTextNode(card.rank + ' of ' + card.suit));
        playerOneScoreUl.appendChild(playerOneScoreLi);
    }

    // Updates Players Two's DOM
    printCardPlayerTwo(playerTwoScoreUl, card) {
        let playerTwoScoreLi = document.createElement('li');
        playerTwoScoreLi.appendChild(document.createTextNode(card.rank + ' of ' + card.suit));
        playerTwoScoreUl.appendChild(playerTwoScoreLi);
    }

    // Updates Score Column DOM
    printScore(winner, compareScoresUl) {
        let compareScoresLi = document.createElement('li');
        compareScoresLi.appendChild(document.createTextNode(winner));
        compareScoresUl.appendChild(compareScoresLi);
    }

    // Helper async function to control flow
    timer = ms => new Promise(res => setTimeout(res, ms));
}

let war = new Game;

