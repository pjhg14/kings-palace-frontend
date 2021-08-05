import { useHistory } from "react-router-dom"


export default function Waiting({game, start, setWantToLeave}) {
    const [error, setError] = useState("")
    const history = useHistory()

    const joinedPlayers = game.players.map(player => {
        return(
            <li key={player.id}>{player.username}</li>
        )
    })

    function leaveGame() {
        setWantToLeave(true)
        history.push("/select")
    }

    return(
        <div id="waiting-room">
            <h2>Room Code: {game.room_code}</h2>
            <ul>
                {joinedPlayers}
            </ul>
            <button onclick={start(setError)}>start</button>
            <button onClick={leaveGame}>cancel</button> 
            {error && <p>{error}</p>}
        </div>
    )
}