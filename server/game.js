const { getDeck, getResult } = require('./rules');

class Dealer {
    // Private val
    #deck;

    constructor() {
        this.#deck = getDeck();
        this.cards = [];
        this.result = null;
        this.roundEnded = false;
    }

    draw(n) {
        return [...Array(n)].map(() => this.#deck.pop());
    }

    deal() {
        if (this.cards.length === 0) {
            this.cards.push(...this.draw(3));
        } else if (this.cards.length < 5) {
            this.cards.push(...this.draw(1));

            if (this.cards.length === 5) {
                this.result = getResult(this.cards);
                this.roundEnded = true;
            }
        }
    }
}

class Game {
    constructor(roomId) {
        this.roomId = roomId;
        this.gameState = {
            dealer: new Dealer(),
        };
    }

    newRound() {
        this.gameState.dealer = new Dealer();
    }

    update() {
        if (this.gameState.dealer.roundEnded) this.newRound();
        else this.gameState.dealer.deal();
    }
}

module.exports = { Game };
