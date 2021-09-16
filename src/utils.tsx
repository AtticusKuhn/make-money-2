import { storageUpgrade } from "./redux/earn";
import { Upgrade, } from "./upgrades/buttons";
import upgrades from "./upgrades/index";

export const usToU = (us: storageUpgrade): Upgrade => {
    return upgrades.all.find(u => u.name === us.name) as Upgrade
}
export const UTous = (us: Upgrade): storageUpgrade => {
    return { name: us.name, isButton: us.isButton }
}
export const inRange = (max: number, min: number, num: number) => Math.min(max, Math.max(min, num))