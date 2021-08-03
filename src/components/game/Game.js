import UserPlayer from "./players/UserPlayer"

export default function Game({ game }) {
    // login check
    if (!localStorage.token) return <h1>Please log in</h1>

    const {id, players, deck, discard, turn} = game

    useEffect(() => {
        
    },[])

    const userPlayer = players.find(player => {
        return player.username === localStorage.username
    })

    const otherPlayers = players.filter(player => {
        return player.username !== localStorage.username
    })

    return(
        <div>
            <div id="top debug">
                <div id="top-player">

                </div>
            </div>
            <div id="middle debug">
                <div id="left-player"></div>
                <div id="play-area">
                    { deck }
                    { discard }
                </div>
                <div id="right-player"></div>
            </div>
            <div id="bottom debug">
                <UserPlayer game={game} player={userPlayer}/>
            </div>
        </div>
    )
}