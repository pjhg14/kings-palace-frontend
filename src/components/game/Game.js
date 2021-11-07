import { useReducer, useState} from "react"
import { useHistory } from "react-router-dom"
import UserPlayer from "./players/UserPlayer"

export default function Game({ game, setWantToLeave }) {
    const { players, deck, discard, turn } = game
    
    const history = useHistory()

    const userPlayer = players.find(player => {
        return player.username === localStorage.username
    })

    const [other1, other2, other3] = players.filter(player => {
        return player.username !== localStorage.username
    })

    // User Play Logic/Actions ==================================================================>
    const [message, setMessage] = useState("")
    const [selection, selectionDispatch] = useReducer(selectionReducer,[])
    const [playError, setPlayError] = useState("")
    const [canPlay, setCanPlay] = useState(false)

    function playSelection() {
        const data = {
            placed_cards: selection.map(select => select.card), 
            from: selection[0].from
        }

        fetch("http://localhost:3000/moves", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                game_id: game.id,
                player_id: game.player.id,
                data
            })
        })
            .then(resp => resp.json())
            .then(json => {
                if (json.error) {
                    // show error
                    setMessage(json.error)
                } else {
                    // log message
                    console.log(json.message)
                    setMessage(json.message)
                }
            })
    }

    function selectionReducer(state, action) {
        // Check if new selection can be played
        // Failure gates

        if (state.length <= 0) {
            // if there is no selection
            setPlayError("Please select a card")
            
        } else if (!state.every((selection => selection.card.value === this), state[0].card.value)) {
            // if every card does not have the same value
            setPlayError("Cannot select multiple cards of different value")
            
        } else if (state[0].card.value < discard[discard.length - 1].value) {
            // if value of card > deck[deck.length - 1]
            setPlayError("Selected card must either be of greater or equal value to placed card or a 2")
            
        } else if (!state.every((selection => selection.card.from === this), state[0].card.from)) {
            // if every selection is "from" the same part
            setPlayError("Cannont place cards from hand and table")
            
        }

        setCanPlay(
            (state.length > 0) 
            && 
            (state.every((selection => selection.card.value === this), state[0].card.value))
            && 
            (state[0].card.value > deck[deck.length - 1])
            &&
            (state.every((selection => selection.card.from === this), state[0].card.from))
        )
        
        switch (action.type) {
            case "add":
                return [...state, action.card]
            case "remove":
                const newState = state.filter(selection => selection.card.code !== action.card.code)
                setCanPlay(newState.length > 0)

                return newState
            case "clear":
                setCanPlay(false)

                return []
            default:
                return state;
        }
    }

    function leaveGame() {
        setWantToLeave(true)
        history.push("/select")
    }
    // END User Play Logic/Actions ==============================================================>

    return(
        /* 
            Grid should look like this:
               X    |   player 2    |  Turn count
                    |      (AI)     |
            ----------------------------------
                    |  Deck    |    |    
            player 3|   |     Disc  | player 4
            ----------------------------------
                    |               |  play card
             leave  |  user player  |  messages
        */
        <div id='game-board'>
            <div className="block">X</div>
            <div>player2</div>
            <div className="block">Turn #{turn}</div>
            <div>player3</div>
            <div className="cards">
                {deck}
                {discard}
            </div>
            <div>player4</div>
            <button onClick={leaveGame}>Leave Game</button>
            <UserPlayer 
                player={userPlayer} 
                selectionDispatch={selectionDispatch} 
            />
            <div id="actions">
                <button 
                    onclick={playSelection} 
                    disabled={canPlay} 
                    data-tooltip={playError}
                >
                    play card
                </button>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}