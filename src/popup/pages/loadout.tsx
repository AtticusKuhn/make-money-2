import React from 'react';
import { useSelector } from 'react-redux';
import { storageUpgrade } from '../../redux/earn';
import { RootState } from '../../redux/store';

interface ChooseButtonProps {
    button: storageUpgrade;
}


const ChooseButton: React.FC<ChooseButtonProps> = (props) => {
    function check() {

    }
    return (<>
        <p>{props.button.name}</p>
        <input type="checkbox" onChange={check} />
    </>)
}

export default function LoadOut() {
    const PurchasedUpgrades = useSelector<RootState, storageUpgrade[]>(state => state.money.purchasedUpgrades)
    const buttons = PurchasedUpgrades.filter(x => x.isButton);
    const notButton = PurchasedUpgrades.filter(x => !x.isButton)

    return (
        <>
            <h1>hello I am LoadOut</h1>
            <br />
            <h2>Equip buttons</h2>
            {buttons.map(b => <ChooseButton button={b} />)}
            <h2>Equip Upgrades</h2>
            {notButton.map(b => <ChooseButton button={b} />)}
        </>
    );
}
