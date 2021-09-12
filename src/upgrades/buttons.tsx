import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { earn, increment } from "../redux/earn"


export class Upgrade {
    constructor(public name: string, public cost: number, public isButton: boolean, public component: React.FC) { }
}
export class Button extends Upgrade {
    constructor(public name: string, public cost: number, public component: React.FC) {
        super(name, cost, true, component)
    }
}
const ob: React.FC<{}> = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch(increment())}>Make Money</button>

}
const bb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch(earn(2))}>Make More Money</button>
}
const mb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const [left, setLeft] = useState(0)
    const [direction, setD] = useState<"left" | "right">("left")

    const r = () => setLeft(Math.min(left + 5, 100))
    const l = () => setLeft(Math.max(left - 5, 0))
    const keyPress: React.KeyboardEventHandler<HTMLDivElement> = (key) => {
        if (key.key === "ArrowRight") {
            r();
            setD("right")
        }
        if (key.key === "ArrowLeft") {
            l();
            setD("left")
        }
        dispatch(earn(2));
    }
    const click = () => {
        dispatch(earn(2));
        if (left <= 0)
            setD("right")
        if (left >= 100)
            setD("left")
        if (direction === "right")
            return r()
        l();
    }
    return <div onKeyDown={keyPress}>
        <div onKeyPress={keyPress}>
            <button style={{ marginLeft: `${left}px` }} onClick={click}> - moving money - </button>
        </div>
    </div>
}
export const originalButton = new Button("original button", 0, ob,)
const betterButton = new Button("better button", 10, bb)
const movingButton = new Button("moving button", 2, mb)

export const upgrades: Array<Upgrade> = [originalButton, betterButton, movingButton]
export const findUpgrade = (name: string): Upgrade => upgrades.find(x => x.name === name) as Upgrade
