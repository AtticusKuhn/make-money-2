import React from "react";
import { useSelector } from "react-redux";
import { storageUpgrade } from "../redux/earn";
import { RootState } from "../redux/store";
import { usToU } from "../utils";
import { Equippable } from "./buttons";

export const milestone = new Equippable("money milestone", 10)
export const MilestoneComponent: React.FC<{}> = () => {
    const money = useSelector<RootState, number>(state => state.money.value);
    const stones = [
        { v: 0, n: "you very poor" },
        { v: 1, n: "you are poor" },
        { v: 10, n: "you have the wealth of a 10 year old" },
        { v: 40, n: "you are as wealthy as one meal" },
        { v: 100, n: "you have one tv" },
        { v: 300, n: "you have one iphone" },
        { v: 400, n: "you can buy one jacuzzi" },
        { v: 500, n: "you can pay moving fees to move to a better place (can't buy it though)" },
        { v: 700, n: "you can buy one deck of magic: the gathering cards" },
        { v: 1000, n: " you are rich" },
        { v: 2500, n: "you can buy 100 cardano" },
        { v: 25295, n: "you can buy a toyota camry" },
        { v: 31133, n: "you have more money than the average salary in the USA" },
        { v: 746820, n: "you have more money than the average Amwerican household" },
        { v: 1e6, n: "you can afford 1 house" },
        { v: 11.1e6, n: "you are in the top 1%" },
        { v: 207.1e9, n: "you are the richest man in the world" },
        { v: 21.43e12, n: "you have more money than america" }

    ].reverse();
    const msg = stones.find(x => money > x.v)?.n || "you are so rich you caused a bug in the fabric of the universe";
    return <div> milestone: {msg} </div>;
}
export class Appearence extends Equippable {
    constructor(public name: string, public cost: number, public cls: string) {
        super(name, cost)
    }
}
//"billionaire club"
export const casino = new Equippable("casino", 7000)
const billionaire = new Equippable("billionaire club", 1e9)

export const darkMode = new Appearence("dark mode", 230, "darkTheme")
export const hypeButtons = new Appearence("hype beast buttons", 1500, "hypebuttons")
export const economical = new Appearence("economical look", 90, "economical")
export const suave = new Appearence("suave look", 405, "suave")

export const toCss = (equipped: storageUpgrade[]): string => {
    const c = equipped.map(usToU)
    let s = "";
    for (const e of c) {
        // console.log("in toCss, e is", e)
        if (e instanceof Appearence) {
            // console.log("in toCss, this extends apperance")
            s += e.cls + " "
        }
    }
    return s
}
export default [milestone, darkMode, casino, hypeButtons, economical, suave, billionaire]