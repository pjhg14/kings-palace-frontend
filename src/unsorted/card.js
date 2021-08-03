export default class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
        this.code = suit[0] + value
        this.image = `https://deckofcardsapi.com/static/img/${value}${suit[0]}.png`
    }

    get fullValue() {
        switch (this.value) {
            case "A":
                return "Ace"
            case "0":
                return "10"
            case "J":
                return "Jack"
            case "Q":
                return "Queen"
            case "K":
                return "King"
            default:
                return this.value
        }
    }
}