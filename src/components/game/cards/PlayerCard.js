import { useState } from "react"

export default function PlayerCard({ card, from, selectionDispatch, playDisabled = false }) {
    const [isSelected, setIsSelected] = useState(false)

    function toggleSelection(card) {
        if (!playDisabled) {
            if (isSelected ) {
                // remove card from selection
                selectionDispatch({type: "add", selection: {card, from }})
            } else {
                // add card to selection
                selectionDispatch({type: "remove", selection: {card, from}})
            }

            setIsSelected(!isSelected)
        }
    }

    return(
        <img 
            className={`card ${isSelected ? "selected" : ""} ${playDisabled ? "disabled" : ""}`} 
            key={card.code} 
            src={`https://deckofcardsapi.com/static/img/${card.value}${card.suit[0]}.png`}
            alt={`${card.full_value} of ${card.suit}`} 
            onClick={() => toggleSelection(card)}
        />
    )
}