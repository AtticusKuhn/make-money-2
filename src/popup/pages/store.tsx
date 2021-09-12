import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { purchase, storageUpgrade } from "../../redux/earn"
import { RootState } from "../../redux/store"
import { findUpgrade, Upgrade, upgrades } from "../../upgrades/buttons"
import { UTous } from "../../utils"

function getPossibleUpgrades(money: number): Array<Upgrade> {
    const allreadyPurchased = useSelector<RootState>((state) => state.money.purchasedUpgrades) as storageUpgrade[]

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
    const money = useSelector<RootState>((state) => state.money.value) as number
    const possibleUpgrads = getPossibleUpgrades(money);
    return (<>
        I am store
        {possibleUpgrads.length > 0 ? possibleUpgrads.map((e, i) => <PossiblePurchase key={i} {...e} />) : "no upgrades availbe for purchase"}
    </>)
}
export default store;