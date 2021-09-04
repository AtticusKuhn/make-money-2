import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { increment } from "../../redux/earn"
import { RootState } from "../../redux/store"


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
const originalButton = new Upgrade("original button", 0, ob)
const betterButton = new Upgrade("better button", 10, bb)
export const upgrades: Array<Upgrade> = [originalButton, betterButton]

function getPossibleUpgrades(money: number): Array<Upgrade> {
    const allreadyPurchased = useSelector<RootState>((state) => state.money.purchasedUpgrades) as Upgrade[]

    return upgrades.filter(upgrade => upgrade.cost < money && !allreadyPurchased.includes(upgrade))
}

interface PossiblePurchaseProps {
    name: string;
    cost: number;
}
const PossiblePurchase: React.FC<PossiblePurchaseProps> = (props) => {
    return (<>
        <h1>{props.name}</h1>
        <button>buy for {props.cost}</button>
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