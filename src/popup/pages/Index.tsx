import React from 'react';
import { useSel } from '../../redux/store';
import { findButton } from '../../upgrades/buttons';
import { milestone, MilestoneComponent } from '../../upgrades/upgrades';
import { formatNumber, wordNumber } from '../../utils';

export default function Index() {
    const money = useSel((state) => state.money.value)
    const income = useSel((state) => state.money.income)
    const equipped = useSel((state) => state.money.equippedUpgrades)
    const button = useSel((state) => state.money.equippedButton)
    const isMilestone = equipped.some(x => x.name === milestone.name)
    const isWordNumber = equipped.some(x => x.name === "word money")
    const isBonusClicks = equipped.some(x => x.name === "bonus clicks")

    const f = isWordNumber ? wordNumber : formatNumber;
    return (
        <>
            <br /><br />
            <h1>Make Money 2</h1>
            <br /><br />
            <div className="moneyDisplay">
                <div style={{ fontSize: "21px" }}> ${f(money)}</div>
                <br /> <br /> <br />
                <div className="big">Income: ${f(income)} </div>
            </div>
            <br /><br /><br /> <br />
            {findButton(button).component({})} <br /> <br /><br /> <br />
            {isMilestone && <MilestoneComponent />}
            {isBonusClicks && "you have bonus clicks"}
        </>
    );
}
