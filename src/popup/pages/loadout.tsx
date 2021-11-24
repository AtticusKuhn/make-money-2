import React from 'react';
import { equip, storageUpgrade, unequip } from '../../redux/earn';
import { useDisp, useSel } from '../../redux/store';
import { isButton } from '../../utils';

interface ChooseButtonProps {
    button: storageUpgrade;
}

const CustomCheckBox: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props) => {
    return <>
        <input style={{
            width: "14px",
            height: "14px",
            margin: "0px 30px",
            appearance: "none",
            outline: "2px solid var(--c4)",
            boxShadow: "none",
            fontSize: "0.8em",
            textAlign: "center",
            lineHeight: "1em",
            background: "var(--c2)",
        }} type="checkbox" {...props} />
        <style>{`
          input[type='checkbox']:checked:after {
            content: '✔';
            //background-color: var(--c1);
            color: var(--c4);
          }
          input[type='checkbox']:checked {
            color: var(--c2);

            background-color: var(--c1);
        }
        input[type='checkbox']:checked:after {
            color: var(--c3);

          background-color: var(--c1);
      }
        `}</style>
    </>;
}

const ChooseButton: React.FC<ChooseButtonProps> = ({ button }) => {
    const dispatch = useDisp()
    const equipped = useSel((state) => state.money.equippedUpgrades)
    const isChecked = equipped.some(b => b.name === button.name)
    const check = () => isChecked ? dispatch(unequip(button)) : dispatch(equip(button))
    return (<>
        <CustomCheckBox style={{ boxSizing: "border-box", margin: "2%" }} checked={isChecked} onChange={check} />
        <div style={{ display: "inline-block", boxSizing: "border-box" }}>{button.name}</div>
        <br />
    </>)
}

export default function LoadOut() {
    const PurchasedUpgrades = useSel(state => state.money.purchasedUpgrades)
    const buttons = PurchasedUpgrades.filter(isButton);
    const notButton = PurchasedUpgrades.filter(x => !isButton(x))
    const items = useSel(state => state.money.purchasedItems)

    return (
        <div>
            <h1 className="centered"> LoadOut</h1>
            <br />
            <p>Here you equip and choose the different upgrades that you have bought.
                You may must equip exactly 1 button at a time, but you may equip or unequip any number
                of upgrades.
            </p>
            <br />
            <h2 className="centered">Equip buttons</h2>
            {buttons.map(b => <ChooseButton button={b} />)}
            <h2 className="centered">Equip Upgrades</h2>
            {notButton.map(b => <ChooseButton button={b} />)}
            <br />
            <h1 className="centered">Purchased Items</h1>
            <ol>
                {items.map(item => <li>{item.name} (+{(Math.sqrt(item.cost) * 0.1).toPrecision(2)} income)</li>)}
            </ol>
        </div>
    );
}
