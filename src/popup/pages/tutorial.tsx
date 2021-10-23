import React from "react"
import upgrades from "../../upgrades"
import { formatNumber } from "../../utils";
const Tutorial: React.FC<{}> = () => {
    const { buttons, items } = upgrades;
    const u = upgrades.upgrades;
    return <>
        <h1>Make Money Tutorial</h1>
        <p>Make money is a fun game where you click buttons to earn money. Purchase new upgrades in
            the store and then equip them in loadout
        </p>
        <h2>Possible Upgrades</h2>
        Here are all the possible upgrades you can purchase.
        <h3>Buttons</h3>
        <table>
            <tr>
                <th>Button Name</th>
                <th>Cost</th>
            </tr>
            {buttons.map(b => (<tr>
                <td>{b.name}</td>
                <td>${formatNumber(b.cost)}</td></tr>))}
        </table>
        <h3>Items</h3>
        <table>
            <tr>
                <th>Items Name</th>
                <th>Cost</th>
            </tr>
            {items.map(i => (<tr>
                <td>{i.name}</td>
                <td>${formatNumber(i.cost)}</td></tr>))}
        </table>
        <h3>Upgrades</h3>
        <table>
            <tr>
                <th>Upgrade Name</th>
                <th>Cost</th>
            </tr>
            {u.map(u => (<tr>
                <td>{u.name}</td>
                <td>${formatNumber(u.cost)}</td></tr>))}
        </table>
    </>
}
export default Tutorial