import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"


class Upgrade {
    constructor(public name: string, public cost: number, public component: React.FC) { }
}

const betterButton = new Upgrade("better button", 10, () => <>hello</>)
const upgrades: Array<Upgrade> = [betterButton]

function getPossibleUpgrades(money: number): Array<Upgrade> {
    return upgrades.filter(upgrade => upgrade.cost < money)
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