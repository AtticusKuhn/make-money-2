import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equip, storageUpgrade, unequip } from '../../redux/earn';
import { RootState } from '../../redux/store';
import { isButton } from '../../utils';

interface ChooseButtonProps {
    button: storageUpgrade;
}


const ChooseButton: React.FC<ChooseButtonProps> = ({ button }) => {
    const dispatch = useDispatch()
    const equipped = useSelector<RootState, storageUpgrade[]>((state) => state.money.equippedUpgrades)
    const isChecked = equipped.some(b => b.name === button.name)
    const check = () => isChecked ? dispatch(unequip(button)) : dispatch(equip(button))
    return (<>
        <div>{button.name}</div>
        <input checked={isChecked} type="checkbox" onChange={check} />
    </>)
}

export default function LoadOut() {
    const PurchasedUpgrades = useSelector<RootState, storageUpgrade[]>(state => state.money.purchasedUpgrades)
    const buttons = PurchasedUpgrades.filter(isButton);
    const notButton = PurchasedUpgrades.filter(x => !isButton(x))
    const items = useSelector<RootState, storageUpgrade[]>(state => state.money.purchasedItems)

    return (
        <>
            <h1> LoadOut</h1>
            <br />
            <p>Here you equip and choose the different upgrades that you have bought</p>
            <br />
            <h2>Equip buttons</h2>
            {buttons.map(b => <ChooseButton button={b} />)}
            <h2>Equip Upgrades</h2>
            {notButton.map(b => <ChooseButton button={b} />)}
            <br />
            <h1>Purchased Items</h1>
            <ol>
                {items.map(item => <li>{item.name}</li>)}
            </ol>
        </>
    );
}
