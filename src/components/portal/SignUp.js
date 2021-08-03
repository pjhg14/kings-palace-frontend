import { useState } from "react"

export default function SignUp({ signup, addError }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        if (password !== passwordConf) {
            addError("Password fields must match")
            setUsername("")
            setPassword("")
            setPasswordConf("")
            
            return
        }

        signup({
            username: username,
            password: password,
        },
        "")

        setUsername("")
        setPassword("")
        setPasswordConf("")
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

            <input
                type="password" 
                placeholder="Verify Password" 
                value={passwordConf} 
                onChange={e => setPasswordConf(e.target.value)}
            />

            <button type="submit">Submit</button>
        </form>
    )
}