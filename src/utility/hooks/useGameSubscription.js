import { useReducer } from "react";
import { initialState, subscriptionReducer } from "../reducers/subscriptionReducer";

export function useGameSubsciption(game) {
    const {state, dispatch} = useReducer(subscriptionReducer, initialState)


    
}

