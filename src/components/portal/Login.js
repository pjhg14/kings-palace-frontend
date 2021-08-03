import { useState } from "react"

export default function Login({ login }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        login({
            username: username,
            password: password
        },
        "login")

        setUsername("")
        setPassword("")
    }

    return(
        <form onSubmit={onFormSubmit}>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
            />

            <input
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />

            <button type="submit">Submit</button>
        </form>
    )
}