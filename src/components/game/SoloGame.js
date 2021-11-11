import { useEffect, useReducer, useState } from "react"
import { Prompt, useHistory, useRouteMatch } from "react-router-dom"
import UserPlayer from "./players/UserPlayer"

export default function SoloGame() {
    const { id } = useRouteMatch()
    const [game, setGame] = useState(null)
    const history = useHistory()
    const leaveMsg = 
            "Are you sure you want to leave the game?" +
            "Your cards will be added to the deck and you will removed from the game." + 
            " In progress games cannot be joined."

    useEffect(() => {
        fetch(`http://localhost:3000//games/${id}/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedGame => {
                setGame(queriedGame)
            })
    },[id])

    const { deck, discard, turn } = game
    const [userPlayer, aiPlayer] = game?.players

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
                    
                    // wait for 5 seconds, then let ai play
                    let timer = setTimeout(() => {
                        fetch(`http://localhost:3000/games/${game.room_code}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.token}`
                            }
                        })
                            .then(resp => resp.json())
                            .then(json => {
                                setGame(game)
                                clearTimeout(timer)
                            })
                    }, 5000);
                    
                }
            })
    }

    function selectionReducer(state, action) {
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
        if (window.confirm("Are you sure you want to leave the game? The game will be canceled.")) {
            fetch(`http://localhost:3000/games/${game.id}/leave`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    // wait for response to transition
                    history.push("/select")
                })
        }
    }
    // END User Play Logic/Actions ==============================================================>

    return(
        
        <div id='game-board'>
            <Prompt 
                when={!game.is_done}
                message={leaveMsg}
            />
            <div>X</div>
            <div>player2</div>
            <div>Turn #{turn}</div>
            <div>X</div>
            <div className="cards">
                {deck}
                {discard}
            </div>
            <div>X</div>
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