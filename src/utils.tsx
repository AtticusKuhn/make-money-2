import { storageUpgrade } from "./redux/earn";
import { upgradeType } from "./types";
import { Upgrade, } from "./upgrades/buttons";
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