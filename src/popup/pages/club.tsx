import React, { useEffect, useState } from "react"
import { randomInRange, sleep } from "../../utils"

const Animation: React.FC<{}> = () => {
    const width = 50;
    const height = 10;
    const [state, setState] = useState<string[]>(new Array(height).fill(" ".repeat(width)))
    const newRow = () => new Array(width).fill("").map(_x => randomInRange(0, 5)).map(x => {
        if (x == 0) return "$"
        return "    "
    }).join("")
    useEffect(() => {
        (async () => {
            // for (let i = 0; i < 1000; i++) {
            await sleep(200)
            let newState = state;
            console.log("1. ", newState.join("\n"))
            newState = newState.slice(0, newState.length - 1)
            console.log("2. ", newState.join("\n"))
            newState = [newRow(), ...newState,]
            console.log("3. ", newState.join("\n"))
            setState(newState)
            // }
        })()
    }, [state])
    return <>
        <pre>
            {state.map((row, i) => <p key={i}>{row}</p>)}
        </pre>
    </>
}

const Club: React.FC<{}> = () => {
    return <>
        <h1>Welcome to the Billionaire's Club</h1>
        <div>You have become so rich you can look at the money fly</div>
        <div>Join the secret Billionaire <a target="_blank" href="https://discord.gg/aapA7sB"> discord server </a></div>
        <Animation />
    </>
}
export default Club