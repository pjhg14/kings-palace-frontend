import { useHistory } from "react-router-dom"

export default function LoginError() {
    const history = useHistory()

    return(
        <div>
            <h1>Please log in</h1>
            <button onClick={() => history.push("/portal/login")}>Login</button>
        </div>
    )
}