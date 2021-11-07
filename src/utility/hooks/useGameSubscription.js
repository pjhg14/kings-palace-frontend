import { useReducer } from "react";

export function useGameSubsciption(game) {
    useReducer(subscriptionStateReducer, initialState)
}

const initialState = {
    cable: "",
    subscription: "",
    cancelSub: () => {}
}

function subscriptionStateReducer(params) {
    
}