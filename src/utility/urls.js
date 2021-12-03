const rootURL = process.env.NODE_ENV !== "production" ? 
        "http://localhost:3000" : ""

export const userURL = `${rootURL}/users`

export const gameURL = `${rootURL}/games`

export const moveURL = `${rootURL}/moves`