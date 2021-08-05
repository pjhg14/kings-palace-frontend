import PlayerCard from "../cards/PlayerCard"

export default function UserPlayer({ player, selectionDispatch }) {
    const { hand, table, user } = player
    const cantPlayTable = hand.length > 0 
    const cantPlayTableBottom = table[1].length > 0

    const handCards = hand.map(card => {
        return(
            <PlayerCard 
                key={card.code} 
                from="hand" 
                selectionDispatch={selectionDispatch} 
            />)
    })

    const tableShow = table[1].map(card => {
        return(
            <PlayerCard 
                key={card.code} 
                from="table_shown" 
                selectionDispatch={selectionDispatch}
                playDisabled={cantPlayTable}
            />
        )
    })

    const tableHide = table[0].map(card => {
        return(
            <PlayerCard 
                key={card.code} 
                from="table_hidden" 
                selectionDispatch={selectionDispatch} 
                playDisabled={cantPlayTableBottom}
            />
        )
    })

    return(
        <div className="vertical-player">
            <div className="v-player-table">
                <div>
                    {tableHide}
                </div>
                <div className="table-show">
                    {tableShow}
                </div>
            </div>
            <div className="v-player-hand">
                {handCards}
            </div>
            <p>{user.username}'s cards</p>
            
        </div>
    )
}