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
        { v: 25, n: "You are famous in your neighborhood for your rapid gain of wealth." },
        { v: 300, n: "you have one iphone" },
        { v: 400, n: "you can buy one jacuzzi" },
        { v: 500, n: "you can pay moving fees to move to a better place (can't buy it though)" },
        { v: 700, n: "you can buy one deck of magic: the gathering cards" },
        { v: 1000, n: " you are rich" },
        { v: 2500, n: "you can buy 100 cardano" },
        { v: 5e3, n: "Your money is OVER 9000!" },
        { v: 5e4, n: "You are known in your community as 'The Money Man.'" },
        { v: 25295, n: "you can buy a toyota camry" },
        { v: 5e5, n: "You are now in the top 1% of the everyone in the world by wealth." },
        { v: 31133, n: "you have more money than the average salary in the USA" },
        { v: 1e5, n: "People in your city are now coming to you asking for funding for their companies." },
        { v: 746820, n: "you have more money than the average American household" },
        { v: 1e6, n: "you can afford 1 house and You have been asked to give classes on making money so that others may learn your ways." },
        { v: 5e6, n: "Foreign diplomats are meeting with you to see if you can help them make their countries more financially efficient!" },
        { v: 11.1e6, n: "you are in the top 1%" },
        { v: 1e7, n: "Various universities have invited you to give economics lectures about how you became so rich." },
        { v: 5e7, n: "Your influence has caused the stock market to rise 5% in a week!" },
        { v: 25e7, n: "Business analysts have already written numerous articles about you and your wealth." },
        { v: 1e8, n: "You have been appointed the CEO of Money Inc, a company soley dedicated to advertising your wealth!" },
        { v: 1e9, n: "You are now one of the 2,208 billionares in the world!" },
        { v: 3e9, n: "You are wealthier than Donald Trump." },
        { v: 25e9, n: "Rumors suggest Elon Musk is trying to figure out the secrets of your wealth." },
        { v: 207.1e9, n: "you are the richest man in the world" },
        { v: 25e10, n: "You have more than the value of all the gold in Fort Knox." },
        { v: 1e11, n: "You were on the front cover of TIME MAGAZINE for being the richest person alive!" },
        { v: 21.43e12, n: "you have more money than america" },
        { v: 1e12, n: "You are so rich that you have 1% of the total US Dollars in circulation!" },
        { v: 5e12, n: "You have so much money conspiracy theorists think you are actually God in disguise." },
        { v: 5e13, n: "The governments of major countries are asking you for donations to pay off their debts." },
        { v: 5e14, n: "You are so wealthy that your money no longer fits on Earth!" },
        { v: 1e15, n: "Aliens from other galaxies have invited you to speak to them about your wealth." },
        { v: 1e23, n: "You have finally completed your quest; you own the planet Earth!" },

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
const richGoldTheme = new Appearance("rich gold theme", getPrice(11), "richGoldTheme")
export const casino = new Equippable("casino", getPrice(12))
const billionaire = new Equippable("billionaire club", getPrice(13))

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
export default [tutorial, milestone, wordMoney, darkMode, header, autoClicker, bonusClicks, casino, hypeButtons, hotKeys, economical, suave, richGoldTheme, billionaire].sort((a, b) => a.cost - b.cost)