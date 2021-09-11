import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equip, storageUpgrade, unequip } from '../../redux/earn';
import { RootState } from '../../redux/store';

interface ChooseButtonProps {
    button: storageUpgrade;
}


const ChooseButton: React.FC<ChooseButtonProps> = ({ button }) => {
    const dispatch = useDispatch()
    const equipped = useSelector<RootState, storageUpgrade[]>((state) => state.money.equippedUpgrades)
    const isChecked = equipped.some(b => b.name === button.name)
    const check = () => isChecked ? dispatch(unequip(button)) : dispatch(equip(button))
    return (<>
        <p>{button.name}</p>
        <input checked={isChecked} type="checkbox" onChange={check} />
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
