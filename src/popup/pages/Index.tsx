import React from 'react';
import { useSelector } from 'react-redux';
import { storageUpgrade } from '../../redux/earn';
import { RootState } from '../../redux/store';
import { findButton } from '../../upgrades/buttons';
import { milestone, MilestoneComponent } from '../../upgrades/upgrades';
import { formatNumber } from '../../utils';

export default function Index() {
    const money = useSelector<RootState, number>((state) => state.money.value)
    const income = useSelector<RootState, number>((state) => state.money.income)
    const equipped = useSelector<RootState, storageUpgrade[]>((state) => state.money.equippedUpgrades)
    const button = useSelector<RootState, storageUpgrade>((state) => state.money.equippedButton)
    const isMilestone = equipped.some(x => x.name === milestone.name)
    return (
        <>
            <br /><br />
            <h1>Make Money 2</h1>
            <br /><br />
            <div className="moneyDisplay">
                <div style={{ fontSize: "17px" }}>Money: ${formatNumber(money)}</div>
                <div className="big">Income: ${formatNumber(income)} </div>
            </div>
            <br /><br />
            {findButton(button).component({})} <br /> <br />
            {isMilestone && <MilestoneComponent />}
        </>
    );
}
