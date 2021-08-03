import { useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Login from "./Login";
import SignUp from "./SignUp";

export default function Portal() {
    const { type } = useParams()
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function submitCrdentials(credentials, type) {
        setErrors([])
        
        fetch(`http://localhost:3000/users/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then(resp => resp.json())
            .then(message => {
                if (message.error) {
                    // show error in message
                    setErrors(message.details)  
                } else {
                    localStorage.token = message.token
                    localStorage.username = message.username
                    // console.log(message)
                    history.push("/")
                }
            })
    }

    function addError(error) {
        const uniqueErrors = [...errors, error].filter((value, index, self) => {
            return self.indexOf(value) === index;
        })
        setErrors(uniqueErrors)
    }

    const errorList = errors.map(error => {
        return(
            <li key={error}>
                {error}
            </li>
        )
    })

    return(
        <div>
            <h3>
                {type === "login" ? 
                    "Login" 
                    : 
                    "Sign Up"
                }
            </h3>
            {type === "login" ? 
                <Login login={submitCrdentials}/>
                : 
                <SignUp signup={submitCrdentials} addError={addError}/>
            }
            <Link className="link" to="/">Back</Link>
            {errors.length > 0 && 
                <div className="error-box" >
                    <h3>Error</h3>
                    <ul>
                        {errorList}
                    </ul>
                </div>
            }
        </div>
    )
}