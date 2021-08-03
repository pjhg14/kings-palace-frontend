import Card from "./Card"

export default function UserPlayer({ game, player }) {
    const { hand, table, user, } = player
    const cantPlayTable = hand.length > 0 
    const cantPlayTableBottom = table[1].length > 0

    const [selection, setSelection] = useState([])
    const [message, setMessage] = useState("")

    function playSelection() {
        
        const data = {
            placed_cards: [selection.cards], 
            from: selection.from
        }

        fetch("http://localhost:3000/moves", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                game_id: game.id,
                player_id: player.id,
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
                }
            })
    }

    const handCards = hand.map(card => {
        return(
            <Card key={card.code} from="hand" selection={selection} setSelection={setSelection} setMessage={setMessage}/>
        )
    })

    const tableShow = table[1].map(card => {
        return(
            <Card key={card.code} from="table_shown" selection={selection} setSelection={setSelection} setMessage={setMessage}/>
        )
    })

    const tableHide = table[0].map(card => {
        return(
            <Card key={card.code} from="table_hidden" selection={selection} setSelection={setSelection} setMessage={setMessage}/>
        )
    })

    return(
        <div id="user-player">
            <div id="user-player-table">
                {tableShow}
                {tableHide}
            </div>
            <div id="user-player-hand">
                {handCards}
            </div>
            <p>{user.username}</p>
            <div id="actions">
                <button onclick={() => playSelection()}>play</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}