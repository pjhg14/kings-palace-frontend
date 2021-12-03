export const initialGameState = {
        room_code: "",
        started: "",
        swap_phase: "",
        main_phase: "",
        finished: "",
        players: [
            {
                hand: [],
                table: []
            }
        ],
        deck: [],
        discard: []
}

export function gameReducer(state, action) {
    switch (key) {
        // set top of deck to discard

        case "setGame":
            return action.payload
        case "processMoves":
            turn.moves.forEach(move => {
                // process move
                if (state.swap_phase) {
                    // allow only swapCard command
                } else {
                    // allow all command except swapCard
                }
            });

            return {
                ...state,

            }
        default:
            break;
    }
}

function processTurn(game, move) {
    switch (move.action) {
        case "draw":
            break;
        case "place":
            break;
        case "swap":
            break;
        case "penalty":
            break;
        default:
            break;
    }
}