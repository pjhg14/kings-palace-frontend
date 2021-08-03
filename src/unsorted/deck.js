import Card from "./card"

const SUITS = ["Spade", "Club", "Heart","Diamond"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"]

export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    draw() {
        return this.cards.shift()
    }

    shuffle() {
        for (let x = this.numberOfCards - 1; x > 0; x--) {
            const newIndex = Math.floor(Math.random() * (x + 1))
            const placeholder = this.cards[newIndex]
            this.cards[newIndex] = this.cards[x]
            this.cards[x] = placeholder
        }
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}