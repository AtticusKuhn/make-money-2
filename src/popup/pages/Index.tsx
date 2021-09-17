import React from 'react';
import { useSelector } from 'react-redux';
import { storageUpgrade } from '../../redux/earn';
import { RootState } from '../../redux/store';
import { findButton } from '../../upgrades/buttons';
import { milestone, MilestoneComponent } from '../../upgrades/upgrades';

export default function Index() {
    const money = useSelector<RootState, number>((state) => state.money.value)
    const equipped = useSelector<RootState, storageUpgrade[]>((state) => state.money.equippedUpgrades)
    const button = useSelector<RootState, storageUpgrade>((state) => state.money.equippedButton)
    const isMilestone = equipped.some(x => x.name === milestone.name)
    console.log("isMilestone", isMilestone)
    return (
        <>
            <h1>Make Money 2</h1>
            {money}
            {findButton(button).component({})}
            {isMilestone && <MilestoneComponent />}
            {/* <button onClick={() => dispatch(increment())}>Make Money</button> */}
        </>
    );
}
