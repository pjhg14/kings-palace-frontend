import { useState } from "react"

export default function SignUp({ signup, addError }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")
    
    const [email, setEmail] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        if (password !== passwordConf) {
            addError("Password fields must match")
            setUsername("")
            setPassword("")
            setPasswordConf("")
            setEmail("")
            
            return
        }

        signup({
            username: username,
            password: password,
            email: email
        },
        "")

        setUsername("")
        setPassword("")
        setPasswordConf("")
        setEmail("")
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

            <input
                type="text" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
            />

            <button type="submit">Submit</button>
        </form>
    )
}