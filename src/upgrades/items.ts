import { storageUpgrade } from "../redux/earn";
import { upgradeType } from "../types";

const items: storageUpgrade[] = ["water bottle", "tv", "car"].map((e, i) => ({
    name: e,
    type: upgradeType.item,
    cost: Math.floor(12.123 ** (i + 1)),
}))
export default items;