import { useEffect, useState } from "react"
import {  useHistory, useParams, useRouteMatch } from "react-router-dom"
import { createConsumer } from "@rails/actioncable";
import Waiting from "./Waiting"
import Game from "./Game";

export default function Room() {
    // login check

    const { path, url } = useRouteMatch()
    const { code } = useParams()
    const history = useHistory()
    const cable = useRef()

    const [game, setGame] = useState(null)
    const [started, setStarted] = useState(false)
    const [canStart, setCanStart] = useState(false)

    let subscription

    useEffect(() => {
        // if got here without code
        if (!code) {
            // Create game
            fetch("http://localhost:3000/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({is_solo_game: false})
            })
                .then(resp => resp.json())
                .then(newGame => {
                    setGame(newGame)
                })
        } else {
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
            }
        }

        subscription = cable.current.subscriptions.create(paramsToSend, handlers)

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

        return () => {
            if (game.is_done) {
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

        if (event) {
            // unsub from early leaving
            if (confirm("Do you want to leave? You will be removed from the game")) {
                subscription.unsubscribe()
            }
        } else {
            // unsub fom game being done
            unsubscribe()
        }
    }

    console.log({game, code})

    function startGame(setErrorText) {
        fetch(`http://localhost:3000/games/${game.id}`, {
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
            { started ? 
                <Game game={game} /> 
                : 
                <Waiting game={game} canStart={canStart} start={startGame}/>
            }
        </div>
    )
}