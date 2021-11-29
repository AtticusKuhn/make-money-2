import React, { useEffect, useState } from "react"
import { randomInRange, sleep } from "../../utils"

const Animation: React.FC<{}> = () => {
    const width = 25;
    const height = 20;
    const [state, setState] = useState<string[]>(new Array(height).fill(" ".repeat(width)))
    const newRow = () => new Array(width).fill("").map(_x => randomInRange(0, 5)).map(x => x == 0 ? "$" : "    ").join("")
    useEffect(() => {
        (async () => {
            await sleep(200)
            let newState = state;
            newState = newState.slice(0, newState.length - 1)
            newState = [newRow(), ...newState,]
            setState(newState)
        })()
    }, [state])
    return <>
        <pre className="btn-center">
            {state.map((row, i) => <p key={i}>{row}</p>)}
        </pre>
    </>
}

const Club: React.FC<{}> = () => {
    return <>
        <h1 className="centered">Welcome to the Billionaire's Club</h1>
        <div>You have become so rich you can look at the money fly</div>
        <div>Join the secret Billionaire <a target="_blank" href="https://discord.gg/aapA7sB"> discord server </a></div>
        <Animation />
    </>
}
export default Club