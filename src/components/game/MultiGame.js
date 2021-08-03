import { useEffect } from "react"

export default function MultiGame({ game }) {
    // login check

    const {id, players, deck, discard, turn} = game

    useEffect(() => {
        
    },[])

    return(
        <div>
            <div id="top">
                <div id="player2">

                </div>
            </div>
            <div id="middle">
                <div id="player3"></div>
                <div id="play-area">
                    { game.deck }

                </div>
                <div id="player4"></div>
            </div>
            <div id="bottom">
                <div id="player1"></div>
            </div>
        </div>
    )
}