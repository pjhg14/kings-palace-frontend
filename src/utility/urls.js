const dev ={
    API_ROOT: "http://localhost:3000",
    API_WS_ROOT: "ws://localhost:3000/cable"
}

const prod ={
    API_ROOT: "https://<HEROKU_NAME_HERE>",
    API_WS_ROOT: "wss://<HEROKU_NAME_HERE>/cable"
}

const rootURL = process.env.NODE_ENV === "production" ?  prod.API_ROOT : dev.API_ROOT

export const socket = process.env.NODE_ENV === "production" ? prod.API_WS_ROOT : dev.API_WS_ROOT

export const userURL = `${rootURL}/users`

export const gameURL = `${rootURL}/games`

export const moveURL = `${rootURL}/moves`
