import { Route, Switch } from 'react-router-dom';
import Room from './components/game/Room';
import SingleGame from './components/game/SingleGame';
import LandingPage from './components/info/LandingPage';
import OptionPage from './components/info/OptionPage';
import TutorialPage from './components/info/TutorialPage';
import Portal from './components/portal/Portal';
import './styles.css';

export default function App() {
    return (
        <div className="App">
            <div id="header">
                <h1 className="debug">King's Palace</h1>
            </div>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="/portal/:type">
                    <Portal />
                </Route>
                <Route path="/select">
                    <OptionPage />
                </Route>
                <Route exact path="/room">
                    {/* Create room */}
                    <Room />
                </Route>
                <Route path="/room/:code">
                    {/* Join Room */}
                    <Room />
                </Route>
                <Route path="/game/:id">
                    <SingleGame />
                </Route>
                <Route path="/tutorial">
                    <TutorialPage />
                </Route>
            </Switch>
            <div id="footer">
                <a href="https://github.com/pjhg14" rel="norefferer">Githib</a>
                <a href="https://www.linkedin.com/in/pgrahamjr" rel="norefferer">LinkedIn</a>
            </div>
        </div>
    )
}
