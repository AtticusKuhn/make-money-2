import { Upgrade, upgrades } from "./buttons"
import u from "./upgrades"
const all = [...upgrades, ...u]
export default {
    buttons: upgrades,
    upgrades: u,
    all,
};
export const findUpgrade = (name: string): Upgrade => all.find(x => x.name === name) as Upgrade
