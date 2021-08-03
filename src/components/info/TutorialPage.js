export default function TutorialPage() {
    // if localstorage.token exists push to:
    // history.push(localStorage.token ? "/select" : "/portal/login")
    return(
        <div>
            <h2></h2>
            <p></p>
        </div>
    )
}

/* Game: Palace
Rules:
    THE PACK
        Two players use one standard deck of 52 cards, 3-5 players use two decks

    RANK OF CARDS
        A-K-Q-J-10-9-8-7-6-5-4-3 The 2 is a special card that resets the deck. (10 can be as well)

    OBJECT OF THE GAME
        Play your cards in a discard pile using ascending order, and the first player to run out of cards wins.

    THE DEAL
        Deal three cards face down to each player. 
        Players are not allowed to look at these cards and must place them face down in three rows in front of each player.

        Deal six cards to each player face down. Players may look at these cards in their hand.

        Players select three cards from their hand and place them face up on the three face down cards in front of them. 
        Typically, higher value cards are placed face up.

        Place the remaining cards face down in the center of the table to form the Draw pile.

    THE PLAY
        The first player turns over the top card of the Draw pile to form the Discard pile.

        This turned over card is called the Start card.

        The first player plays a card that is equal to or of higher value than the Start card by placing that card on top of the 
        Start card. You can play multiple cards in your turn, as long as they're all equal to or higher and of the same rank.

        Once you have finished your turn, draw cards from the Draw pile to maintain three cards in your hand at all times.

        You must play a card if you can. If you can't play, you have to pick up the discard pile and add it to your hand.

        On their turn a player can play any 2 card which resets the discard pile to 2, starting the sequence all over.

        On their turn a player can play the 10 on any card, but it takes the discard pile out of the game instead of resetting it. 
        The player who put the 10 down then draws up to three cards and plays any card.

        If four of the same numbers are played in a row, either by one player or multiple players, it clears the discard pile. 
        Place it to the side, as these cards are out of the game.

        The next player can play any card from their hand.

        Play continues around the table until the Draw pile is depleted.

        Once the Draw pile is depleted players rely solely on the cards in their hand. 
        Keep playing until there are no cards left in your hand. 
        If you can't play on your turn, you still have to pick up the discard pile and put it in your hand.

        Once you pick up the discard pile, you must play all of those cards before playing from your cards on the table.

        When it's your turn and you don't have a hand, play one card from your face-up cards in front of you.

        When it's your turn and you've played all your face-up cards, pick a card that's face-down on the table. 
        Don't look at it to choose. Simply flip it over. If it plays on the current card by being equal or higher, you can play it. If not, you must pick up the discard pile.

        If you pick up the discard pile, you must play those before continuing to play your face-down cards.

    HOW TO KEEP SCORE
        Play all your face-up and face-down cards to win the game. The first person to do so wins and the game ends.
*/