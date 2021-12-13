import { actionEnum as actions } from "../playerActions";

/* Sample game
    {
        room_code: "",
        started: "",
        swap_phase: true,
        main_phase: true,
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
*/

export const initialGameState = {
        room_code: null,
        started: null,
        swap_phase: null,
        main_phase: null,
        finished: null,
        players: [],
        deck: [],
        discard: []
}

export function gameReducer(state, action) {
    switch (action.type) {
        case "loadGame":
            return action.payload
        case "processMoves":
            
            const newGameState = processTurn(state, turn)

            return newGameState
        default:
            break;
    }
}

function processTurn(game, turn) {
    // Get player making the move here
    const player = game.players.find(player => player.id === turn[0].player.id)
    const newGameState = {...game}

    switch (move.action) {
        case actions.DRAW:
            // Add card from top of deck to player hand
            break;
        case actions.PLACE:
            // Add selected card from player hand to 
            break;
        case actions.SWAP:
            // Swap selected card with card in chosen face-up table area
            break;
        case actions.PENALTY:
            // Player takes ALL of the cards in the discard pile
            break;
        default:
            // Some sort of error state here
            break;
    }

    return newGameState
}