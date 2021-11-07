import { useState, useEffect } from "react";
import { userURL } from "../links";

export function useUserToken() {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        if (localStorage.token !== null) {
            fetch(`${userURL}/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(resp => resp.json())
                .then(queriedUser => {
                    setUser(queriedUser)
                })
        }
    },[user])

    return user
}