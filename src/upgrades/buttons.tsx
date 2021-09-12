import React from "react"
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
export const originalButton = new Button("original button", 0, ob,)
const betterButton = new Button("better button", 10, bb)
export const upgrades: Array<Upgrade> = [originalButton, betterButton]
export const findUpgrade = (name: string): Upgrade => upgrades.find(x => x.name === name) as Upgrade
