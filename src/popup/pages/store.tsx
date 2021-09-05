import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { increment, purchase } from "../../redux/earn"
import { RootState } from "../../redux/store"
import { UTous } from "../../utils"


export class Upgrade {
    constructor(public name: string, public cost: number, public component: React.FC) { }
}
const ob: React.FC<{}> = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch(increment())}>Make Money</button>

}
const bb: React.FC<{}> = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch(increment())}>Make More Money</button>

}
export const originalButton = new Upgrade("original button", 0, ob)
const betterButton = new Upgrade("better button", 10, bb)
export const upgrades: Array<Upgrade> = [originalButton, betterButton]
export const findUpgrade = (name: string): Upgrade => upgrades.find(x => x.name === name) as Upgrade

function getPossibleUpgrades(money: number): Array<Upgrade> {
    const allreadyPurchased = useSelector<RootState>((state) => state.money.purchasedUpgrades) as Upgrade[]

    return upgrades.filter(upgrade => upgrade.cost < money && !allreadyPurchased.includes(upgrade))
}

interface PossiblePurchaseProps {
    name: string;
    cost: number;
}
const PossiblePurchase: React.FC<PossiblePurchaseProps> = (props) => {
    const dispatch = useDispatch()
    return (<>
        <h1>{props.name}</h1>
        <button onClick={() => dispatch(purchase(UTous(findUpgrade(props.name))))}>buy for {props.cost}</button>
    </>)
}

const store: React.FC = () => {
    const money = useSelector<RootState>((state) => state.money.value) as number

    return (<>
        I am store
        {getPossibleUpgrades(money).map(e => <PossiblePurchase {...e} />)}
    </>)
}
export default store;