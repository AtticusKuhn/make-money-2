import { Upgrade, upgrades } from "./buttons"
import u from "./upgrades"
import items from "./items"
import { storageUpgrade } from "../redux/earn";

const all: storageUpgrade[] = [...upgrades, ...u, ...items]
export default {
    buttons: upgrades,
    upgrades: u,
    items,
    all,
};
export const findUpgrade = (name: string): Upgrade => all.find(x => x.name === name) as Upgrade
