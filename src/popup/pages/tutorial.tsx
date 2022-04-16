import React from "react"
import upgrades from "../../upgrades"
import { formatNumber, itemToIncome, wordNumber } from "../../utils";
const Tutorial: React.FC<{}> = () => {
    const { buttons, items } = upgrades;
    const u = upgrades.upgrades;
    return <>
        <h1 className="centered">Make Money Tutorial</h1>
        <p>Make money is a fun game where you click buttons to earn money. Purchase new upgrades in
            the store and then equip them in load out.
        </p>
        <br /> <br /> <br />
        <h2>Possible Upgrades</h2>
        Here are all the possible upgrades you can purchase.
        <br /> <br />
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
        <br /> <br />
        <h3>Items</h3>
        <table>
            <tr>
                <th>Items Name</th>
                <th>Cost</th>
                <th>Income Boost</th>
            </tr>
            {items.map(i => (<tr>
                <td>{i.name}</td>
                <td>${wordNumber(i.cost)}</td>
                <td>+ ${(itemToIncome(i.cost).toFixed(2))}</td>

            </tr>
            ))}
        </table>
        <br /> <br />
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
        <br /> <br /> <br />
        <h2>Need Help with Game?</h2>
        <p>If you need help with this game, DM MrEconomical#4400 on Discord. You can also join the
            official support server at <a target="_blank" href="https://discord.gg/aapA7sB">https://discord.gg/aapA7sB</a>
        </p>
        <br /> <br /> <br />
        <h2>Hotkeys</h2>
        <p>Once you buy the hotkeys upgrade,
            h + shift to go to home,
            l + shift to go to LoadOut,
            d + shift to go to debug,
            s + shift to go to store,
            t + shift to go to tutorial,
            c + shift to go to casino,
            b + shift to go to club </p>
        <br /> <br /> <br />
        <h2>Contribute</h2>
        <p>Would you like to add more features to make money 2?
            You are welcome to contribute to the development of the game.
            The source code is free and open source at
            <a target="_blank" href="https://github.com/AtticusKuhn/make-money-2">https://github.com/AtticusKuhn/make-money-2</a>
            and the maintainers are welcoming of people who want to help add new features to future versions.
        </p>
    </>
}
export default Tutorial