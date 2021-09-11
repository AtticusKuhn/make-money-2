import React from 'react';
import { useSelector } from 'react-redux';
import { storageUpgrade } from '../../redux/earn';
import { RootState } from '../../redux/store';
import { usToU } from '../../utils';

export default function Index() {
    const money = useSelector<RootState, number>((state) => state.money.value)
    const upgrades = useSelector<RootState, storageUpgrade[]>((state) => state.money.equippedUpgrades)
    console.log({ upgrades })
    console.log("in index.tsx, money is", money)
    // const dispatch = useDispatch()
    return (
        <>
            <h1>hello I am index</h1>
            {money}
            {usToU(upgrades[0]).component({})}
            {/* <button onClick={() => dispatch(increment())}>Make Money</button> */}
        </>
    );
}
