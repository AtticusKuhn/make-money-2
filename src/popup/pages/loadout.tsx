import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equip, storageUpgrade, unequip } from '../../redux/earn';
import { RootState } from '../../redux/store';
import { isButton } from '../../utils';

interface ChooseButtonProps {
    button: storageUpgrade;
}

const CustomCheckBox: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props) => {
    return <>
        <input type="checkbox" {...props} />
        <style>{`
        input[type='checkbox']{
            width: 14px !important;
            height: 14px !important;
            margin: 10px;
            appearance: none;
            outline: 2px solid var(--c4);
            box-shadow: none;
            font-size: 0.8em;
            text-align: center;
            line-height: 1em;
            background: var(--c2);
          }
          
          input[type='checkbox']:checked:after {
            content: '✔';
            color: var(--c4);
          }
        `}</style>
    </>;
}

const ChooseButton: React.FC<ChooseButtonProps> = ({ button }) => {
    const dispatch = useDispatch()
    const equipped = useSelector<RootState, storageUpgrade[]>((state) => state.money.equippedUpgrades)
    const isChecked = equipped.some(b => b.name === button.name)
    const check = () => isChecked ? dispatch(unequip(button)) : dispatch(equip(button))
    return (<>
        <CustomCheckBox style={{ boxSizing: "border-box", margin: "2%" }} checked={isChecked} onChange={check} />
        <div style={{ display: "inline-block", boxSizing: "border-box" }}>{button.name}</div>
        <br />
        <style>{`
        .checkbox {
            height: 25px;
            width: 25px;
        }
            .checkbox:checked {
                color: var(--c2);

                background-color: var(--c1);
            }
            .checkbox:checked:after {
            	color: var(--c3);

              background-color: var(--c1);
          }
        `}</style>
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
            <p>Here you equip and choose the different upgrades that you have bought.
                You may must equip exactly 1 button at a time, but you may equip or unequip any number
                of upgrades.
            </p>
            <br />
            <h2>Equip buttons</h2>
            {buttons.map(b => <ChooseButton button={b} />)}
            <h2>Equip Upgrades</h2>
            {notButton.map(b => <ChooseButton button={b} />)}
            <br />
            <h1>Purchased Items</h1>
            <ol>
                {items.map(item => <li>{item.name} (+{Math.floor(Math.sqrt(item.cost) * 0.1)} income)</li>)}
            </ol>
        </>
    );
}
