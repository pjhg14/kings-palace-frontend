import { createConsumer } from "@rails/actioncable";
import { useEffect, useReducer, useRef, useState } from "react";
import { gameReducer, initialGameState } from "../utility/reducers/gameReducer";
import { gameURL, socket } from "../utility/urls";

let counter = 0

export default function DebugGame() {
    const [game, gameDispatch] = useReducer(gameReducer, initialGameState)
    const [chat, setChat] = useState([])
    const [text, setText] = useState("")
    const cable = useRef(null)
    
    useEffect(() => {
        if (!cable.current) {
            cable.current = createConsumer(socket)
        }

        const subscription = cable.current.subscriptions.create({
            channel: "GameChannel",
            message: "I just Joined!"
        }, {
            connected: _ => console.log("connected"),
            disconnected: _ => {
                console.log("disconnected")
                cable.current = null
            },
            received: data => {
                console.log(data)
                addMessageToChat(data)
            }
        })

        return () => {
            subscription.unsubscribe()
            cable.current.disconnect()
        }
    },[])

    const messages = chat.map(message => {
        counter++
        return(
            <p key={counter}>{message}</p>
        )
    })

    function handleMessageSubmit(event) {
        event.preventDefault()

        // addMessageToChat(text)

        fetch(`${gameURL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text
            }),
        })
            .then(resp => resp.json())
            .then( _ => {
                console.log("Message sent")
            })
    }

    function addMessageToChat(message) {
        setChat([...chat, message])
    }

    // console.log(chat)

    /* Move order:
        Prep phase:
            select card in hand to swap with face-up table card (optional)
            

        Main phase:
            while deck has cards:
                player draws card(s) until hand has 3 cards
            
            if no card in player's hand can be played
                penalty (player takes discard pile)
            else if selectedCard.value >= discard's top card
                player plays choice
            else
                refuse choice, player has applicable card
    */

    return(
        <div>
            Game broadcast Test

            <form onSubmit={handleMessageSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)}/>
                <button type="submit">Send</button>
            </form>
            {messages}
        </div>
    )
}