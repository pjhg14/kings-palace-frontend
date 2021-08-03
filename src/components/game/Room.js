import { useEffect, useState } from "react"
import { Route, Switch, useHistory, useParams, useRouteMatch } from "react-router-dom"
import { createConsumer } from "@rails/actioncable";
import MultiGame from "./MultiGame"
import Waiting from "./Waiting"

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
        if (!game?.can_join) {
            history.push(`${url}/game/${game.id}`)
        }

        // if page is unmounted, disconnect from game
        return () => {
            // Cleanup
            console.log("unsubbing...")
            subscription.unsubscribe()
        }
    },[code, game])

    console.log({game, code})

    return(
        <div>
            { started ? 
                <MultiGame game={game} /> 
                : 
                <Waiting game={game} />
            }
        </div>
    )
}