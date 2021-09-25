import { storageUpgrade } from "../redux/earn";
import { upgradeType } from "../types";

const items: storageUpgrade[] = Object.entries({
    "water bottle": 1,
    "tv": 100,
    "car": 50e3,
    "bitcoin": 43e3,
    "bicycle": 20,
    "house": 100e3
}).map(([a, b]) => ({
    name: a,
    type: upgradeType.item,
    cost: b,
})).sort((a, b) => a.cost - b.cost)
export default items;