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
export const sleep = (time: number): Promise<void> => new Promise(resolve => setTimeout(resolve, time))