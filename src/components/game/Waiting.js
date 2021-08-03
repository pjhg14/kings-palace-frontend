

export default function Waiting({game, start}) {
    const [error, setError] = useState("")

    const joinedPlayers = game.players.map(player => {
        return(
            <li key={player.id}>{player.username}</li>
        )
    })

    return(
        <div id="waiting-room">
            <ul>
                {joinedPlayers}
            </ul>
            <button onclick={start(setError)}>start</button>
            {error && <p>{error}</p>}
        </div>
    )
}