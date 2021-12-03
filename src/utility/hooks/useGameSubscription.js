import { useReducer } from "react";
import { initialState, subscriptionReducer } from "../reducers/subscriptionReducer";

export function useGameSubsciption(game) {
    const [subState, subDispatch] = useReducer(subscriptionReducer, initialState)


    
}

