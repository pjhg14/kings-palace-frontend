import { useHistory } from "react-router-dom"

export default function LandingPage() {
    const history = useHistory()
    // Landingpage shows the information of the app also links to login
    return(
        <>
            <main className="middle-content">
                <button onClick={() => {history.push("/portal/login")}}>Login</button>
                <button onClick={() => {history.push("/portal/signup")}}>SignUp</button>
                <button onClick={() => {history.push("/portal/tutorial")}}>How to Play</button>

                <h2>Note:</h2>
                <p>To play this game, you need to login, this is so the server knows who is who when playing</p>
                <h2>About:</h2>
                <p>
                    King's Palace is a web application that allows you to play palace online either by yourself with a computer or
                    with friends
                </p>
                <h2>Made with:</h2>
                <p><strong>Frontend:</strong> </p>
                <h2>Made By:</h2>
                <div>
                    <p><strong>ME!</strong> Paul Graham Jr.</p>
                    <img src="" alt=""/>
                </div>
            </main>
            <footer id="footer">
                <a href="https://github.com/pjhg14" rel="norefferer">Githib</a>
                <a href="https://www.linkedin.com/in/pgrahamjr" rel="norefferer">LinkedIn</a>
            </footer>
        </>
    )
}