import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { purchase, storageUpgrade } from "../../redux/earn"
import { RootState } from "../../redux/store"
import { upgradeType } from "../../types"
import upgrades from "../../upgrades/index"
import { isButton } from "../../utils"

export function findPossibleUpgrades() {
    const alreadyPurchased = useSelector<RootState, storageUpgrade[]>((state) => state.money.purchasedUpgrades)
    const alreadyPurchasedItems = useSelector<RootState, storageUpgrade[]>((state) => state.money.purchasedItems)

    const money = useSelector<RootState, number>((state) => state.money.value)
    return getPossibleUpgrades(money, upgrades.all, alreadyPurchased, alreadyPurchasedItems)

}
function getPossibleUpgrades(money: number, upgrades: Array<storageUpgrade>, alreadyPurchased: Array<storageUpgrade>, alreadyPurchasedItems: storageUpgrade[]): Array<storageUpgrade> {
    return upgrades
        .filter(upgrade => upgrade.cost < money
            && !alreadyPurchased.some(u => u.name === upgrade.name)
            && !alreadyPurchasedItems.some(u => u.name === upgrade.name))
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
    const possibleUpgrades = findPossibleUpgrades()
    const purchasedItems = useSelector<RootState, storageUpgrade[]>((state) => state.money.purchasedItems)

    return (<>
        <h1>Welcome to the Store</h1> <br />
        {/* <pre>{JSON.stringify(upgrades, null, 4)}</pre> */}
        <h3>Buttons: </h3> <br />
        {possibleUpgrades.length > 0 ? possibleUpgrades.filter(isButton).map((e, i) => <PossiblePurchase key={i} {...e} />) : "no buttons available for purchase"}
        <h3>Upgrades: </h3> <br />
        {possibleUpgrades.length > 0 ? possibleUpgrades.filter(x => x.type === upgradeType.upgrade).map((e, i) => <PossiblePurchase key={i} {...e} />) : "no upgrades available for purchase"}
        <h3>Items: </h3> <br />
        {possibleUpgrades.length > 0 ? possibleUpgrades.filter(x => x.type === upgradeType.item).filter(a => !purchasedItems.some(x => x.name === a.name)).map((e, i) => <PossiblePurchase key={i} {...e} />) : "no upgrades available for purchase"}
    </>)
}
export default store;