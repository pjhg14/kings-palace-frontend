import './styles.css';
import Deck from './unsorted/deck';

export default function App() {
    const deck = new Deck()
    console.log(deck)
    deck.shuffle()

    return (
        <div className="App">
            Hi There
            {/* landing page */}
            {/* game lobby page (select single player {vs AI} or multiplayer game) */}

        </div>
    )
}
