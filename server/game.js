const { getDeck, getHand } = require('./rules');

// Mutable state
class Dealer {
    // Private val
    #deck;

    constructor() {
        this.#deck = getDeck();
        this.cards = [];
        this.round = 0;
        this.roundEnded = false;
    }

    draw(n) {
        return [...Array(n)].map(() => this.#deck.pop());
    }

    deal() {
        if (this.round === 0) this.cards.push(...this.draw(3));
        else if (this.round < 3) this.cards.push(...this.draw(1));
        else this.roundEnded = true;

        if (!this.roundEnded) this.round++;
    }
}

class Game {
    constructor(roomId) {
        this.gameState = {
            roomId: roomId,
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
