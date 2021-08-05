import { Route, Switch } from 'react-router-dom';
import Room from './components/game/Room';
import SoloGame from './components/game/SoloGame';
import LandingPage from './components/info/LandingPage';
import OptionPage from './components/info/OptionPage';
import TutorialPage from './components/info/TutorialPage';
import Portal from './components/portal/Portal';
import './styles.css';

export default function App() {
    return (
        <div id="App">
            <header id="header">
                <h1 className="debug">King's Palace</h1>
            </header>
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
                <Route path="/room/:code">
                    <Room />
                </Route>
                <Route path="/game/:id">
                    <SoloGame />
                </Route>
                <Route path="/tutorial">
                    <TutorialPage />
                </Route>
            </Switch>
            
        </div>
    )
}
