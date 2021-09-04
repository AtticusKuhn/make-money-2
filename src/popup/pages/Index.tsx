import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Upgrade } from './store';

export default function Index() {
    const money = useSelector<RootState>((state) => state.money.value)
    const upgrades = useSelector<RootState>((state) => state.money.equippedUpgrades) as Upgrade[]
    console.log({ upgrades })
    // const dispatch = useDispatch()
    return (
        <>
            <h1>hello I am index</h1>
            {money}
            {upgrades[0].component}
            {/* <button onClick={() => dispatch(increment())}>Make Money</button> */}
        </>
    );
}
