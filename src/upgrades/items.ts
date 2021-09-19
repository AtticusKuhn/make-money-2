import { storageUpgrade } from "../redux/earn";
import { upgradeType } from "../types";

const items: storageUpgrade[] = ["water bottle", "tv", "car"].map((e, i) => ({
    name: e,
    type: upgradeType.item,
    cost: Math.floor((i + 1) * 257),
}))
export default items;