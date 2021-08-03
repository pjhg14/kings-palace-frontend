class Player {
    constructor(isComputer) {
        this.id = ""    // Make temp id generator
        this.ai = isComputer
        this.hand = []
        this.table = [[],[]]    // table[0] is showing table cards, table[1] is hidden table cards
    }

    get hasWon() {
        return this.hand.length && this.table[0].length && this.table[1].length
    }
}