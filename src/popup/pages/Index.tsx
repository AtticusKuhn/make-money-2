import React from 'react';
import { useBonusClicks } from '../../redux/earn';
import { useDisp, useSel } from '../../redux/store';
import { findButton } from '../../upgrades/buttons';
import { milestone, MilestoneComponent } from '../../upgrades/upgrades';
import { formatNumber, wordNumber } from '../../utils';


const MoneyDisplay: React.FC<{}> = () => {
    const money = useSel((state) => state.money.value)
    const income = useSel((state) => state.money.income)
    const equipped = useSel((state) => state.money.equippedUpgrades)
    const isWordNumber = equipped.some(x => x.name === "word money")
    const f = isWordNumber ? wordNumber : formatNumber;
    return (
        <div className="moneyDisplay">
            <div style={{ fontSize: "21px" }}> ${f(money)}</div>
            <br /> <br /> <br />
            <div className="big">Income: ${f(income)} </div>
        </div>
    )
}
const clickButton = (): void => {
    // const location = useLocation()
    // if (location.pathname !== "/") {
    //     return;
    // }
    const button = document.querySelector("button")
    if (!button) {
        return;
    }
    button.click()
}
const BonusClicks: React.FC<{}> = () => {
    const bonusClicks = useSel((state) => state.money.bonusClicks)
    const dispatch = useDisp()
    const handleClick = () => {
        for (let i = 0; i < bonusClicks; i += 0.1) {
            clickButton()
        }
        dispatch(useBonusClicks())

    }
    return <>
        Bonus Clicks: <br />
        {bonusClicks.toFixed(2)} clicks<br />

        <button disabled={bonusClicks < 1} onClick={handleClick}> use bonus clicks</button>
    </>
}

export default function Index() {
    const equipped = useSel((state) => state.money.equippedUpgrades)
    const button = useSel((state) => state.money.equippedButton)
    const isMilestone = equipped.some(x => x.name === milestone.name)
    const isBonusClicks = equipped.some(x => x.name === "bonus clicks")

    return (
        <>
            <br /><br />
            <h1>Make Money 2</h1>
            <br /><br />
            <MoneyDisplay />
            <br /><br /><br /> <br />
            {findButton(button).component({})} <br /> <br /><br /> <br />
            {isMilestone && <MilestoneComponent />}
            {isBonusClicks && <BonusClicks />}
        </>
    );
}
