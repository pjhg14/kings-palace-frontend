import { useEffect, useState } from "react"
import {  Prompt, useHistory, useParams, useRouteMatch } from "react-router-dom"
import { createConsumer } from "@rails/actioncable";
import Waiting from "./Waiting"
import Game from "./Game";

export default function Room() {
    // login check
    if (!localStorage.token) return <LoginError />

    const { code } = useParams()
    const cable = useRef()
    const subscription = useRef()

    const [game, setGame] = useState(null)
    const [started, setStarted] = useState(false)
    const [canStart, setCanStart] = useState(false)
    const [wantToLeave, setWantToLeave] = useState(false)
    const leaveMsg = 
            "Are you sure you want to leave the game?" +
            "Your cards will be added to the deck and you will removed from the game." + 
            " In progress games cannot be joined."

    useEffect(() => {
        if (code) {
            // find game w/ code
            fetch(`http://localhost:3000/games/${code}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(resp => resp.json())
                .then(queriedGame => {
                    setGame(queriedGame)
                })
        }

        // subscibe to game
        if (!cable.current) {
            cable.current = createConsumer("ws://localhost:3000/cable")
        }

        const paramsToSend = {
            channel: "GameChannel",
            id: game.id
        }

        const handlers = {
            recieved(state) {
                setGame(state)
            },
            connected() {
                console.log("connected")
            },
            disconnected() {
                console.log("disconnected")
                cable.current = null
                subscription.current = null
            }
        }

        if (subscription.current) {
            subscription.current = cable.current.subscriptions.create(paramsToSend, handlers)
        }

        // if host choose to begin game
        const hostPlayer = game.players.find(player => player.is_host)
        if (hostPlayer.username === localStorage.username) {
            setCanStart(true)
        }

        // if not host, wait for game to start
        // if game has been started set started to true
        if (!game?.can_join) {
            setStarted(true)
        }

        setWantToLeave(false)

        return () => {
            if (game.is_done) {
                const winningplayer = game.players.find(player => player.has_won)

                alert(`The game is over, ${winningplayer.user.username} wins!`)
                console.log("unsubbing...")
                unsubscribe()
            }

            if (wantToLeave) {
                console.log("unsubbing...")
                unsubscribe()
            }
        }

    },[code, game])

    useEffect(() => {
        window.addEventListener("beforeunload", unsubscribe)

        return () => {
            window.removeEventListener("beforeunload", unsubscribe)
        }
    },[])

    function unsubscribe(event) {
        event?.preventDefault()

        const userPlayer = players.find(player =>{
            return player.user.username === localStorage.username
        })

        if (!event) {
            if (confirm(leaveMsg)) {
                subscription.current.unsubscribe()
            }
        } else {
            subscription.current.unsubscribe()
        }

        cable.current = null
        subscription.current = null
    }

    console.log({game, code})

    function startGame(setErrorText) {
        fetch(`http://localhost:3000/games/${game.id}/start`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                if (json.error) {
                    setErrorText(json.error)
                } else {
                    console.log(json.message)
                }
            })
    }

    return(
        <div>
            <Prompt 
                when={!game.is_done}
                message={leaveMsg}
            />
            { started ? 
                <Game game={game} setWantToLeave={setWantToLeave} /> 
                : 
                <Waiting game={game} canStart={canStart} start={startGame} setWantToLeave={setWantToLeave} />
            }
        </div>
    )
}