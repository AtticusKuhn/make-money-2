import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { purchase, storageUpgrade } from "../../redux/earn"
import { RootState } from "../../redux/store"
import { Upgrade } from "../../upgrades/buttons"
import { isButton, UTous } from "../../utils"
import upgrades, { findUpgrade } from "../../upgrades/index"

export function findPossibleUpgrades() {
    const allreadyPurchased = useSelector<RootState, storageUpgrade[]>((state) => state.money.purchasedUpgrades)
    const money = useSelector<RootState, number>((state) => state.money.value)
    return getPossibleUpgrades(money, upgrades.all, allreadyPurchased)

}
function getPossibleUpgrades(money: number, upgrades: Array<Upgrade | storageUpgrade>, allreadyPurchased: Array<storageUpgrade>): Array<Upgrade> {
    return upgrades.filter(upgrade => upgrade.cost < money && !allreadyPurchased.some(u => u.name === upgrade.name))
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

const store: React.FC<{}> = () => {
    const possibleUpgrads = findPossibleUpgrades()
    return (<>
        <h1>welcome to the store</h1> <br />
        <h3>Buttons: </h3> <br />
        {possibleUpgrads.length > 0 ? possibleUpgrads.filter(isButton).map((e, i) => <PossiblePurchase key={i} {...e} />) : "no buttons availbe for purchase"}
        <h3>Upgrades: </h3> <br />
        {possibleUpgrads.length > 0 ? possibleUpgrads.filter(x => !isButton(x)).map((e, i) => <PossiblePurchase key={i} {...e} />) : "no upgrades availbe for purchase"}

    </>)
}
export default store;