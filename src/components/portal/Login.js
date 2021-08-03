import { useState } from "react"

export default function Login({ login }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        login({
            email: email,
            password: password
        },
        "login")

        setEmail("")
        setPassword("")
    }

    return(
        <form onSubmit={onFormSubmit}>
            <input 
                type="text" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
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