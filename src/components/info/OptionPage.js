import { useState } from "react"
import { useHistory } from "react-router-dom"

export default function OptionPage() {
    // if user not logged in show error page and redirect to login page

    const history = useHistory()
    const [roomCode, setRoomCode] = useState("")
    const [error, setError] = useState("")

    function handleGameJoin() {
        fetch("http://localhost:3000/games/join", {
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

    return(
        <div>
            <button onClick={() => history.push()}>Play with Computer</button>
            <br/>
            <button onClick={() => history.push("")}>Create Room</button>
            <br/>
            <input type="text" placeholder="Room Code"/>
            <button disabled onClick={handleGameJoin}>Join Room</button>
            {error && <p>{error}</p>}
            <br/>
            <button onClick={() => history.push("/")}>How to play</button>
        </div>
    )
}