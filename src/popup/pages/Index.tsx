import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../redux/earn';
import { RootState } from '../../redux/store';

export default function Index() {
    const money = useSelector<RootState>((state) => state.money.value)
    const dispatch = useDispatch()
    return (
        <>
            <h1>hello I am index</h1>
            {money}
            <button onClick={() => dispatch(increment())}>Make Money</button>
        </>
    );
}
