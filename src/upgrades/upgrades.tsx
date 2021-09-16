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
        { v: 1000, n: " you are rich" },
    ].reverse();
    const msg = stones.find(x => money > x.v)?.n || "you are so rich you caused a bug in the fabric of the universe";
    return <div> milestone: {msg} </div>;
}
export class Appearence extends Equippable {
    constructor(public name: string, public cost: number, public cls: string) {
        super(name, cost)
    }
}

export const darkMode = new Appearence("dark mode", 12, "darkTheme")
export const hypeButtons = new Appearence("hype beast buttons", 12, "hypebuttons")
export const toCss = (equipped: storageUpgrade[]): string => {
    const c = equipped.map(usToU)
    let s = "";
    for (const e of c) {
        console.log("in toCss, e is", e)
        if (e instanceof Appearence) {
            console.log("in toCss, this extends apperance")
            s += e.cls + " "
        }
    }
    return s
}
export default [milestone, darkMode, hypeButtons]