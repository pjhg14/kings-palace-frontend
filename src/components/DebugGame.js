import { useEffect } from "react";

export default function DebugGame() {
    /* Move order:
        Prep phase:
            select card in hand to swap with face-up table card (optional)
            

        Main phase:
            while deck has cards:
                player draws card(s) until hand has 3 cards
            
            if no card in player's hand can be played
                penalty (player takes discard pile)
            else if selectedCard.value >= discard's top card
                player plays choice
            else
                refuse choice, player has applicable card
    */

    useEffect(() => {
        // get game and make subscription
    },[])

    return(
        <div>
            Game
        </div>
    )
}