import { useState } from "react"

export default function Card({ card, from, selection, setSelection, setMessage }) {
    const [selected, setSelected] = useState(false)

    function toggleSelection(card) {
        if (selected) {
            // remove card from selection
            setSelection(selection.filter(select => {
                return select.card.code !== card.code
            }))
        } else {
            // add card to selection
            setSelection([...selection, {card, from}])
        }

        setSelected(!selected)
        setMessage("")
    }

    return(
        <img 
            className={`${from}-card ${selected ? "selected" : ""}`} 
            key={card.code} 
            src={`https://deckofcardsapi.com/static/img/${card.value}${card.suit[0]}.png`}
            alt={`${card.full_value} of ${card.suit}`} 
            onClick={() => toggleSelection(card)}
        />
    )
}