import { useState } from "react"
import { useHistory } from "react-router-dom"

export default function OptionPage() {
    // login check
    if (!localStorage.token) return <LoginError />

    const history = useHistory()
    const [roomCode, setRoomCode] = useState("")
    const [error, setError] = useState("")

    function handleGameJoin() {
        fetch(`http://localhost:3000/games/join/${roomCode}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedGame => {
                if (queriedGame.error) {
                    setError(queriedGame.error)
                } else {
                    history.push(`/room/${queriedGame.room_code}`)
                }
            })
    }

    function handleCreateGame() {
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
                history.push(`/room/${newGame.room_code}`)
            })
    }

    function handleSoloGame() {
        fetch("http://localhost:3000/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({is_solo_game: true})
        })
            .then(resp => resp.json())
            .then(newGame => {
                history.push(`/game/${newGame.id}`)
            })
    }

    return(
        <div>
            <button onClick={handleSoloGame}>Play with Computer</button>
            <br/>
            <button onClick={handleCreateGame}>Create Room</button>
            <br/>
            <input type="text" placeholder="Room Code"/>
            <button onClick={handleGameJoin}>Join Room</button>
            {error && <p>{error}</p>}
            <br/>
            <button onClick={() => history.push("/tutorial")}>How to play</button>
        </div>
    )
}