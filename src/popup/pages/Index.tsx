import React from 'react';
import { useSelector } from 'react-redux';
import { storageUpgrade } from '../../redux/earn';
import { RootState } from '../../redux/store';
import { findButton } from '../../upgrades/buttons';

export default function Index() {
    const money = useSelector<RootState, number>((state) => state.money.value)
    const button = useSelector<RootState, storageUpgrade>((state) => state.money.equippedButton)
    return (
        <>
            <h1>hello I am index</h1>
            {money}
            {findButton(button).component({})}
            {/* <button onClick={() => dispatch(increment())}>Make Money</button> */}
        </>
    );
}
