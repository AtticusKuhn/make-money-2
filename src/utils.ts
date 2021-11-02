import React from "react";
import { storageUpgrade } from "./redux/earn";
import { upgradeType } from "./types";
import { Upgrade, v } from "./upgrades/buttons";
import upgrades from "./upgrades/index";

export const usToU = (us: storageUpgrade): Upgrade => {
    return upgrades.all.find(u => u.name === us.name) as Upgrade
}
export const UTous = (us: Upgrade): storageUpgrade => {
    return { name: us.name, type: upgradeType.upgrade, cost: us.cost }
}
export const isButton = (x: storageUpgrade) => x.type === upgradeType.button
export const inRange = (max: number, min: number, num: number) => Math.min(max, Math.max(min, num))
export const randomInRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min)
export const distance = (p1: v, p2: v): number => Math.sqrt(
    (p1.right - p2.right) ** 2
    +
    (p1.up - p2.up) ** 2
)
export const toDirection = (key: React.KeyboardEvent<any>): "up" | "down" | "left" | "right" | null => {
    if (key.key === "d" || key.key === "ArrowRight")
        return "right"
    if (key.key === "s" || key.key === "ArrowDown")
        return "down"
    if (key.key === "a" || key.key === "ArrowLeft")
        return "left"
    if (key.key === "w" || key.key === "ArrowUp")
        return "up"
    return null
}
type maybe<T> = T | null;
export const sleep = (time: number): Promise<void> => new Promise(resolve => setTimeout(resolve, time));
//@ts-ignore
export const maybeParseInt = (maybeInt: string): maybe<number> => isNaN(maybeInt) ? null : parseInt(maybeInt);
export const fromMaybe = <T>(m: maybe<T>, d: T): T => m === null ? d : m;
export const formatNumber = (num: number): string => numberWithCommas(parseFloat(num.toFixed(2)))
function numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function wordNumber(n: number): string {
    const str = Math.floor(n).toString()
    const nums: Record<string, number> = {
        Thousand: 3,
        Million: 6,
        Billion: 9,
        Trillion: 12,
        Quadrillion: 15,
        Quintillion: 18,
        Hextillion: 21,
        Septillion: 24,
        Octillion: 27,
        Nonillion: 30,
        Decillion: 33,
        Undecillion: 36,
        Duodecillion: 39,
        Tredecillion: 42,
        Quattuordecillion: 45,
        Quindecillion: 48,
        Hexdecillion: 51,
        Septendecillion: 54,
        Octodecillion: 57,
        Novemdecillion: 60,
        Vigintillion: 63,
        Unvigintillion: 66,
        Duovigintillion: 69,
        Trevigintillion: 72,
        Quattourvigintillion: 75,
        Quinvigintillion: 78,
        Hexvigintillion: 81,
        Septenvigintillion: 84,
        Octovigintillion: 87,
        Novemvigintillion: 90,
        Trigintillion: 93,
        Untrigintillion: 96,
        Duotrigintillion: 99,
        Googol: 100,
        Googolplex: (10 ** 100),
    }
    const f = formatNumber(n)
    if (f.indexOf(",") > -1) {
        const first = f.split(",")[0];
        const count = Math.floor(str.length)
        for (const [k, v] of Object.entries(nums).reverse()) {
            if (count > v) {
                return `${first} ${k}`
            }
        }
        return `oops you broke the system with your number`
    } else {
        return f;
    }
}
export const itemToIncome = (item: number): number => Math.sqrt(item) * 0.1
