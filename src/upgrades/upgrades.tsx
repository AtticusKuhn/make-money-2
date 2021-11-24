import React from "react";
import { storageUpgrade } from "../redux/earn";
import { useSel } from "../redux/store";
import { usToU } from "../utils";
import { Equippable } from "./buttons";

export const MilestoneComponent: React.FC<{}> = () => {
    const money = useSel(state => state.money.value);
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
        { v: 746820, n: "you have more money than the average American household" },
        { v: 1e6, n: "you can afford 1 house" },
        { v: 11.1e6, n: "you are in the top 1%" },
        { v: 207.1e9, n: "you are the richest man in the world" },
        { v: 21.43e12, n: "you have more money than america" }

    ].reverse();
    const msg = stones.find(x => money > x.v)?.n || "you are so rich you caused a bug in the fabric of the universe";
    return <div style={{ width: "100%", padding: "0 calc(50% - 100px)", fontSize: "14px", marginBottom: "50px", fontStyle: "italic", textAlign: "center" }}>{msg}</div>;
}
export class Appearance extends Equippable {
    constructor(public name: string, public cost: number, public cls: string) {
        super(name, cost)
    }
}
//"billionaire club"
const maxPrice = 100e15;
const num = 13;
const getPrice = (index: number): number => Math.floor(Math.exp(index / (num / Math.log(maxPrice))) - 1);
export const tutorial = new Equippable("tutorial", getPrice(0))
export const milestone = new Equippable("money milestone", getPrice(1))
export const wordMoney = new Equippable("word money", getPrice(2))
export const suave = new Appearance("suave look", getPrice(3), "suave")
export const darkMode = new Appearance("dark mode", getPrice(4), "darkTheme")
export const economical = new Appearance("economical look", getPrice(5), "economical");
export const header = new Equippable("header", getPrice(6));
export const bonusClicks = new Equippable("bonus clicks", getPrice(7));
export const autoClicker = new Equippable("auto clicker", getPrice(8));
const hotKeys = new Equippable("hot keys", getPrice(9))
export const hypeButtons = new Appearance("hype beast buttons", getPrice(10), "hypebuttons")
export const casino = new Equippable("casino", getPrice(11))
const billionaire = new Equippable("billionaire club", getPrice(12))

export const toCss = (equipped: storageUpgrade[]): string => {
    const c = equipped.map(usToU)
    let s = "";
    for (const e of c) {
        // console.log("in toCss, e is", e)
        if (e instanceof Appearance) {
            s += e.cls + " "
        }
    }
    return s
}
export default [tutorial, milestone, wordMoney, darkMode, header, autoClicker, bonusClicks, casino, hypeButtons, hotKeys, economical, suave, billionaire]