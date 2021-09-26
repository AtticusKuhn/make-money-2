import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { purchase, storageUpgrade } from "../../redux/earn"
import { RootState } from "../../redux/store"
import { upgradeType } from "../../types"
import upgrades from "../../upgrades/index"
import { isButton } from "../../utils"

export function findPossibleUpgrades() {
    const allreadyPurchased = useSelector<RootState, storageUpgrade[]>((state) => state.money.purchasedUpgrades)
    const allreadyPurchasedItems = useSelector<RootState, storageUpgrade[]>((state) => state.money.purchasedItems)

    const money = useSelector<RootState, number>((state) => state.money.value)
    return getPossibleUpgrades(money, upgrades.all, allreadyPurchased, allreadyPurchasedItems)

}
function getPossibleUpgrades(money: number, upgrades: Array<storageUpgrade>, allreadyPurchased: Array<storageUpgrade>, allreadyPurchasedItems: storageUpgrade[]): Array<storageUpgrade> {
    return upgrades
        .filter(upgrade => upgrade.cost < money
            && !allreadyPurchased.some(u => u.name === upgrade.name)
            && !allreadyPurchasedItems.some(u => u.name === upgrade.name))
}

interface PossiblePurchaseProps {
    name: string;
    cost: number;
    type: upgradeType;
}
const PossiblePurchase: React.FC<PossiblePurchaseProps> = (props) => {
    const dispatch = useDispatch()
    return (<>
        <h1>{props.name}</h1>
        <button onClick={() => dispatch(purchase(props))}>buy for {props.cost}</button>
    </>)
}

const store: React.FC<{}> = () => {
    const possibleUpgrads = findPossibleUpgrades()
    const purchasedItems = useSelector<RootState, storageUpgrade[]>((state) => state.money.purchasedItems)

    return (<>
        <h1>welcome to the store</h1> <br />
        {/* <pre>{JSON.stringify(upgrades, null, 4)}</pre> */}
        <h3>Buttons: </h3> <br />
        {possibleUpgrads.length > 0 ? possibleUpgrads.filter(isButton).map((e, i) => <PossiblePurchase key={i} {...e} />) : "no buttons availbe for purchase"}
        <h3>Upgrades: </h3> <br />
        {possibleUpgrads.length > 0 ? possibleUpgrads.filter(x => x.type === upgradeType.upgrade).map((e, i) => <PossiblePurchase key={i} {...e} />) : "no upgrades availbe for purchase"}
        <h3>Items: </h3> <br />
        {possibleUpgrads.length > 0 ? possibleUpgrads.filter(x => x.type === upgradeType.item).filter(a => !purchasedItems.some(x => x.name === a.name)).map((e, i) => <PossiblePurchase key={i} {...e} />) : "no upgrades availbe for purchase"}
    </>)
}
export default store;